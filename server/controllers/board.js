import Board from "../models/Board.js";

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
    console.log(_id);
    const board = await Board.findOne({ user: req.user._id, _id });

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};
