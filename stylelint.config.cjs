module.exports = {
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    customSyntax: 'postcss-html',
    plugins: [
      'stylelint-scss',
      'stylelint-declaration-block-no-ignored-properties',
      'stylelint-no-unsupported-browser-features',
      'stylelint-prettier',
    ],
    extends: ['stylelint-config-recess-order'],
    processors: ["stylelint-processor-astro"],
    rules: {
      'prettier/prettier': [true, { parser: 'css' }], // この行を変更
      'plugin/declaration-block-no-ignored-properties': true,
      'plugin/no-unsupported-browser-features': [
        true,
        {
          severity: 'warning',
        },
      ],
      'font-family-no-missing-generic-family-keyword': true,
      'declaration-block-no-shorthand-property-overrides': true,
      'selector-pseudo-element-colon-notation': 'double',
    },
    overrides: [
        {
          files: ['**/*.astro'],
          processors: ['stylelint-processor-astro'],
        },
      ],
  }
  