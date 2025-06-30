const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = 3000;
console.log(`Starting server...
Listening at Port: ${PORT}
Serving static files from: ${path.join(__dirname, "../frontend")}
`);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
