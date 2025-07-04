const express = require("express");
const path = require("path");
const app = express();
const logReq = require("./middlewares/log.middleware");
const { BASE_URL } = require("./constant");

const cors = require("cors");
// const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use(logReq);

// importing routers

const userRoute = require("./routes/about.route");
app.use(`${BASE_URL}/about`, userRoute);

const skillRoute = require("./routes/skills.route");
app.use(`${BASE_URL}/skills`, skillRoute);

const projectRoute = require("./routes/project.route");
app.use(`${BASE_URL}/projects`, projectRoute);

const contactRoute = require("./routes/contact.route");
app.use(`${BASE_URL}/contact`, contactRoute);

module.exports = app;
