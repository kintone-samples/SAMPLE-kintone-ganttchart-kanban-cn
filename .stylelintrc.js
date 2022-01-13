module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-less',
    'stylelint-prettier/recommended',
  ],
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
}
