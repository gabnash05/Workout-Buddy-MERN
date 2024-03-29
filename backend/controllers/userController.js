import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken';


function createToken(_id) {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}


//LOGIN USER
export async function logInUser(req, res) {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//SIGNUP USER
export async function signUpUser(req, res) {
  
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}