const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Ensure assets like PNGs still work
  config.resolver.assetExts = [
    ...config.resolver.assetExts.filter(ext => ext !== "svg"),
    "png", "jpg", "jpeg", "gif",
  ];
  
  config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

  config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

  return config;
})();
