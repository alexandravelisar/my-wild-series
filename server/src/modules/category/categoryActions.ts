import type { RequestHandler } from "express";

import categoryRepository from "./categoryRepository";

// Some data to make the trick

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

const browse: RequestHandler = async (req, res, next) => {
  try {
    const categoriesFromDB = await categoryRepository.readAll();

    res.json(categoriesFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number(req.params.id);

  const category = categories.find((c) => c.id === parsedId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

export default { browse, read };
