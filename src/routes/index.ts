import { Request, Response, Router } from 'express';

const router = Router();

// Endpoint 1: Base Health Check
router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'OK' });
});


export default router;