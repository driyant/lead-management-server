import { Request, Response } from 'express';
import prisma from '../config/prisma';

class LeadController {
  // Method to get all leads
  public static async index(
    req: Request,
    res: Response,
    next: (error?: unknown) => void,
  ): Promise<void> {
    // Load all leads from Prisma
    try {
      const leads = await prisma.lead.findMany();
      res.status(200).json({ leads });
    } catch (error) {
      next(error);
    }
  }

  public static async store(
    req: Request,
    res: Response,
    next: (error?: unknown) => void,
  ): Promise<void> {
    try {
      console.log(req.body, "req body")
      await prisma.lead.create({
        data: req.body,
      });
      res.status(201).json({ Message: "Lead created successfully" });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

export default LeadController;