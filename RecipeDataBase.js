let bufferRecipe = null;

export function saveBufferRecipe(recipe) {
    alert(recipe.name);
    bufferRecipe = recipe;
}

export function getBufferRecipe() {
    alert(bufferRecipe.name);
    return bufferRecipe;
}