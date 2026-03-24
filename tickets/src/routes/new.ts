import express, { type Request, type Response } from "express";
import { requireAuth } from "@tickets2004/common";

const router = express.Router();

router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
