# Playwright E2E Test Automation

This project leverages Playwright for end-to-end (E2E) testing according to the requirements in the test assignment. The project also provides examples of Jenkins pipelines for automated test execution and reporting.

---

## Getting Started

Note: The installation and launch instructions are for MacOS.
A Windows instructions TBU.

### Prerequisites
**Technology Stack Used:**
- [Node.js](https://nodejs.org/) (recommended NodeJS v20)
- [Yarn](https://yarnpkg.com/) (for dependency management)
- [Playwright](https://playwright.dev/) (updates via Yarn)

#### Installation of Global Packages
1. Install NodeJS and NVM (Node Version Manager):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   source ~/.nvm/nvm.sh
   nvm install 20
   ```

2. Install Yarn Package Manager:
   ```bash
   npm install --global yarn
   ```

---

### Installation
1. Clone the repository:
   ```bash
   cd path_to_your_git_folder
   git clone https://github.com/your-repo/playwright-tests.git
   cd playwright-tests
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install Playwright browsers:
   ```bash
   yarn playwright install --with-deps
   ```

---

## Project Structure

- **`tests/`** → Contains all E2E test suites
- **`helpers/`** → Utility functions, constants, and reusable logic
- **`playwright.config.ts`** → Playwright configuration file
- **`playwright-report/`** → Stores Playwright test reports
- **`ci/`** → Contains Jenkins CI/CD pipeline configuration

---

## How to Run Tests

### Local Execution
Run tests locally with the following command:

```bash
yarn run-tests
```

For a detailed HTML report after test execution:
```bash
yarn run-tests-with-report
```

To display the last test report without re-run:
```bash
yarn show-report
```

Remove saved test reports:
```bash
yarn clean-results
```

---

### Updating Reference Screenshots
Reference screenshots are updated using the following command:

```bash
yarn update-screenshots
```

---

## Linting & Formatting
This project uses BiomeJS for linting, formatting, and import organization.

### Commands
- **Lint code:**  
  ```bash
  yarn biome-lint
  ```

- **Format code:**  
  ```bash
  yarn biome-format
  ```

- **Check import organization:**  
  ```bash
  yarn check-imports
  ```

- **Apply formatting:**  
  ```bash
  yarn biome-format-apply
  ```

---
