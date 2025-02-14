const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    //  Validate input

    if (!email || !password) {
      return res
        .status(400)
        .json({
          message: "Email and password are required!",
          error: true,
          success: false,
        });
    }
    console.time("email and passcheck")


    //  Find user in DB

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", error: true, success: false });
    }
    console.time("user in DB check")


    //  Compare password securely
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials!", error: true, success: false });
    }

    //  Create JWT Token
    const tokenData = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "8h",
    });

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    //  Set cookie & return response
    return res.status(200).cookie("token", token, tokenOption).json({
      message: "Login Successful",
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
