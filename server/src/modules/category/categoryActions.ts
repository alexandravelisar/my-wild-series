import type { RequestHandler } from "express";

import categoryRepository from "./categoryRepository";

// Declare the actions

const browse: RequestHandler = async (req, res, next) => {
  try {
    const categoriesFromDB = await categoryRepository.readAll();

    res.json(categoriesFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.read(categoryId);

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    next(err);
  }
};

// Export them to import them somewhere else

export default { browse, read };
