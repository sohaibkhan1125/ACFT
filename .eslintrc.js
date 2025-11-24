module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'import/first': 'off', // Disable import/first rule to allow initialization code
    'import/order': 'off', // Disable import order enforcement
    'no-console': 'warn', // Allow console.log but warn about it
    'no-unused-vars': 'warn', // Warn about unused variables
    'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies
    'no-undef': 'error', // Error on undefined variables
    'no-unreachable': 'error', // Error on unreachable code
    'no-duplicate-imports': 'error', // Error on duplicate imports
    'import/no-duplicates': 'error', // Error on duplicate imports
    'import/no-unresolved': 'off', // Allow unresolved imports for development
    'import/extensions': 'off', // Allow imports without extensions
    'import/no-extraneous-dependencies': 'off', // Allow dev dependencies in src
    'react/jsx-uses-react': 'off', // Disable React import requirement for JSX
    'react/react-in-jsx-scope': 'off', // Disable React import requirement for JSX
    'react/prop-types': 'off', // Disable prop-types requirement
    'react/jsx-props-no-spreading': 'off', // Allow prop spreading
    'react/jsx-filename-extension': ['warn', { 'extensions': ['.js', '.jsx'] }], // Allow JSX in .js files
    'jsx-a11y/anchor-is-valid': 'off', // Disable anchor validation
    'jsx-a11y/click-events-have-key-events': 'off', // Disable click event validation
    'jsx-a11y/no-static-element-interactions': 'off', // Disable static element interaction validation
    'prefer-const': 'warn', // Warn about variables that could be const
    'no-var': 'error', // Error on var usage
    'no-multiple-empty-lines': ['warn', { 'max': 2 }], // Warn about multiple empty lines
    'no-trailing-spaces': 'warn', // Warn about trailing spaces
    'eol-last': 'warn', // Warn about missing newline at end of file
    'comma-dangle': ['warn', 'never'], // Warn about trailing commas
    'semi': ['warn', 'always'], // Warn about missing semicolons
    'quotes': ['warn', 'single'], // Warn about quote style
    'indent': ['warn', 2], // Warn about indentation
    'max-len': ['warn', { 'code': 120 }], // Warn about long lines
    'object-curly-spacing': ['warn', 'always'], // Warn about object spacing
    'array-bracket-spacing': ['warn', 'never'], // Warn about array spacing
    'computed-property-spacing': ['warn', 'never'], // Warn about computed property spacing
    'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true }], // Warn about key spacing
    'space-before-blocks': 'warn', // Warn about space before blocks
    'space-before-function-paren': ['warn', 'never'], // Warn about function spacing
    'space-in-parens': ['warn', 'never'], // Warn about space in parentheses
    'space-infix-ops': 'warn', // Warn about operator spacing
    'space-unary-ops': 'warn', // Warn about unary operator spacing
    'spaced-comment': 'warn', // Warn about comment spacing
    'arrow-spacing': 'warn', // Warn about arrow function spacing
    'block-spacing': 'warn', // Warn about block spacing
    'brace-style': ['warn', '1tbs'], // Warn about brace style
    'camelcase': 'warn', // Warn about camelCase
    'comma-spacing': 'warn', // Warn about comma spacing
    'comma-style': 'warn', // Warn about comma style
    'curly': 'warn', // Warn about curly braces
    'dot-notation': 'warn', // Warn about dot notation
    'eqeqeq': 'warn', // Warn about equality
    'func-call-spacing': 'warn', // Warn about function call spacing
    'keyword-spacing': 'warn', // Warn about keyword spacing
    'linebreak-style': 'warn', // Warn about linebreak style
    'no-multi-spaces': 'warn', // Warn about multiple spaces
    'no-multiple-empty-lines': 'warn', // Warn about multiple empty lines
    'no-trailing-spaces': 'warn', // Warn about trailing spaces
    'no-whitespace-before-property': 'warn', // Warn about whitespace before property
    'object-property-newline': 'warn', // Warn about object property newlines
    'padded-blocks': 'warn', // Warn about padded blocks
    'quote-props': 'warn', // Warn about quote properties
    'rest-spread-spacing': 'warn', // Warn about rest spread spacing
    'template-curly-spacing': 'warn', // Warn about template curly spacing
    'yield-star-spacing': 'warn' // Warn about yield star spacing
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    'browser': true,
    'es6': true,
    'node': true
  },
  parserOptions: {
    'ecmaVersion': 2020,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  }
};
