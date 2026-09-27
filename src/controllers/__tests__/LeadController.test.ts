import { jest } from '@jest/globals';
import { Lead, LeadStatus } from '@prisma/client';
import { Request, Response } from 'express';
import LeadController from '../LeadController.js';
import prisma from '../../config/prisma.js';

interface TestResponse extends Response {
  statusCalls: number[];
  jsonCalls: unknown[];
}

const lead: Lead = {
  id: 'lead-1',
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  status: LeadStatus.NEW,
  createdAt: new Date('2026-09-27T00:00:00.000Z'),
};

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

describe('LeadController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('index', () => {
    it('returns all leads', async () => {
      const response = createResponse();
      const nextErrors: unknown[] = [];
      const findMany = jest
        .spyOn(prisma.lead, 'findMany')
        .mockResolvedValue([lead]);

      await LeadController.index(
        {} as Request,
        response,
        (error) => nextErrors.push(error),
      );

      expect(findMany).toHaveBeenCalledWith();
      expect(response.statusCalls).toEqual([200]);
      expect(response.jsonCalls).toEqual([{ leads: [lead] }]);
      expect(nextErrors).toEqual([]);
    });

    it('forwards database errors to the error handler', async () => {
      const response = createResponse();
      const error = new Error('Database unavailable');
      const nextErrors: unknown[] = [];
      jest.spyOn(prisma.lead, 'findMany').mockRejectedValue(error);

      await LeadController.index(
        {} as Request,
        response,
        (nextError) => nextErrors.push(nextError),
      );

      expect(nextErrors).toEqual([error]);
      expect(response.statusCalls).toEqual([]);
    });
  });

  describe('store', () => {
    it('creates a lead from the request body', async () => {
      const response = createResponse();
      const nextErrors: unknown[] = [];
      const body = {
        name: lead.name,
        email: lead.email,
        status: lead.status,
      };
      const create = jest.spyOn(prisma.lead, 'create').mockResolvedValue(lead);

      await LeadController.store(
        { body } as Request,
        response,
        (error) => nextErrors.push(error),
      );

      expect(create).toHaveBeenCalledWith({ data: body });
      expect(response.statusCalls).toEqual([201]);
      expect(response.jsonCalls).toEqual([{
        Message: 'Lead created successfully',
      }]);
      expect(nextErrors).toEqual([]);
    });

    it('forwards database errors to the error handler', async () => {
      const response = createResponse();
      const error = new Error('Database unavailable');
      const nextErrors: unknown[] = [];
      jest.spyOn(prisma.lead, 'create').mockRejectedValue(error);

      await LeadController.store(
        { body: {} } as Request,
        response,
        (nextError) => nextErrors.push(nextError),
      );

      expect(nextErrors).toEqual([error]);
      expect(response.statusCalls).toEqual([]);
    });
  });
});