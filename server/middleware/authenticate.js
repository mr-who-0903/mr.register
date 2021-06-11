const jwt = require('jsonwebtoken');
const {Data, User} = require('../model/userSchema');

const authenticate = async (req, res, next) =>{

    try{ 
        const getToken = req.cookies.jwtoken;
        const verifyToken = jwt.verify(getToken, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":getToken});

        if(!rootUser) {throw new Error( 'User not found' )}

        req.token = getToken;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }
    catch(err){
        res.status(401).json({ error: "Session expired, Login again" });
        console.log("authenticate.js : " + err);
    }
}


const authToGet = async (req, res, next) =>{

    try{ 
        const getToken = req.cookies.jwtoken;
        const verifyToken = jwt.verify(getToken, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":getToken});

        if(!rootUser) {throw new Error( 'User not found' )}

        const allData = await Data.find();
        console.log(allData);

        req.token = getToken;
        req.allData = allData;
        req.userID = rootUser._id;

        next();

    }
    catch(err){
        res.status(401).json({ error: "Session expired, Login again" });
        console.log("authenticate.js : " + err);
    }
}

module.exports = {authenticate, authToGet};   // nemesis