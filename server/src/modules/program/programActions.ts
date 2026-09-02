import programRepository from "./programRepository";

// Declare the action
import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();

  res.json(programsFromDB);
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);

    const program = await programRepository.read(programId);

    if (program == null) {
      res.sendStatus(404);
    } else {
      res.json(program);
    }
  } catch (err) {
    next(err);
  }
};

// Export it to import it somewhere else

export default { browse, read };
