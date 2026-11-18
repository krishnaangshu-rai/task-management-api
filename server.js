const Task = require("./models/Task");
const sequelize = require("./database");
const express = require("express");
const app = express();
const PORT = 3000;

const tasks = [
  {
    id: 1,
    title: "Learned Javascript",
    completed: false,
  },
  {
    id: 2,
    title: "Learned Node.js",
    completed: false,
  },
  {
    id: 3,
    title: "Learned Express.js",
    completed: true,
  },
];

//middleware POST request use garda Express lai JSON data read garna
app.use(express.json());

//all tasks read garnu
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

//specific task read garnu
app.get("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((t) => {
    return t.id === taskId;
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

//task create garnu
app.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({
      name: req.body.name,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//task update garnu
app.patch("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((t) => {
    return t.id === taskId;
  });

  if (!task) {
    res.status(404).json({ message: "Task not found." });
  }

  Object.assign(task, req.body);
  res.json(task);
});

//task delete garnu
app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((t) => {
    return t.id === taskId;
  });

  if (taskIndex == -1) {
    return res.status(404).json({ message: "Task not found." });
  }

  tasks.splice(taskIndex, 1);
  return res.json({ message: "Task deleted successfully." });
});

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully!");

    await sequelize.sync();

    console.log("Database tables created successfully!");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.log("Database setup failed:", error);
  }
}

startServer();
