async function fetchRecipesFromLocalhost() {
    try {
        const response = await fetch("http://localhost:8080/api/recipes");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text(); // assuming JSON response
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function getRecipeJSON(id) {
    const recipeId = id;

    try {
        const response = await fetch(`http://localhost:8080/api/get/recipe/${recipeId}`);
        const data = await response.json(); // assuming JSON response
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function deleteRecipe(id) {
    const recipeId = id;

    try {
        await fetch(`http://localhost:8080/api/delete/recipe/${recipeId}`);
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function saveRecipe(newRecipe) {
    try {
        const response = await fetch("http://localhost:8080/api/save/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error saving recipe:", error);
        return null;
    }
}

async function updateRecipe(editedRecipe) {
    try {
        const response = await fetch("http://localhost:8080/api/update/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedRecipe)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error saving recipe:", error);
        return null;
    }
}