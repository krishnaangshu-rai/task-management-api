const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

// GET specific task by ID
router.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!Number.isInteger(Number(taskId)) || Number(taskId) <= 0) {
      return res.status(400).json({
        message: "Invalid task ID.",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

// POST task create garnu
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Task name must be a non-empty string.",
      });
    }

    const newTask = await Task.create({
      name: name,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

//task update garnu
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update.",
      });
    }

    // Validate name
    if (
      req.body.name !== undefined &&
      (typeof req.body.name !== "string" || !req.body.name.trim())
    ) {
      return res.status(400).json({
        message: "Task name must be a non-empty string.",
      });
    }

    // Validate completed
    if (
      req.body.completed !== undefined &&
      typeof req.body.completed !== "boolean"
    ) {
      return res.status(400).json({
        message: "Completed must be true or false.",
      });
    }

    // Keep only allowed fields
    const updates = {};

    if (req.body.name !== undefined) {
      updates.name = req.body.name;
    }

    if (req.body.completed !== undefined) {
      updates.completed = req.body.completed;
    }

    // Check if any allowed field was provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update.",
      });
    }

    // Update task
    await task.update(updates);

    // Return updated task
    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

//task delete garnu
router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!Number.isInteger(Number(taskId)) || Number(taskId) <= 0) {
      return res.status(400).json({
        message: "Invalid task ID.",
      });
    }
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.destroy();

    res.json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error.",
    });
  }
});
module.exports = router;
