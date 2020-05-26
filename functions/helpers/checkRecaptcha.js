const axios = require("axios")
const secret = require("../secrets/recaptchaSecret")

const recaptchaVerifyURL = "https://www.google.com/recaptcha/api/siteverify"

const checkRecaptcha = async (req, res, next) => {
    try {
        if (!req.query.response) {
            return res.status(400).send("Response not found")
        }
        const response = await axios.post(recaptchaVerifyURL, null, {params: {
            secret,
            response: req.query.response,
        }})
        if (response.data.success) {
            return next()
        } else {
            console.log(response.data)
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
