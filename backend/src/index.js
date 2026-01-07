const env = require("dotenv");
env.config();

const app = require("./app");
const connectDb = require("./db");

connectDb()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Contact form endpoint: http://localhost:${PORT}/portfolio/api/v1/contact`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to database: ${error.message}`);
  });