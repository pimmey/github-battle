module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals": {
    "window": true,
    "document": true
  },
  "rules": {
    "indent": ["error", 2],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "dot-location": [
      "error",
      "property"
    ]
  },
  "plugins": [
    "react"
  ]
};
