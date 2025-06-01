const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true,
});

// Add TypeScript file extensions to be handled
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'ts',
  'tsx'
];

module.exports = config;