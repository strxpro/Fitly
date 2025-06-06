module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './components',
            '@assets': './assets',
            '@i18n': './src/i18n',
            '@lib': './lib',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@store': './store'
          },
        },
      ],
      ["@babel/plugin-transform-modules-commonjs", { "allowTopLevelThis": true }]
    ]
  };
}; 