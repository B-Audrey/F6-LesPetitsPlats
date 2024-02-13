const getData = async () => {
    return await (await fetch('../recipes.json')).json()
};
//this is a big object, having functions
export const backService = {
    getRecipes: async (filter) => {
        let recipes = await getData();

        if (filter.query?.length) {
            recipes = recipes._filter((recipe) => {
                const descriptionMatch = recipe.description.toLowerCase()._includesOnString(filter.query);
                const recipeNameMatches = recipe.name.toLowerCase()._includesOnString(filter.query);
                const ingredientsMatch = recipe.ingredients._some((element) => {
                    return element.ingredient.toLowerCase()._includesOnString(filter.query);
                });
                return recipeNameMatches || ingredientsMatch || descriptionMatch;
            });
        }

        if (filter.text.length) {
            filter.text.forEach(text => {
                recipes = recipes._filter((recipe) => {
                    const descriptionMatch = recipe.description.toLowerCase()._includesOnString(text);
                    const recipeNameMatches = recipe.name.toLowerCase()._includesOnString(text);
                    const ingredientsMatch = recipe.ingredients._some((element) => {
                        return element.ingredient.toLowerCase()._includesOnString(text);
                    });
                    return recipeNameMatches || ingredientsMatch || descriptionMatch;
                });
            })
        }

        if (filter.devices.length) {
            filter.devices.forEach((device) => {
                recipes = recipes._filter(recipe => recipe.appliance.toLowerCase() === device)

            })
        }

        if (filter.utensils.length) {
            filter.utensils.forEach(utensil => {
                recipes = recipes._filter(recipe => {
                    return recipe.utensils._includesOnArray(utensil.toLowerCase());
                });

            })
        }

        if (filter.ingredients.length) {
            filter.ingredients.forEach( ingr => {
                recipes = recipes._filter(recipe => {
                    const currentIngredients = recipe.ingredients._map( (i) => i.ingredient.toLowerCase() )
                    return currentIngredients._includesOnArray(ingr.toLowerCase());
                });
            })
        }
        return recipes;
    },
    getIngredients: (recipes) => {
        const ingredients = recipes._flatMap(recipe => recipe.ingredients._map(ingredient => ingredient.ingredient.toLowerCase()))
        return Array.from(new Set(ingredients))
    },
    getDevices: (recipes) => {
        const devices = recipes._map(recipe => recipe.appliance.toLowerCase())
        return Array.from(new Set(devices))
    },
    getUtensils: (recipes) => {
        const utensils = recipes._flatMap(recipe => recipe.utensils._map(u => u.toLowerCase()))
        return Array.from(new Set(utensils))
    }
}