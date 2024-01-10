export const getData = async () => {
    const response = await fetch('../../recipes.json')
    return await response.json();
};

export const isLengthThreeOrMore =(string) => {
    return string.length >= 3;
}

export const isInputWritten = (string) => {
    return string.length >0
}

//Voir avec Lucien son avis sur le toLowerCase : bonne ou mauvaise idée pour le Set ?
export const getActualAvailableIngredients = (filteredRecipes) => {
    const uniqueIngredients = new Set();

    filteredRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredientList) => {
            uniqueIngredients.add(ingredientList.ingredient.toLowerCase());
        });
    });
    return Array.from(uniqueIngredients);
}

export const getActualAvailableUtensils = (filteredRecipes) => {
    const uniqueUtensils = new Set();

    filteredRecipes.forEach((recipe) => {
        recipe.ustensils.forEach((utensil) => {
            uniqueUtensils.add(utensil.toLowerCase());
        });
    });

    return Array.from(uniqueUtensils);
}

export const getActualAvailableDevices = (filteredRecipes) => {
    const uniqueDevices = new Set();

    filteredRecipes.forEach((recipe) => {
        uniqueDevices.add(recipe.appliance.toLowerCase());
    });

    return Array.from(uniqueDevices);
}

export const textSearch = (recipes, textToFind) => {
    return recipes.filter((recipe) => {
        const descriptionMatch = recipe.description.toLowerCase().includes(textToFind);
        const recipeNameMatches = recipe.name.toLowerCase().includes(textToFind);
        const ingredientsMatch = recipe.ingredients.some((element) => {
            return element.ingredient.toLowerCase().includes(textToFind);
        });
        return recipeNameMatches || ingredientsMatch || descriptionMatch;
    });
}