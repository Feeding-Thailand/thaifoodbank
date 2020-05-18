const express = require("express")
const checkAuth = require("../checkAuth")
const router = express.Router()
const createdPosts = require('./createdPosts')
const geolocationPosts = require('./geolocationPosts')
router.get("/created", checkAuth, createdPosts)
router.get("/:lat/:lng/:radius", checkAuth, geolocationPosts)
const app = express()
const cors = require("cors")
app.use(cors)
app.use(checkAuth)
app.use(router)
module.exports = app