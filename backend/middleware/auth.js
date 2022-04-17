import jwt from "jsonwebtoken"
const secret = "test"

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    if (token) {
      let decodedData = jwt.verify(token, secret)
      req.userId = decodedData?.id
    }

    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default auth
