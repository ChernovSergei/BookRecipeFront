async function loadRecipe() {
    var recipeID = localStorage.getItem('recipeID');
    const recipe = await getRecipe(recipeID);
    const recipeHTML = document.getElementById("recipeName");
    const stepsHTML = document.getElementById("steps");
    recipeHTML.innerHTML = recipe.name;
    stepsHTML.innerHTML = recipe.steps.map(step => {
        return `<p>* ${step.action.name} ${step.product.name} using ${step.tool.name}</p>`;
    }).join("<hr>");
}

async function getRecipe(id) {
    const recipeText = await getRecipeJSON(id);
    const recipeObject = RecipeClass.fromJSON(recipeText);
    return recipeObject;
}
loadRecipe();