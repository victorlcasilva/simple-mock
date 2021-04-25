const getMock = require('../mock');

describe('Mock Test', () => {
  it('Mocked request', async () => {
    const mocked = getMock({ method: 'GET', path: '/test' });
    expect(mocked).not.toBeUndefined();
    expect(mocked).toHaveProperty('body');
    expect(mocked.body).toHaveProperty('message');
    expect(mocked.body.message).toEqual('Hello World!');
    expect(mocked).toHaveProperty('headers');
    expect(mocked.headers).toHaveProperty('mock');
    expect(mocked.headers.mock).toEqual('enabled');
  });
  it('Mocked request with param', async () => {
    const mocked = getMock({ method: 'GET', path: '/test?name=you' });
    expect(mocked).not.toBeUndefined();
    expect(mocked).toHaveProperty('body');
    expect(mocked.body).toHaveProperty('message');
    expect(mocked.body.message).toEqual('Hello You!');
    expect(mocked).toHaveProperty('headers');
    expect(mocked.headers).toHaveProperty('mock');
    expect(mocked.headers.mock).toEqual('enabled');
  });
  it('Not mocked request', () => {
    const mocked = getMock({ method: 'GET', path: '/teste' });
    expect(mocked).toBeUndefined();
  });
  it('Invalid mock request', () => {
    const mocked = getMock({ path: '/teste' });
    expect(mocked).toBeUndefined();
  });
});
