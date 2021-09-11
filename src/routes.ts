import { Express, Request, Response } from "express";
export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  // POST /api/user

  // Login
  // POST /api/sessions

  // get the user's sessions
  // GET /api/sessions

  // logout
  // DELETE /api/sessions
}
