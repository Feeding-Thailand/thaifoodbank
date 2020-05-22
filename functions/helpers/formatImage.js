const sharp = require("sharp")
module.exports = async imgpath => {
    const image = sharp(imgpath)
    const { width, height } = await image.metadata()
    const args = [null, null]
    args[height > width ? 1 : 0] = 500
    await image.resize(...args).toFile(imgpath)
}
