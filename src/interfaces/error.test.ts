import { CustomError, HTTPError } from './error';

describe('Given', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let error: CustomError;
  beforeEach(() => {
    error = new HTTPError(418, 'Boo', 'Im a ghost');
  });
  test('should first', () => {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HTTPError);
    expect(error).toHaveProperty('statusCode', 418);
    expect(error).toHaveProperty('statusMessage', 'Boo');
    expect(error).toHaveProperty('message', 'Im a ghost');
    expect(error).toHaveProperty('name', 'HTTPError');
  });
});
