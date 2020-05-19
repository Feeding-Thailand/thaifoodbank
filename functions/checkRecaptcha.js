const axios = require("axios")
const secret = require("./recaptchaSecret.js")

const recaptchaVerifyURL = "https://www.google.com/recaptcha/api/siteverify"

const checkRecaptcha = async (req, res, next) => {
    try {
        const { response: userResponse } = req.query
        const response = await axios.post(recaptchaVerifyURL, {
            secret,
            response: userResponse,
        })
        if (response.success) {
            return next()
        } else {
            return res.status(400).send("Unsuccessful reCAPTCHA verification")
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: "Unexpected API Error",
        })
    }
}

module.exports = checkRecaptcha
