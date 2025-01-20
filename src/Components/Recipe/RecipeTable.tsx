// src/Components/Recipe/RecipeTable.tsx
import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../../Services/RecipeService";
import { Recipe } from "../../Interfaces/Recipe";

export const RecipeTable: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        loadRecipes();
    }, []);

    if (loading) {
        return <div>Loading recipes...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Recipes Table</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {recipes.map((recipe) => (
                    <tr key={recipe.id}>
                        <td>{recipe.id}</td>
                        <td>{recipe.name}</td>
                        <td>
                            <span
                                className={`badge ${
                                    recipe.status ? "badge-success" : "badge-danger"
                                }`}
                            >
                              {recipe.status ? "Active" : "Inactive"}
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
