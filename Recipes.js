async function recipes() {

    const data = await fetchRecipesFromLocalhost();
    //temp
    const recipeNames = await getAllRecipesNames();
    
    if (!data) {
        alert("Failed to load recipe.");
        return;
    }

    //temp {
    if (!recipeNames) {
        alert("Failed to load recipe.");
        return;
    }
    //}

    const jsonArray = JSON.parse(data);

    if (jsonArray.length === 0) {
        alert("No recipes found.");
        return;
    }

    //temp {
    const recipes = JSON.parse(data);

    if (recipes.length === 0) {
        alert("No recipes found.");
        return;
    }
    //}

    /*
    const recipes = jsonArray.map(obj => new RecipeClass(obj.name, obj.id, obj.steps));

    const recipesHTML = document.getElementById("recipes");
    recipesHTML.innerHTML = recipes.map(recipe => {
        return `<p><button id = "showRecipe${recipe.id}">${recipe.name} recipe details</button> <button id = "deleteRecipe${recipe.id}">delete recipe</button></p>`;
    }).join("<hr>");
    recipes.map(recipe => {
        const buttonDelete = document.getElementById("showRecipe" + recipe.id);
        buttonDelete.addEventListener("click", () => {
            //getRecipe(recipe.id);
            localStorage.setItem('recipeID', recipe.id);
            window.open("Recipe.html", "_self");
        });
        const buttonShow = document.getElementById("deleteRecipe" + recipe.id);
        buttonShow.addEventListener("click", () => {
            deleteRecipe(recipe.id);
            location.reload();
        });
    });
    */

    const recipesHTML = document.getElementById("recipes");
    recipesHTML.innerHTML = recipes.map(recipe => {
        return `<p><button id = "showRecipe${recipe.id}">${recipe.name} recipe details</button> <button id = "deleteRecipe${recipe.id}">delete recipe</button></p>`;
    }).join("<hr>");
    recipes.map(recipe => {
        const buttonDelete = document.getElementById("showRecipe" + recipe.id);
        buttonDelete.addEventListener("click", () => {
            localStorage.setItem('recipeID', recipe.id);
            window.open("Recipe.html", "_self");
        });
        const buttonShow = document.getElementById("deleteRecipe" + recipe.id);
        buttonShow.addEventListener("click", () => {
            deleteRecipe(recipe.id);
            location.reload();
        });
    });
    
    document.getElementById("newRecipe").addEventListener("click", function(event) {
        event.preventDefault();
        var latestID = 0;
        recipes.map(recipe => {
            if (recipe.id > latestID) {
                latestID = recipe.id;
            }
        })
        latestID += 1;
        localStorage.setItem('latestRecipeID', latestID);
        window.location.href = this.href; // Manually navigate
    });

}
recipes();