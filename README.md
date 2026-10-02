# Playwright QA Portfolio Project
QA-проект под стажировку: ручной test design + UI/API automation + CI.

> Демо-приложение создано специально для портфолио и не является продуктом Учи.ру/VK.

## Что демонстрирует
- test cases, checklist и bug report;
- UI-автотесты Playwright;
- API-тесты Playwright request;
- ID/CSS, role-based и XPath locators;
- assertions и boundary value analysis;
- HTML/CSS/JavaScript + npm;
- GitHub Actions CI.

## Запуск
Требуется Node.js 20+.
```bash
npm install
npx playwright install chromium
npm test
```
UI mode:
```bash
npm run test:ui
```
HTML report:
```bash
npm run report
```
