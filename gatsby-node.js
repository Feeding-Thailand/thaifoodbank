/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({
    stage,
    actions,
    getConfig,
    loaders
}) => {
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [{
                    test: /mapbox-gl/,
                    use: loaders.null(),
                }]
            },
            externals: getConfig().externals.concat(function (context, request, callback) {
                const regex = /^@?firebase(\/(.+))?/;
                // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
                if (regex.test(request)) {
                    return callback(null, 'umd ' + request);
                }
                callback();
            })
        });
    }
};