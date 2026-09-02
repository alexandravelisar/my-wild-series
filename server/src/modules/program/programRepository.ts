import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

class ProgramRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from program");

    return rows as Program[];
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );

    return rows[0] as Program;
  }
  async update(program: Program) {
    const [result] = await databaseClient.query<Result>(
      `
    update program
    set title = ?, synopsis = ?, poster = ?, country = ?, year = ?
    where id = ?
    `,
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.id,
      ],
    );

    return result.affectedRows;
  }
}

export default new ProgramRepository();
