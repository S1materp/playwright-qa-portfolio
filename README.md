# Playwright QA Portfolio

[![Playwright Tests](https://github.com/S1materp/playwright-qa-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/S1materp/playwright-qa-portfolio/actions/workflows/playwright.yml)

A hands-on **QA automation and test-design portfolio** built around a small parent learning demo application. Includes browser tests, REST API checks, boundary-value testing, test documentation, and GitHub Actions CI.

> **Disclaimer:** This is an independent educational demo. It is **not affiliated with Uchi.ru or VK** and does not test their production services.

## What is tested

| Layer | Coverage | Tools |
|---|---|---|
| UI | Login success, invalid email, 5/6-character password boundaries, course rendering, feedback success/error | Playwright, Chromium |
| REST API | Course list schema, feedback success, blank/short input, 3-character boundary, missing field, malformed JSON | Playwright APIRequestContext |
| Test design | Test cases, checklist, example bug report | Markdown |
| CI | Install dependencies, run tests, upload HTML report | GitHub Actions |

The tests run against a local Node.js demo server and do not require external accounts or API keys.

## Repository structure

```text
public/                    # Demo application (HTML, CSS, JavaScript)
server.js                  # Local HTTP server and demo REST API
tests/
  ui.spec.js               # Browser E2E scenarios
  api.spec.js              # API and negative tests
docs/
  TEST_CASES.md            # Manual test scenarios
  CHECKLIST.md             # Test checklist
  BUG_REPORT_EXAMPLE.md    # Example defect report
.github/workflows/
  playwright.yml           # Automated CI checks
playwright.config.js       # Test runner configuration
```

## Run locally

Requirements: **Node.js 20+** and npm.

```bash
npm ci
npx playwright install chromium
npm test
```

Playwright automatically starts the local demo server on `http://127.0.0.1:3000`. To inspect the application manually, run `npm start` and open that address.

Other useful commands:

```bash
npm run test:ui        # Playwright interactive UI
npm run test:headed    # Run browser tests visibly
npm run report         # Open the HTML test report
```

## CI and debugging

The [GitHub Actions workflow](.github/workflows/playwright.yml) runs on pushes and pull requests to `main`. On failures, Playwright records screenshots and traces according to [the test configuration](playwright.config.js). The workflow uploads an HTML report as an artifact.

## Testing techniques demonstrated

- Positive and negative scenarios
- Equivalence classes and boundary values
- Status codes and JSON response assertions
- Semantic role locators, CSS selectors, and XPath
- Isolated browser contexts and automatic local server startup
- Repeatable local and CI test execution

## Project scope

The demo deliberately has no real authentication, database, or persistent feedback storage. Login and feedback are simplified to make test-design techniques easy to inspect. For integration tests involving PostgreSQL, Redis, and a production-style API, see [TaskFlow](https://github.com/S1materp/TaskFlow).
