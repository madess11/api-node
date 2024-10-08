import User from '../models/User.js'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'User registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Login failed' });
  }
};
