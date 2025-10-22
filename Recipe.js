var recipeID;
var recipe;
var recipeName;
var recipeSteps;

async function loadRecipe() {
    recipeID = localStorage.getItem('recipeID');
    recipe = await getRecipe(recipeID);
    recipeName = document.getElementById("recipeName");
    recipeSteps = document.getElementById("steps");
    recipeName.innerHTML = recipe.name;
    recipeSteps.innerHTML = recipe.steps.map(step => {
        return `<p>* ${step.action.name} ${step.product.name} using ${step.tool.name}</p>`;
    }).join("<hr>");
}

async function getRecipe(id) {
    const recipeText = await getRecipeJSON(id);
    const recipeObject = RecipeClass.fromJSON(recipeText);
    return recipeObject;
}

async function editRecipe() {
    localStorage.setItem('recipe', JSON.stringify(recipe));
    window.open("EditRecipe.html", "_self");
}
loadRecipe();