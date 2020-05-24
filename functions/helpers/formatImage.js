const sharp = require("sharp")
module.exports = async (inpath, outpath) => {
    const image = sharp(inpath)
    const { width, height } = await image.metadata()
    const args = [null, null]
    args[height > width ? 1 : 0] = 500
    await image
        .resize(...args)
        .jpeg({
            quality: 60,
            chromaSubsampling: "4:4:4",
        })
        .toFile(outpath)
}
