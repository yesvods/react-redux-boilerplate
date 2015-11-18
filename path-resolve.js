var path = require('path');
module.exports = {
  alias: {
    common: path.join(__dirname, "src/common"),
    styles: path.join(__dirname, "src/static/styles"),
    images: path.join(__dirname, "src/static/images"),
  },
  globalDependencies: {
    "React": "react",
    "ReactDOM": "react-dom",
    "_": "lodash",            //functional program library
  }
}