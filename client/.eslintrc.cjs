module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es2021": true
  },
  "root": true,
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/jsx-runtime",
      'airbnb',
      'airbnb-typescript',
      "plugin:react/jsx-runtime"
  ],
  overrides: [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": "latest",
      "project": './tsconfig.json',
      "tsconfigRootDir": __dirname

  },
  "plugins": [
      "react",
      "@typescript-eslint"
  ],
  "rules": {
      "linebreak-style": 0,
      "max-len": ["error", { "code": 120 }],
      "react/function-component-definition": [2, {"namedComponents": "arrow-function",  "unnamedComponents": "arrow-function"}],
      "react/jsx-props-no-spreading": "off",
      'react/destructuring-assignment': 'off',
      'react/prop-types':'off'
  }
}