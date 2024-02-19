// function getRecipes(filter) {
//
//     let recipes = [];
//
//     if (filter.query.length > 0) {
//         recipes = recipes._filter((recipe) => {
//             const descriptionMatch = recipe.description.toLowerCase().includes(filter.query);
//             const recipeNameMatches = recipe.name.toLowerCase().includes(filter.query);
//             const ingredientsMatch = recipe.ingredients._some((element) => {
//                 return element.ingredient.toLowerCase().includes(filter.query);
//             });
//             return recipeNameMatches || ingredientsMatch || descriptionMatch;
//         });
//     }
//
//     if (filter.text.length > 0) {
//         for (const text of filter.text) {
//             recipes = recipes._filter((recipe) => {
//                 const descriptionMatch = recipe.description.toLowerCase().includes(text);
//                 const recipeNameMatches = recipe.name.toLowerCase().includes(text);
//                 const ingredientsMatch = recipe.ingredients._some((element) => {
//                     return element.ingredient.toLowerCase().includes(text);
//                 });
//                 return recipeNameMatches || ingredientsMatch || descriptionMatch;
//             });
//         }
//     }
//
//     return recipes;
// }
//
//
// Array.prototype._filter = function (callback) {
//     //init result
//     let filteredArray = [];
// //pour chaque donnée on boucle dessus
//     for (let i = 0; i < this.length; i++) {
//         //on applique la fn callback sur l'element courant et on regarde si elle renvoie vrai
//         if (callback(this[i])) {
//             //si elle renvoie vrai, on pousse sa valeur dans le tableau de resultat
//             filteredArray.push(this[i]);
//         }
//     }
//
//     return filteredArray;
// }
//
// Array.prototype._some = function (callback) {
//     // Parcours du tableau
//     for (let i = 0; i < this.length; i++) {
//         // applique la callback sur chaque élément
//         if (callback(this[i])) {
//             return true; // si on rentre dans la boucle c'est que la callback apliquée renvoi vrai
//         }
//     }
//     // Si la boucle se termine sans trouver d'élément satisfaisant la condition, renvoyer faux
//     return false;
// };
//
// getRecipes({query: 'frais', text: ['tarte']});
//
//
//
