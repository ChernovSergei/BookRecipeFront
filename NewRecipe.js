var stepIterator = 0;
var paragraphs = 0;
const deleteStepID = "deleteStep_";
const stepID = "step_";
const productID = "product_";
const productTypeID = "productType_";
const toolID = "tool_";
const actionID = "action_";

async function assembleRecipe() {
    var latestRecipeID = localStorage.getItem('latestRecipeID');
    const recipeName = await getRecipeName();
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
    const recipe = new RecipeClass(recipeName, latestRecipeID, steps);
    saveRecipe(recipe);
    window.open("Recipes.html", "_self");
}

async function getRecipeName() {
    const nameHTML = document.getElementById("recipeName");
    return nameHTML.value;
}

async function addStep() {
    paragraphs += 1;
    const stepHTML = document.getElementById("steps"); 
    const p = document.createElement("p");
    p.id = stepID + stepIterator;

    const button = document.createElement("button");
    button.id = deleteStepID + stepIterator;
    button.textContent = "-";
    button.onclick = function() {
        paragraphs -= 1;
        stepHTML.removeChild(p);
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

    p.append(button);
    p.append(actionInput);
    p.append(productInput);
    p.append(productTypeInput);
    p.append(" using ");
    p.append(toolInput);
    stepIterator += 1;
    stepHTML.appendChild(p);
}