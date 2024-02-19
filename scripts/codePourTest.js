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
// String.prototype._includesOnString = function (stringToFind) {
//     // Parcours de chaque caractère de la chaîne principale tant que l'on a pas atteint la totalité - la longeur de la string à comparer
//     for (let i = 0; i <= (this.length - stringToFind.length); i++) {
//         //init d'avoir trouvé à vrai
//         let found = true;
//         // pour chaque caractère de la chaine totale, on parcours chaque caractère de la sous chaine à trouver pour la comparaison
//         for (let j = 0; j < stringToFind.length; j++) {
//             // si le caractère recherché (i+j) et celui de la sous chaine ne correspondent pas, on renvoie faux et on passe au suivant
//             if (this[i + j] !== stringToFind[j]) {
//                 found = false;
//                 break;
//             }
//         }
//         // Si la sous-chaîne est trouvée, renvoyer vrai
//         if (found) {
//             return true;
//         }
//     }
//     // Si la boucle se termine sans trouver la sous-chaîne, renvoyer faux
//     return false;
// };
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
