const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    rnrb: {
      // Set `true` if you use Preact in web side.
      // This will alias imports from `react` and `react-dom` to `preact/compat` automatically.
      preact: true,
      // Set `true` if you use react-native-web in web side.
      // This will alias imports from `react-native` to `react-native-web` automatically.
      web: true,
    },
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
