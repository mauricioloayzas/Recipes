import React, { useEffect, useState } from "react";
import { RecipeService } from "../../Services/RecipeService"; // Path to your service class
import { Recipe } from "../../Interfaces/Recipe";

export const RecipeTable: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await RecipeService.fetchRecipes(); // Call fetchRecipes method
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        loadRecipes();
    }, []);

    const handleAddRecipe = async () => {
        const newRecipe: Recipe = { id: "", name: "New Recipe", status: true }; // Example data
        try {
            await RecipeService.addRecipe(newRecipe); // Add a new recipe
            setRecipes([...recipes, newRecipe]); // Add the new recipe to the state
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    const handleUpdateRecipe = async (id: string) => {
        const updatedRecipe: Recipe = { id, name: "Updated Recipe", status: false }; // Example data
        try {
            await RecipeService.updateRecipe(id, updatedRecipe); // Update the recipe
            setRecipes(recipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))); // Update the state
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    const handleDeleteRecipe = async (id: string) => {
        try {
            await RecipeService.deleteRecipe(id); // Delete the recipe
            setRecipes(recipes.filter((recipe) => recipe.id !== id)); // Remove the deleted recipe from the state
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    if (loading) {
        return <div>Loading recipes...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Recipes Table</h2>
            <button className="btn btn-primary mb-4" onClick={handleAddRecipe}>Add Recipe</button>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                        <td>
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleUpdateRecipe(recipe.id)}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-danger btn-sm ml-2"
                                onClick={() => handleDeleteRecipe(recipe.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
