const test = require("node:test");
const assert = require("node:assert");
const app = require("../app");

test("GET / should return the welcome message", async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const response = await fetch(`http://localhost:${port}/`);
    const body = await response.text();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(body, "Hello from my Node.js GitHub Actions project!");
  } finally {
    server.close();
  }
});

test("GET /health should return UP", async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const response = await fetch(`http://localhost:${port}/health`);
    const body = await response.json();

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(body, { status: "UP" });
  } finally {
    server.close();
  }
});
