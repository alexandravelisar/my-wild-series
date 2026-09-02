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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const program = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    const affectedRows = await programRepository.update(program);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    const insertId = await programRepository.create(newProgram);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);

    await programRepository.delete(programId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { title, synopsis, poster, country, year, category_id } = req.body;

  if (title == null) {
    errors.push({
      field: "title",
      message: "The field is required",
    });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }

  if (synopsis == null) {
    errors.push({
      field: "synopsis",
      message: "The field is required",
    });
  }

  if (poster == null) {
    errors.push({
      field: "poster",
      message: "The field is required",
    });
  }

  if (country == null) {
    errors.push({
      field: "country",
      message: "The field is required",
    });
  }

  if (year == null) {
    errors.push({
      field: "year",
      message: "The field is required",
    });
  }

  if (category_id == null) {
    errors.push({
      field: "category_id",
      message: "The field is required",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};
// Export it to import it somewhere else

export default { browse, read, edit, add, destroy, validate };
