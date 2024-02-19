// function getRecipes (filter){
//
//     let recipes = [];
//
//     if (filter.query.length > 0) {
//         recipes = recipes.filter((recipe) => {
//             const descriptionMatch = recipe.description.toLowerCase().includes(filter.query);
//             const recipeNameMatches = recipe.name.toLowerCase().includes(filter.query);
//             const ingredientsMatch = recipe.ingredients.some((element) => {
//                 return element.ingredient.toLowerCase().includes(filter.query);
//             });
//             return recipeNameMatches || ingredientsMatch || descriptionMatch;
//         });
//     }
//
//     if (filter.text.length > 0) {
//         filter.text.forEach(text => {
//             recipes = recipes.filter((recipe) => {
//                 const descriptionMatch = recipe.description.toLowerCase().includes(text);
//                 const recipeNameMatches = recipe.name.toLowerCase().includes(text);
//                 const ingredientsMatch = recipe.ingredients.some((element) => {
//                     return element.ingredient.toLowerCase().includes(text);
//                 });
//                 return recipeNameMatches || ingredientsMatch || descriptionMatch;
//             });
//         })
//     }
//     return recipes;
// }
//
//
// getRecipes({query : 'frais', text : ['tarte']})