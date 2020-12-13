module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-console': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'class-methods-use-this': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'consistent-return': 'off',
        'import/prefer-default-export': 'off',
        'eslint(prettier/prettier)': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
