const admin = require("firebase-admin")

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        req.authToken = req.headers.authorization.split(" ")[1]
    } else {
        req.authToken = null
    }

    return next()
}

const checkAuth = (req, res, next) => {
    return getAuthToken(req, res, async () => {
        try {
            const { authToken } = req
            const userInfo = await admin.auth().verifyIdToken(authToken)
            req.authId = userInfo.uid
            return next()
        } catch (e) {
            console.log(e)
            return res.status(401).send({
                error: "Unauthorized",
            })
        }
    })
}

module.exports = checkAuth
