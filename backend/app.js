import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"

import homeRoutes from "./routes/home.js"

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use("/home", homeRoutes)
app.get("/", (req, res) => {
  res.send("Hello World")
})

mongoose
  .connect("mongodb://localhost:27017/Destination", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server Running on Port: ${port}`))
  )
  .catch((error) => console.log(`${error} could not connect`))
