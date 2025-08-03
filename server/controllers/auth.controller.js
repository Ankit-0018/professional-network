import bcrypt from "bcrypt";
import BlacklistToken from '../models/blackListToken.model.js';
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const register = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
console.log(req.body)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      bio,
    });

;

    return res.status(201).json({
      message: "User registered successfully",
      success : true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
      }
      
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const login = async (req, res) => {


  try {
    const { email, password } = req.body;

 
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login successful",
      success : true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
       message: 'Unauthorized',
       success : false
       });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token);
    const expiry = new Date(decoded.exp * 1000); 

    await BlacklistToken.create({ token, expiresAt: expiry });

    res.status(200).json({ 
      message: 'Logged out successfully',
      success : true
    
    });
  } catch (err) {
    res.status(500).json({
       message: 'Error during logout' ,
        success : false
      });
  }
};