module.exports = {
  'extends': 'eslint-config-hapi',
  'parserOptions': {
    'ecmaVersion': 8
  },
  'rules': {
    'indent': ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'spaced-comment': ['error', 'always'],
  },
  'env': {
    'browser': true,
  },
}
