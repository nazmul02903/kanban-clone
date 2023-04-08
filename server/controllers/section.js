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
