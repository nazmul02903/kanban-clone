import User from "../models/user";

export const register = async (req, res, nex) => {
  try {
    const user = await User.create(req.body);
    res.cookie("token", user._id).status(200).json({ user });
  } catch (error) {
    req.status(500).json(error);
  }
};

export const login = async (req, res, nex) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        params: "username",
        msg: "invalid username or password",
      });
    }

    if (user.password !== password) {
      res.status(401).json({
        params: "password",
        msg: "invalid username or password",
      });
    }

    res.cookie("token", user._id).status(201).json({ user });
  } catch (error) {
    req.status(500).json(error);
  }
};
