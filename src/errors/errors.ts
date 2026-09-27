import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  void next;

  let code = 500;
  let message = 'INTERNAL SERVER ERROR';
  
  if (err instanceof Prisma.PrismaClientValidationError) {
    code = 400;
    message = 'BAD REQUEST';
  } else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    
    code = 409;
    message = 'DATA CONFLICT';
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    ['P2003', 'P2014', 'P2004'].includes(err.code)
  ) {
    code = 409;
    message = 'CONSTRAINT VIOLATION';
  } else if (err instanceof Error && err.name === 'NOT_FOUND') {
    code = 404;
    message = 'NOT FOUND';
  } else if (err instanceof Error && err.name === 'CONFLICT') {
    code = 409;
    message = err.message || 'DATA CONFLICT';

  } 

  res.status(code).json({ message });
};

export default errorHandler;