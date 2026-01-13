const fs = require("fs");
const nodemailer = require("nodemailer");

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send detailed log email
const sendLogEmail = async (logDetails) => {
  try {
    const transporter = createTransporter();

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h2 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .section h3 { color: #333; margin-bottom: 10px; background-color: #f8f9fa; padding: 8px; border-radius: 4px; }
        .info-row { display: flex; margin: 8px 0; }
        .label { font-weight: bold; min-width: 180px; color: #555; }
        .value { color: #333; word-break: break-all; }
        .highlight { background-color: #fff3cd; padding: 2px 6px; border-radius: 3px; }
        .tag { display: inline-block; background-color: #e7f3ff; color: #0066cc; padding: 4px 8px; border-radius: 4px; margin: 2px; font-size: 12px; }
        .alert { background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 12px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h2>🔔 New Portfolio Visit Log</h2>
        
        <div class="alert">
            <strong>Request Time:</strong> ${logDetails.timestamp}
        </div>

        <div class="section">
            <h3>📍 Request Information</h3>
            <div class="info-row"><span class="label">Method:</span><span class="value highlight">${
              logDetails.method
            }</span></div>
            <div class="info-row"><span class="label">URL:</span><span class="value">${
              logDetails.url
            }</span></div>
            <div class="info-row"><span class="label">Path:</span><span class="value">${
              logDetails.path
            }</span></div>
            <div class="info-row"><span class="label">Protocol:</span><span class="value">${
              logDetails.protocol
            }</span></div>
            <div class="info-row"><span class="label">HTTP Version:</span><span class="value">${
              logDetails.httpVersion
            }</span></div>
        </div>

        <div class="section">
            <h3>🌐 Network & IP Information</h3>
            <div class="info-row"><span class="label">IP Address:</span><span class="value highlight">${
              logDetails.ip
            }</span></div>
            ${
              logDetails.forwardedFor
                ? `<div class="info-row"><span class="label">Forwarded For:</span><span class="value">${logDetails.forwardedFor}</span></div>`
                : ""
            }
            ${
              logDetails.realIP
                ? `<div class="info-row"><span class="label">Real IP:</span><span class="value">${logDetails.realIP}</span></div>`
                : ""
            }
            <div class="info-row"><span class="label">Host:</span><span class="value">${
              logDetails.host
            }</span></div>
            ${
              logDetails.forwardedHost
                ? `<div class="info-row"><span class="label">Forwarded Host:</span><span class="value">${logDetails.forwardedHost}</span></div>`
                : ""
            }
        </div>

        <div class="section">
            <h3>💻 Device & Browser Information</h3>
            <div class="info-row"><span class="label">Browser:</span><span class="value"><span class="tag">${
              logDetails.browser
            }</span></span></div>
            <div class="info-row"><span class="label">Operating System:</span><span class="value"><span class="tag">${
              logDetails.os
            }</span></span></div>
            <div class="info-row"><span class="label">Device Type:</span><span class="value"><span class="tag">${
              logDetails.device
            }</span></span></div>
            <div class="info-row"><span class="label">User Agent:</span><span class="value" style="font-size: 11px;">${
              logDetails.userAgent || "N/A"
            }</span></div>
        </div>

        <div class="section">
            <h3>🌍 Location & Language</h3>
            <div class="info-row"><span class="label">Accept Language:</span><span class="value">${
              logDetails.acceptLanguage || "N/A"
            }</span></div>
            <div class="info-row"><span class="label">Accept Encoding:</span><span class="value">${
              logDetails.acceptEncoding || "N/A"
            }</span></div>
        </div>

        <div class="section">
            <h3>🔗 Traffic Source</h3>
            <div class="info-row"><span class="label">Referer:</span><span class="value">${
              logDetails.referer || "<em>Direct/None</em>"
            }</span></div>
            <div class="info-row"><span class="label">Origin:</span><span class="value">${
              logDetails.origin || "N/A"
            }</span></div>
        </div>

        ${
          logDetails.queryParams
            ? `
        <div class="section">
            <h3>🔍 Query Parameters</h3>
            <div class="value" style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace;">${logDetails.queryParams}</div>
        </div>`
            : ""
        }

        ${
          logDetails.bodyData
            ? `
        <div class="section">
            <h3>📦 Request Body</h3>
            <div class="value" style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace;">${JSON.stringify(
              logDetails.bodyData,
              null,
              2
            )}</div>
        </div>`
            : ""
        }

        <div class="section">
            <h3>🔒 Security Headers</h3>
            <div class="info-row"><span class="label">Sec-Fetch-Site:</span><span class="value">${
              logDetails.secFetchSite || "N/A"
            }</span></div>
            <div class="info-row"><span class="label">Sec-Fetch-Mode:</span><span class="value">${
              logDetails.secFetchMode || "N/A"
            }</span></div>
            <div class="info-row"><span class="label">Sec-Fetch-Dest:</span><span class="value">${
              logDetails.secFetchDest || "N/A"
            }</span></div>
            <div class="info-row"><span class="label">DNT (Do Not Track):</span><span class="value">${
              logDetails.dnt || "N/A"
            }</span></div>
        </div>

        <div class="section">
            <h3>📋 Additional Information</h3>
            <div class="info-row"><span class="label">Content-Type:</span><span class="value">${
              logDetails.contentType || "N/A"
            }</span></div>
            <div class="info-row"><span class="label">Content-Length:</span><span class="value">${
              logDetails.contentLength || "N/A"
            }</span></div>
            <div class="info-row"><span class="label">Connection:</span><span class="value">${
              logDetails.connection || "N/A"
            }</span></div>
            <div class="info-row"><span class="label">Cache-Control:</span><span class="value">${
              logDetails.cacheControl || "N/A"
            }</span></div>
        </div>
    </div>
</body>
</html>
        `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.LOG_EMAIL || process.env.EMAIL_USER,
      subject: `📊 Portfolio Visit: ${logDetails.method} ${logDetails.path} - ${logDetails.browser} on ${logDetails.os}`,
      html: emailContent,
    });
  } catch (error) {
    console.error("Error sending log email:", error.message);
  }
};

// Parse browser from user agent
const parseBrowser = (userAgent) => {
  if (!userAgent) return "Unknown";
  if (userAgent.includes("Edg/")) return "Edge";
  if (userAgent.includes("Chrome/") && !userAgent.includes("Edg/"))
    return "Chrome";
  if (userAgent.includes("Firefox/")) return "Firefox";
  if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/"))
    return "Safari";
  if (userAgent.includes("Opera/") || userAgent.includes("OPR/"))
    return "Opera";
  return "Other";
};

// Parse OS from user agent
const parseOS = (userAgent) => {
  if (!userAgent) return "Unknown";
  if (userAgent.includes("Windows NT 10.0")) return "Windows 10/11";
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac OS X")) return "macOS";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  if (userAgent.includes("Linux")) return "Linux";
  return "Other";
};

// Parse device type from user agent
const parseDevice = (userAgent) => {
  if (!userAgent) return "Unknown";
  if (userAgent.includes("Mobile")) return "Mobile";
  if (userAgent.includes("Tablet") || userAgent.includes("iPad"))
    return "Tablet";
  return "Desktop";
};

const logRequest = (req, _, next) => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istDate = new Date(now.getTime() + istOffset);
  const dateStr = istDate.toISOString().replace("T", " ").replace("Z", " IST");

  // Simple log for file
  const simpleLog = `[${dateStr}] ${req.ip} ${req.method} ${req.originalUrl}`;
  console.log(simpleLog);
  fs.appendFileSync("log.txt", `${simpleLog}\n`);

  // Collect detailed information for email
  const logDetails = {
    timestamp: dateStr,
    method: req.method,
    url: req.originalUrl,
    path: req.path,
    protocol: req.protocol,
    httpVersion: req.httpVersion,
    ip: req.ip || req.connection.remoteAddress,
    realIP: req.headers["x-real-ip"],
    forwardedFor: req.headers["x-forwarded-for"],
    forwardedHost: req.headers["x-forwarded-host"],
    userAgent: req.headers["user-agent"],
    browser: parseBrowser(req.headers["user-agent"]),
    os: parseOS(req.headers["user-agent"]),
    device: parseDevice(req.headers["user-agent"]),
    acceptLanguage: req.headers["accept-language"],
    acceptEncoding: req.headers["accept-encoding"],
    referer: req.headers["referer"] || req.headers["referrer"],
    origin: req.headers["origin"],
    host: req.headers["host"],
    contentType: req.headers["content-type"],
    contentLength: req.headers["content-length"],
    queryParams:
      Object.keys(req.query).length > 0 ? JSON.stringify(req.query) : null,
    bodyData: req.method !== "GET" && req.body ? req.body : null,
    connection: req.headers["connection"],
    secFetchSite: req.headers["sec-fetch-site"],
    secFetchMode: req.headers["sec-fetch-mode"],
    secFetchDest: req.headers["sec-fetch-dest"],
    dnt: req.headers["dnt"],
    cacheControl: req.headers["cache-control"],
  };

  // Send detailed email asynchronously (don't wait for it)
  sendLogEmail(logDetails).catch((err) =>
    console.error("Email error:", err.message)
  );

  next();
};

module.exports = logRequest;
