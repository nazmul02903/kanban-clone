import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const taskCount = await Task.find({ section: sectionId }).count();
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
    const currentTask = await Task.findById(taskId);
    await Task.findByIdAndDelete(taskId);
    const tasks = await Task.find({ section: currentTask.section }).sort(
      "position"
    );
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
  console.log("task")
  const { taskId } = req.params;

  const body = req.body;

  try {
    if (body.title === "") {
      body.title = "untitled";
    }
    const task = await Task.findByIdAndUpdate(taskId, body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = req.body;
  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();
  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await Task.findByIdAndUpdate(resourceListReverse[key]._id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        });
      }
    }
    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(destinationListReverse[key]._id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
