# Design System App

A React-based design system built with Vite, TypeScript, and Storybook.

## Installation

### From GitHub Packages

```bash
# Configure npm to use GitHub Packages for @reasonjun scope
npm config set @reasonjun:registry https://npm.pkg.github.com

# Install the package
npm install @reasonjun/design-system-app
```

### Usage

```tsx
import { Button, Input } from '@reasonjun/design-system-app';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text" />
    </div>
  );
}
```

## Getting Started

```bash
# Install dependencies
yarn install

# Start Storybook
yarn storybook

# Build Storybook
yarn build-storybook

# Run tests
yarn test
```

## Chromatic Setup

This project uses [Chromatic](https://www.chromatic.com/) for visual testing and review. Chromatic has been automated using GitHub Actions.

### Setting up Chromatic

1. Create an account on [Chromatic](https://www.chromatic.com/) and add your project
2. Get your project token from Chromatic
3. Add the token as a secret in your GitHub repository:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `CHROMATIC_PROJECT_TOKEN`
   - Value: Your Chromatic project token
   - Click "Add secret"

### Workflow

The GitHub Actions workflow will automatically:

- Run on every push to `develop` and `main` branches
- Run on pull requests to `develop` and `main` branches
- Build your Storybook
- Publish to Chromatic
- Report visual changes for review

The workflow configuration can be found in `.github/workflows/chromatic.yml`.
