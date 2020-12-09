module.exports = {
  extends: [
    '@cybozu/eslint-config/presets/react-prettier',
    '@cybozu/eslint-config/globals/kintone',
    '@cybozu/eslint-config/presets/react-typescript-prettier',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
}
