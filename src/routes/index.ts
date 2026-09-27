import { Request, Response, Router } from 'express';
import LeadController from '../controllers/LeadController';


const router = Router();

// Endpoint 1: Base Health Check
router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'OK' });
});

// Router Leads
router.get('/api/leads', LeadController.index);
router.post('/api/leads', LeadController.store);

export default router;