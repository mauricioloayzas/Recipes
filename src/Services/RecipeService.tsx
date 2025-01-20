import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Recipe, tableName } from "../Interfaces/Recipe";

// Class to handle Recipe operations
export class RecipeService {
    // Method to fetch all recipes from Firestore
    public static async fetchRecipes(): Promise<Recipe[]> {
        try {
            const recipesCollection = collection(db, tableName);
            const snapshot = await getDocs(recipesCollection);

            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Recipe[];
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw new Error("Unable to fetch recipes");
        }
    }

    // Method to add a new recipe to Firestore
    public static async addRecipe(newRecipe: Recipe): Promise<void> {
        try {
            const recipesCollection = collection(db, tableName);
            await addDoc(recipesCollection, newRecipe);
            console.log("Recipe added successfully!");
        } catch (error) {
            console.error("Error adding recipe:", error);
            throw new Error("Unable to add recipe");
        }
    }

    // Method to update an existing recipe by ID
    public static async updateRecipe(id: string, updatedRecipe: Recipe): Promise<void> {
        try {
            const recipeDoc = doc(db, tableName, id);
            await updateDoc(recipeDoc, updatedRecipe);
            console.log("Recipe updated successfully!");
        } catch (error) {
            console.error("Error updating recipe:", error);
            throw new Error("Unable to update recipe");
        }
    }

    // Method to delete a recipe by ID
    public static async deleteRecipe(id: string): Promise<void> {
        try {
            const recipeDoc = doc(db, tableName, id);
            await deleteDoc(recipeDoc);
            console.log("Recipe deleted successfully!");
        } catch (error) {
            console.error("Error deleting recipe:", error);
            throw new Error("Unable to delete recipe");
        }
    }
}
