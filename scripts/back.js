const getData = async () => {
    return await (await fetch('../recipes.json')).json()
};
//this is a big object, having functions that state can call to get data
export const backService = {
    /**
     * calculate recipes depending on params object
     * @param filter
     * @returns {Promise<recipes[]>}
     */
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
            for (const text of filter.text) {
                recipes = recipes._filter((recipe) => {
                    const descriptionMatch = recipe.description.toLowerCase()._includesOnString(text);
                    const recipeNameMatches = recipe.name.toLowerCase()._includesOnString(text);
                    const ingredientsMatch = recipe.ingredients._some((element) => {
                        return element.ingredient.toLowerCase()._includesOnString(text);
                    });
                    return recipeNameMatches || ingredientsMatch || descriptionMatch;
                });
            }
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
    /**
     *
     * @param recipes
     * @returns {string[]}
     */
    getIngredients: (recipes) => {
        const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()))
        return Array.from(new Set(ingredients))
    },
    /**
     *
     * @param recipes
     * @returns {string[]}
     */
    getDevices: (recipes) => {
        const devices = recipes.map(recipe => recipe.appliance.toLowerCase())
        return Array.from(new Set(devices))
    },
    /**
     *
     * @param recipes
     * @returns {string[]}
     */
    getUtensils: (recipes) => {
        const utensils = recipes.flatMap(recipe => recipe.utensils.map(u => u.toLowerCase()))
        return Array.from(new Set(utensils))
    }
}