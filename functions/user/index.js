const express = require("express")
const checkAuth = require("../checkAuth")
const router = express.Router()
const settingsUser = require('./settingsUser')
const registerUser = require('./registerUser')
router.get("/settings", checkAuth, settingsUser)
router.post("/register", checkAuth, registerUser)
const app = express()
const cors = require("cors")
app.use(cors)
app.use(checkAuth)
app.use(router)
module.exports = app