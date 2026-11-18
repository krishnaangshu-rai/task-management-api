const taskRoutes = require("./routes/taskRoutes");

const sequelize = require("./database");
const express = require("express");
const app = express();
const PORT = 3000;

//middleware POST request use garda Express lai JSON data read garna
app.use(express.json());
app.use("/tasks", taskRoutes);

//server start garnu
async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully!");

    await sequelize.sync();

    console.log("Database tables created successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Database setup failed:", error);
  }
}

startServer();
