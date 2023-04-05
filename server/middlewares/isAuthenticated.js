import User from "../models/user.js";

const isAuthenticated = async (req, res, nex) => {
    const {token} = req.cookies;
    if(token){
       const user = await User.findById(token)
       if(!user) return res.status(401).json('UnAuthorized')
       req.user = user
       nex()
    }else{
        res.status(401).json('Unathorized')
    }
}

export default isAuthenticated