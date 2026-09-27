import { Request, Response } from 'express';
import errorHandler from '../errors.js';

interface TestResponse extends Response {
  statusCalls: number[];
  jsonCalls: unknown[];
}

const createResponse = (): TestResponse => {
  const response = {
    statusCalls: [] as number[],
    jsonCalls: [] as unknown[],
    status(code: number) {
      this.statusCalls.push(code);
      return this;
    },
    json(body: unknown) {
      this.jsonCalls.push(body);
      return this;
    },
  } as TestResponse;

  return response;
};

describe('errorHandler', () => {
  const request = {} as Request;
  const next = () => undefined;

  it('returns an internal server error for unrecognized errors', () => {
    const response = createResponse();

    errorHandler(new Error('Unexpected error'), request, response, next);

    expect(response.statusCalls).toEqual([500]);
    expect(response.jsonCalls).toEqual([{
      message: 'INTERNAL SERVER ERROR',
    }]);
  });

  it('returns a not found response', () => {
    const response = createResponse();
    const error = new Error();
    error.name = 'NOT_FOUND';

    errorHandler(error, request, response, next);

    expect(response.statusCalls).toEqual([404]);
    expect(response.jsonCalls).toEqual([{ message: 'NOT FOUND' }]);
  });

  it('returns the conflict error message', () => {
    const response = createResponse();
    const error = new Error('Lead email already exists');
    error.name = 'CONFLICT';

    errorHandler(error, request, response, next);

    expect(response.statusCalls).toEqual([409]);
    expect(response.jsonCalls).toEqual([{
      message: 'Lead email already exists',
    }]);
  });

  it('uses the default conflict message when none is supplied', () => {
    const response = createResponse();
    const error = new Error();
    error.name = 'CONFLICT';

    errorHandler(error, request, response, next);

    expect(response.statusCalls).toEqual([409]);
    expect(response.jsonCalls).toEqual([{ message: 'DATA CONFLICT' }]);
  });
});