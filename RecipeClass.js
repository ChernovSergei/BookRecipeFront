class RecipeClass {
    constructor(name, id, steps = []) {
        this.name = name;
        this.id = id;
        this.steps = steps;
    }

    addStep(product, action, tool) {
        const step = new RecipeStep(product, action, tool);
        this.steps.push(step);
    }

    static fromJSON(json) {
        const stepsArray = Array.isArray(json.steps) ? json.steps : [];
        const steps = stepsArray.map(step => RecipeStep.fromJSON(step));
        return new RecipeClass(json.name, json.id, steps);
    }
}

class RecipeStep {
    constructor(product, action, tool) {
        this.product = new Product(product.name, product.type);
        this.action = new Action(action.name);
        this.tool = new Tool(tool.name);
    }

    static fromJSON(json) {
        return new RecipeStep(
            Product.fromJSON(json.product),
            Action.fromJSON(json.action),
            Tool.fromJSON(json.tool)
        );
    }
}

class Product {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    static fromJSON(json) {
        return new Product(json.name, json.type);
    }
}

class Tool {
    constructor(name) {
        this.name = name;
    }
    static fromJSON(json) {
        return new Tool(json.name);
    }
}

class Action {
    constructor(name) {
        this.name = name;
    }

    static fromJSON(json) {
        return new Action(json.name);
    }
}