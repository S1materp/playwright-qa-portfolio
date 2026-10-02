# Bug report example
**ID:** BUG-001  
**Title:** Password with leading/trailing spaces has ambiguous behavior  
**Environment:** Chromium, local demo app  
**Severity:** Minor  
**Priority:** Medium

## Steps
1. Enter `parent@example.com`.
2. Enter ` secret1 `.
3. Click **Войти**.

## Actual
Spaces count as password characters and login succeeds.

## Expected
Requirement should define whether surrounding spaces are significant. If not, normalize input before validation.

## Note
This intentionally demonstrates requirement clarification before a fix.
