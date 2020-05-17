const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-help-matcher-dashboard-js": hot(preferDefault(require("C:\\Users\\Anonymous\\Documents\\thaifoodbank\\src\\pages\\help-matcher\\dashboard.js"))),
  "component---src-pages-help-matcher-index-js": hot(preferDefault(require("C:\\Users\\Anonymous\\Documents\\thaifoodbank\\src\\pages\\help-matcher\\index.js"))),
  "component---src-pages-help-matcher-register-js": hot(preferDefault(require("C:\\Users\\Anonymous\\Documents\\thaifoodbank\\src\\pages\\help-matcher\\register.js"))),
  "component---src-pages-help-matcher-view-js": hot(preferDefault(require("C:\\Users\\Anonymous\\Documents\\thaifoodbank\\src\\pages\\help-matcher\\view.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\Users\\Anonymous\\Documents\\thaifoodbank\\src\\pages\\index.js")))
}

