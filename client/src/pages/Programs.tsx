import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then((data) => {
        setPrograms(data);
      });
  }, []);

  return (
    <main>
      <h1>Programs</h1>

      {programs.map((program) => (
        <article key={program.id}>
          <h2>{program.title}</h2>

          <img
            src={program.poster}
            alt={`Affiche de ${program.title}`}
            width="200"
          />

          <p>{program.synopsis}</p>
          <p>Pays : {program.country}</p>
          <p>Année : {program.year}</p>
        </article>
      ))}
    </main>
  );
}

export default Programs;
