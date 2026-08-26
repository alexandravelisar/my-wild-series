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

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      select 
        category.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", program.id, "title", program.title
          )
        ) as programs 
      from 
        category 
        left join program on program.category_id = category.id 
      where 
        category.id = ? 
      group by 
        category.id
      `,
      [id],
    );

    return rows[0] as Category;
  }
}

export default new CategoryRepository();
