var recipe;
var recipeSteps;
var stepIterator = 0;
var paragraphs = 0;
const deleteStepID = "deleteStep_";
const stepID = "step_";
const productID = "product_";
const productTypeID = "productType_";
const toolID = "tool_";
const actionID = "action_";

async function loadEditRecipe() {
    const raw = localStorage.getItem('recipe');
    recipe = await JSON.parse(raw);
    editRecipeName();
    editRecipeSteps();
}

async function editRecipeName() {
    const recipeNameHeader = document.getElementById("recipeNameHeader");
    const recipeNameInput = document.createElement("input");
    recipeNameInput.type = "text";
    recipeNameInput.id = "recipeNameInput";
    recipeNameInput.value = recipe.name;
    recipeNameInput.placeholder = "Recipe name";
    recipeNameHeader.append("Edit Recipe Name: ");
    recipeNameHeader.append(recipeNameInput);
}

async function editRecipeSteps() {
    const recipeSteps = document.getElementById("stepsEdit")
    recipeSteps.innerHTML = "";

    const fragment = document.createDocumentFragment();
    recipe.steps.forEach((step, index) => {
        const stepNode = addStep(step);
        fragment.appendChild(stepNode);

        if (index < recipe.steps.lenght - 1) {
            fragment.appendChild(document.createElement("hr"));
        }

        recipeSteps.appendChild(fragment);
    });
}

function addEmptyStep() {
    const recipeSteps = document.getElementById("stepsEdit")
    const fragment = document.createDocumentFragment();
    const stepNode = addStep(null);
    fragment.appendChild(stepNode);
    fragment.appendChild(document.createElement("hr"));
    recipeSteps.appendChild(fragment);
}

function addStep(step) {
    paragraphs += 1;
    const p = document.createElement("p");
    p.id = stepID + stepIterator;

    const button = document.createElement("button");
    button.id = deleteStepID + stepIterator;
    button.textContent = "-";
    button.onclick = function() {
        paragraphs -= 1;
        p.remove();
    };

    const actionInput = document.createElement("input");
    actionInput.type = "text";
    actionInput.id = actionID + stepIterator;
    actionInput.placeholder = "Action name";

    const productInput = document.createElement("input");
    productInput.type = "text";
    productInput.id = productID + stepIterator;
    productInput.placeholder = "Product name";

    const productTypeInput = document.createElement("input");
    productTypeInput.type = "text";
    productTypeInput.id = productTypeID + stepIterator;
    productTypeInput.placeholder = "Product type";

    const toolInput = document.createElement("input");
    toolInput.type = "text";
    toolInput.id = toolID + stepIterator;
    toolInput.placeholder = "Tool name";

    if (step) {
        actionInput.value = step.action.name;
        productInput.value = step.product.name;
        productTypeInput.value = step.product.type;
        toolInput.value = step.tool.name;
    }

    p.append(button);
    p.append(actionInput);
    p.append(productInput);
    p.append(productTypeInput);
    p.append(" using ");
    p.append(toolInput);
    stepIterator += 1;
    return p;
}

async function update() {
    const updatedRecipeName = document.getElementById("recipeNameInput")
    const steps = [];
    for (let i = 0; i < stepIterator; i++) {
        if (document.getElementById(stepID + i)) {
            const product = new Product(document.getElementById(productID + i).value, document.getElementById(productTypeID + i).value);
            const action = new Action(document.getElementById(actionID + i).value);
            const tool = new Tool(document.getElementById(toolID + i).value);
            const step = new RecipeStep(product, action, tool);
            steps.push(step);
        }
    }
    const editedRecipe = new RecipeClass(updatedRecipeName.value, recipe.id, steps);
    updateRecipe(editedRecipe);
    window.open("Recipes.html", "_self");
}

window.addEventListener('DOMContentLoaded', loadEditRecipe);
window.addEventListener('DOMContentLoaded', editRecipeSteps);
//window.addEventListener('DOMContentLoaded', addStep);
loadEditRecipe();