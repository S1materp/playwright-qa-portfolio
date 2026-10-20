# Test cases — Parent Learning Demo

The application is an independent educational demo, not a Uchi.ru/VK service. All tests run against the local demo server.

| ID | Layer | Scenario | Steps / Input | Expected result |
|---|---|---|---|---|
| TC-UI-01 | UI | Successful login | Enter valid email and 7-character password, click Login | Success message |
| TC-UI-02 | UI | Invalid email | Enter malformed email and valid password | Email validation error |
| TC-UI-03 | UI | Password below minimum | Enter valid email and 5-character password | Minimum 6-character error |
| TC-UI-04 | UI | Load courses | Click Load courses | Two courses appear; first is Mathematics |
| TC-UI-05 | UI | XPath selector | Locate Load courses button with XPath | Button is visible |
| TC-UI-06 | UI | Valid feedback | Submit a valid message | Thank-you message |
| TC-UI-07 | UI | Password at minimum | Enter valid email and exactly 6-character password | Successful login |
| TC-UI-08 | UI | Whitespace feedback | Submit two spaces | Validation error |
| TC-UI-09 | UI | Feedback at minimum | Submit exactly 3 characters | Thank-you message |
| TC-API-01 | API | List courses | GET /api/courses | 200, JSON array with two courses and required fields |
| TC-API-02 | API | Valid feedback | POST /api/feedback with valid message | 201, created status and matching message |
| TC-API-03 | API | One-character feedback | POST message 'x' | 400, Message is too short |
| TC-API-04 | API | Whitespace feedback | POST message '  ' | 400, Message is too short |
| TC-API-05 | API | Empty feedback | POST message '' | 400, Message is too short |
| TC-API-06 | API | Minimum accepted length | POST message 'abc' | 201, created |
| TC-API-07 | API | Malformed JSON | POST invalid raw JSON bytes | 400, Invalid JSON |
| TC-API-08 | API | Missing message | POST JSON object without message | 400, Message is too short |

## Test-design techniques

- **Boundary values:** password length 5 vs 6; feedback length 1, 2 whitespace characters, and 3 valid characters.
- **Negative testing:** invalid email, missing message, malformed JSON, and blank input.
- **API contract checks:** HTTP status, JSON content type, response fields, and returned values.
- **UI assertions:** visible feedback, button state, and rendered course content.

Automated implementations: [UI tests](../tests/ui.spec.js) and [API tests](../tests/api.spec.js).
