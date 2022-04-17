import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.js"
const secret = "test"

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const userExists = await UserModel.findOne({ email })
    if (!userExists)
      return res.status(404).json({ message: "User does not exist" })

    const passwordIsRight = await bcrypt.compare(password, userExists.password)

    if (!passwordIsRight)
      return res.status(400).json({ message: "Invalid credentials." })

    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      secret,
      {
        expiresIn: "12h",
      }
    )

    res.status(200).json({ result: userExists, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    const userExists = await UserModel.findOne({ email })
    if (userExists)
      return res
        .status(400)
        .json({ message: "A user with that email already exists." })

    let hashedPassowrd = await bcrypt.hash(password, 12)
    const result = await UserModel.create({
      email,
      password: hashedPassowrd,
      name: `${firstName} ${lastName}`,
    })
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "12h",
    })

    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
