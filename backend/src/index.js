const env = require("dotenv");
env.config();

const app = require("./app");
const connectDb = require("./db");

connectDb()
  .then(() => {
    const PORT = process.env.PORT || 8000;

    if (process.env.NODE_ENV === "DEV") {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.log(`Failed to connect to database: ${error.message}`);
  });
