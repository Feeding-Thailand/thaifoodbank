const sharp = require("sharp")
module.exports = (inpath, outpath) => {
    const image = sharp(inpath)
    return image
        .metadata()
        .then(({ width, height }) => {
            const args = [null, null]
            args[height > width ? 1 : 0] = 500
            return image
                .resize(...args)
                .jpeg({
                    quality: 60,
                    chromaSubsampling: "4:4:4",
                })
                .toFile(outpath)
        })
        .catch(err => {
            console.log("[ERROR]", "formatImage", err)
        })
}
