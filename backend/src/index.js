const env = require("dotenv");
env.config();

const app = require("./app");
const connectDb = require("./db");

connectDb()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log("Server is Listening on Port :", port);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect with ${port} due to ${error.message}`);
  });


  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
