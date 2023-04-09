import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const taskCount = await Task.find({ section: sectionId });
    const task = await Task.create({
      section: sectionId,
      position: taskCount > 0 ? taskCount : 0,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    const tasks = await Task.find().sort("position");
    for (const key in tasks) {
      const board = tasks[key];
      await Task.findByIdAndUpdate(board.id, { $set: { position: key } });
    }
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;

  const body = req.body;

  try {
    if (body.title === "") {
      body.title = "untitled";
    }
    const task = await Task.findByIdAndUpdate(taskId, body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(err);
  }
};
