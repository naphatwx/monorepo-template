const base = require('./base')

module.exports = [
    ...base,
    {
        rules: {
            '@typescript-eslint/no-floating-promises': 'off',
        },
    },
]
