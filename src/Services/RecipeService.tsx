import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Recipe, tableName } from "../Interfaces/Recipe";

export const fetchRecipes = async (): Promise<Recipe[]> => {
    const recipesCollection = collection(db, tableName);
    const snapshot = await getDocs(recipesCollection);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Recipe[];
};
