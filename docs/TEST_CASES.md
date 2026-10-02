# Test cases
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| TC-UI-01 | Valid login | Valid email + 6+ char password, Login | Вход выполнен |
| TC-UI-02 | Invalid email | Malformed email + valid password | Validation error |
| TC-UI-03 | Boundary password | Valid email + 5-char password | Validation error |
| TC-UI-04 | Load courses | Click load courses | Two courses shown |
| TC-API-01 | Courses API | GET /api/courses | 200 + JSON array |
| TC-API-02 | Feedback API | POST valid message | 201 created |
| TC-API-03 | Negative API | POST 1-char message | 400 error |
