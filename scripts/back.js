export const getData = async () => {
    return await (await fetch('../recipes.json')).json()
};
//this is a big ojbect, having fonctions
export const backService = {
    getRecipes: async (filter) => {
        let recipes = await getData();

        if (filter.query?.length) {
            recipes = recipes.filter((recipe) => {
                const descriptionMatch = recipe.description.toLowerCase().includes(filter.query);
                const recipeNameMatches = recipe.name.toLowerCase().includes(filter.query);
                const ingredientsMatch = recipe.ingredients.some((element) => {
                    return element.ingredient.toLowerCase().includes(filter.query);
                });
                return recipeNameMatches || ingredientsMatch || descriptionMatch;
            });
        }

        if (filter.text.length) {
            filter.text.forEach(text => {
                recipes = recipes.filter((recipe) => {
                    const descriptionMatch = recipe.description.toLowerCase().includes(text);
                    const recipeNameMatches = recipe.name.toLowerCase().includes(text);
                    const ingredientsMatch = recipe.ingredients.some((element) => {
                        return element.ingredient.toLowerCase().includes(text);
                    });
                    return recipeNameMatches || ingredientsMatch || descriptionMatch;
                });
            })
        }

        if (filter.devices.length) {
            filter.devices.forEach((device) => {
                recipes = recipes.filter(recipe => recipe.appliance.toLowerCase() === device)

            })
        }

        if (filter.utensils.length) {
            filter.utensils.forEach(utensil => {
                recipes = recipes.filter(recipe => {
                    return recipe.utensils.includes(utensil.toLowerCase());
                });

            })
        }

        if (filter.ingredients.length) {
            filter.ingredients.forEach( ingr => {
                recipes = recipes.filter(recipe => {
                    const currentIngredients = recipe.ingredients.map( (i) => i.ingredient.toLowerCase() )
                    return currentIngredients.includes(ingr.toLowerCase());
                });
            })
        }
        return recipes;
    },
    getIngredients: (recipes) => {
        const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()))
        return Array.from(new Set(ingredients))
    },
    getDevices: (recipes) => {
        const devices = recipes.map(recipe => recipe.appliance.toLowerCase())
        return Array.from(new Set(devices))
    },
    getUtensils: (recipes) => {
        const utensils = recipes.flatMap(recipe => recipe.utensils.map(u => u.toLowerCase()))
        return Array.from(new Set(utensils))
    }
}