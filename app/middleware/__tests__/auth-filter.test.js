const authFilter = require('../auth-filter');
const jwtUtils = require('../../utils/jwt-utils');

jest.mock('../../utils/jwt-utils')


describe('auth-filter.js', () => {

  beforeEach(() => jest.clearAllMocks());

  test('Auth-filter returns 401 for requests without token in the header', () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();
    jwtUtils.decodeToken.mockReturnValue(null);

    authFilter(req, res, next);
    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Auth-filter returns 401 for missing tokens in the header', () => {
    const req = { headers: { authorization: 'TOKEN' } };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();
    const UID = 1234;
    jwtUtils.decodeToken.mockReturnValue(UID);

    authFilter(req, res, next);
    expect(req.uid).toEqual(UID);
    expect(next).toBeCalledTimes(1);
  });

});

