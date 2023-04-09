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
