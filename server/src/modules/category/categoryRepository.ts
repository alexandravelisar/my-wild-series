import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
};

type Category = {
  id: number;
  name: string;
  programs: Program[];
};

class CategoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from category");

    return rows as Category[];
  }
}

export default new CategoryRepository();
