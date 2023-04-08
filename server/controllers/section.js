import Section from "../models/Section.js";

export const createSection = async (req, res) => {
  const { boardId } = req.params;
  try {
    const section = await Section.create({ board: boardId });
    section._doc.task = [];
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteSection = async (req, res) => {
  const { sectionId } = req.params;

  try {
    await Section.findByIdAndDelete(sectionId);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const section = await Section.findByIdAndUpdate(sectionId, {
      $set: req.body,
    });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json(error);
  }
};
