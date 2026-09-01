import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import CategoryDeleteForm from "../components/CategoryDeleteForm";

type Program = {
  id: number;
  title: string;
};

type Category = {
  id: number;
  name: string;
  programs: Program[];
};

function CategoryDetails() {
  const { id } = useParams();

  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  if (category === null) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <h1>{category.name}</h1>

      <Link to={`/categories/${category.id}/edit`}>Modifier</Link>

      <CategoryDeleteForm id={category.id}>Supprimer</CategoryDeleteForm>

      <h2>Programmes</h2>

      <ul>
        {category.programs.map((program) => (
          <li key={program.id}>{program.title}</li>
        ))}
      </ul>
    </>
  );
}

export default CategoryDetails;
