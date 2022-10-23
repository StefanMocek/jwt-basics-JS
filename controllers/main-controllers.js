const {BadRequestError} = require("../errors")
const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");

const login = async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    throw new BadRequestError("Provide username and password")
  }

  const id = new Date().getDate()

  const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: "30d"})

  res
    .status(StatusCodes.OK)
    .json({
      msg: "user created",
      token
    })
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  
  res
    .status(StatusCodes.OK)
    .json({
      msg: `hello ${req.user.username}`,
      secret: `your number is ${luckyNumber}`
    })
}

module.exports = {
  login,
  dashboard
}