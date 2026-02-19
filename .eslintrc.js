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
    'no-trailing-spaces': 'off', // Disable trailing spaces rule
    'eol-last': 'off', // Disable end of file newline rule
    'comma-dangle': 'off', // Disable trailing commas rule
    'semi': ['warn', 'always'], // Keep semi as warning
    'quotes': ['warn', 'single'], // Keep quotes as warning
    'indent': 'off', // Disable indentation rule
    'max-len': 'off', // Disable max length rule
    'object-curly-spacing': 'off', // Disable object spacing rule
    'array-bracket-spacing': 'off', // Disable array spacing rule
    'computed-property-spacing': 'off', // Disable computed property spacing rule
    'key-spacing': 'off', // Disable key spacing rule
    'space-before-blocks': 'off', // Disable space before blocks rule
    'space-before-function-paren': 'off', // Disable function spacing rule
    'space-in-parens': 'off', // Disable space in parentheses rule
    'space-infix-ops': 'off', // Disable operator spacing rule
    'space-unary-ops': 'off', // Disable unary operator spacing rule
    'spaced-comment': 'off', // Disable comment spacing rule
    'arrow-spacing': 'off', // Disable arrow function spacing rule
    'block-spacing': 'off', // Disable block spacing rule
    'brace-style': 'off', // Disable brace style rule
    'camelcase': 'off', // Disable camelCase rule
    'comma-spacing': 'off', // Disable comma spacing rule
    'comma-style': 'off', // Disable comma style rule
    'curly': 'off', // Disable curly braces rule
    'dot-notation': 'off', // Disable dot notation rule
    'eqeqeq': 'off', // Disable equality rule
    'func-call-spacing': 'off', // Disable function call spacing rule
    'keyword-spacing': 'off', // Disable keyword spacing rule
    'linebreak-style': 'off', // Disable linebreak style rule
    'no-multi-spaces': 'off', // Disable multiple spaces rule
    'no-multiple-empty-lines': 'off', // Disable multiple empty lines rule
    'no-whitespace-before-property': 'off', // Disable whitespace before property rule
    'object-property-newline': 'off', // Disable object property newlines rule
    'padded-blocks': 'off', // Disable padded blocks rule
    'quote-props': 'off', // Disable quote properties rule
    'rest-spread-spacing': 'off', // Disable rest spread spacing rule
    'template-curly-spacing': 'off', // Disable template curly spacing rule
    'yield-star-spacing': 'off' // Disable yield star spacing rule
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
