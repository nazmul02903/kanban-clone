import User from "../models/user.js";

export const register = async (req, res, nex) => {
  try {
    const user = await User.create(req.body);
    res.cookie("token", user._id).status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const load = async (req, res, nex) => {
  try {
    const {token} = req.cookies;
    if(!token) throw {msg: "cookie not found"}
    const user = await User.findById(token);
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json(error)
  }
}

export const logout = async (req, res) => {
  try{
    const {token} = req.cookies;
    if(!token) throw {msg: "cookie not found"}
    res.clearCookie("token").json({msg: "logout successful"})
  }catch (error) {
    res.status(500).json({error})
  }
}

export const login = async (req, res, nex) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
     return res.status(401).json({
        params: "username",
        msg: "invalid username or password",
      });
    }

    if (user.password !== password) {
     return res.status(401).json({
        params: "password",
        msg: "invalid username or password",
      });
    }

    res.cookie("token", user._id).status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};
