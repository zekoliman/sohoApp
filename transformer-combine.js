const svgTransformer = require('react-native-svg-transformer');
const reactNativeReactBridgeTransformer = require('react-native-react-bridge/lib/plugin');

const {
  transform: babelTransform,
} = require('metro-react-native-babel-transformer');

module.exports.transform = function ({src, filename, options}) {
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({src, filename, options});
  } else if (/\.(png|jpg|jpeg|gif|webp)$/.test(filename)) {
    return {code: src, map: null};
  } else {
    return reactNativeReactBridgeTransformer.transform({
      src,
      filename,
      options,
    });
  }
};
