import Board from "../models/Board.js";
import Section from "../models/Section.js";
import Task from "../models/Task.js";

export const createBoard = async (req, res) => {
  try {
    const boardsCount = await Board.find().count();
    const board = await Board.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0,
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllBoard = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort("-position");

    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleBoard = async (req, res) => {
  try {
    const { boardId: _id } = req.params;
    const board = await Board.findOne({ user: req.user._id, _id });
    const sections = await Section.find({ board: _id });
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id })
        .populate("section")
        .sort("-position");
      section._doc.tasks = tasks;
    }
    board._doc.sections = sections;
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title, description } = req.body;
    if (title === "") req.body.title = "Untitled";
    if (description === "") req.body.description = "Add description here";
    const board = await Board.findByIdAndUpdate(boardId, {
      $set: { title, description },
    });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    console.log(boardId);
    await Board.findByIdAndDelete(boardId);

    const boards = await Board.find().sort("position");
    for (const key in boards) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
    }
    res.status(200).json("deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updatePosition = async (req, res) => {
  try {
    const boards = req.body;
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board._id, { $set: { position: key } });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
