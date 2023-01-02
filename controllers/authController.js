const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
  
        // 1) Check if email and password exist
        if (!email || !password) {
            res.status(500).json({
                status: "failed",
                message: "Please enter your correct credentials"
            });;
        }
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email })
    
        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(500).json({
                status: "failed",
                message: "Please enter your correct credentials"
            });;
        }
    
        // 3) Create and sending token to client
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "90d"
        });

        user.password = undefined

        res.status(201).json({
            status: "success",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
    
  };
  

exports.register = async (req, res, next)=> {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
    
    
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "90d"
        });
        
        newUser.password = undefined
        newUser.passwordConfirm = undefined
        res.status(201).json({
            status: "success",
            token,
            newUser
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
    
};

exports.verifyToken = async(req, res, next)=> {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access denied")
        }
        console.log(token)

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user)
        next();

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};


  

