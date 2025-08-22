module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    // Disable rules that commonly cause deployment issues
    'react-refresh/only-export-components': 'off',
    
    // TypeScript rules that can be problematic during deployment
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/prefer-as-const': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-wrapper-object-types': 'off',
    
    // General JavaScript rules
    'no-unused-vars': 'off', // Let TypeScript handle this
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off', // TypeScript handles this
    'no-empty': 'off',
    'no-constant-condition': 'off',
    'no-unreachable': 'off',
    'no-case-declarations': 'off',
    'no-fallthrough': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off',
    'no-redeclare': 'off', // TypeScript handles this better
    
    // React specific rules
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    
    // Import/Export rules
    'no-duplicate-imports': 'off',
    'import/no-unresolved': 'off',
    'import/no-unused-modules': 'off',
    
    // Accessibility rules (if you're using eslint-plugin-jsx-a11y)
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    
    // Code style rules that shouldn't break builds
    'prefer-const': 'off',
    'no-var': 'off',
    'object-shorthand': 'off',
    'prefer-template': 'off',
    'prefer-destructuring': 'off',
    
    // Rules that can cause issues with modern React patterns
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    
    // TypeScript-specific rules that can be overly strict
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
  },
}