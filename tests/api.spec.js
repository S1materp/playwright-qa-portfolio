const { test, expect } = require('@playwright/test');

test.describe('REST API — courses', () => {
  test('TC-API-01 returns a list of courses with required fields', async ({ request }) => {
    const response = await request.get('/api/courses');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    const courses = await response.json();
    expect(courses).toHaveLength(2);
    expect(courses[0]).toEqual(expect.objectContaining({
      id: 1,
      title: 'Математика',
      level: expect.any(String),
    }));
  });
});

test.describe('REST API — feedback validation', () => {
  const submit = (request, message) => request.post('/api/feedback', { data: { message } });

  test('TC-API-02 accepts a valid message', async ({ request }) => {
    const response = await submit(request, 'Полезная обратная связь');
    expect(response.status()).toBe(201);
    expect(await response.json()).toEqual({
      status: 'created',
      message: 'Полезная обратная связь',
    });
  });

  for (const [id, message] of [
    ['TC-API-03', 'x'],
    ['TC-API-04', '  '],
    ['TC-API-05', ''],
  ]) {
    test(`${id} rejects short or blank feedback: ${JSON.stringify(message)}`, async ({ request }) => {
      const response = await submit(request, message);
      expect(response.status()).toBe(400);
      expect(await response.json()).toEqual({ error: 'Message is too short' });
    });
  }

  test('TC-API-06 accepts exactly three characters', async ({ request }) => {
    const response = await submit(request, 'abc');
    expect(response.status()).toBe(201);
    expect((await response.json()).message).toBe('abc');
  });

  test('TC-API-07 rejects malformed JSON', async ({ request }) => {
    const response = await request.post('/api/feedback', {
      headers: { 'content-type': 'application/json' },
      data: '{invalid json',
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid JSON' });
  });

  test('TC-API-08 rejects missing message', async ({ request }) => {
    const response = await request.post('/api/feedback', { data: {} });
    expect(response.status()).toBe(400);
    expect((await response.json()).error).toBe('Message is too short');
  });
});
