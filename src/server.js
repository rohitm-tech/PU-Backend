require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const config = require("./config");

const start = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
