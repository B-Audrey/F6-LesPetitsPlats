Array.prototype._filter = function(callback) {
    let filteredArray = [];

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            filteredArray.push(this[i]);
        }
    }

    return filteredArray;
}

String.prototype._includesOnString = function(stringToFind) {
    // Parcours de la chaîne principale
    for (let i = 0; i <= this.length - stringToFind.length; i++) {
        let found = true;
        // Vérification caractère par caractère si la sous-chaîne correspond
        for (let j = 0; j < stringToFind.length; j++) {
            if (this[i + j] !== stringToFind[j]) {
                found = false;
                break; // Sortir de la boucle si un caractère ne correspond pas
            }
        }
        // Si la sous-chaîne est trouvée, renvoyer vrai
        if (found) {
            return true;
        }
    }
    // Si la boucle se termine sans trouver la sous-chaîne, renvoyer faux
    return false;
};

Array.prototype._includesOnArray = function(elementToFind) {
    // Parcours du tableau
    for (let i = 0; i < this.length; i++) {
        // Vérification si l'élément courant est égal à l'élément recherché
        if (this[i] === elementToFind) {
            return true; // Renvoyer vrai si l'élément est trouvé
        }
    }
    // Si la boucle se termine sans trouver l'élément, renvoyer faux
    return false;
};

Array.prototype._some = function(callback) {
    // Parcours du tableau
    for (let i = 0; i < this.length; i++) {
        // Appel de la fonction de rappel sur chaque élément
        if (callback(this[i], i, this)) {
            return true; // Renvoyer vrai dès qu'un élément satisfait la condition
        }
    }
    // Si la boucle se termine sans trouver d'élément satisfaisant la condition, renvoyer faux
    return false;
};

Array.prototype._map = function(callback) {
    // Initialiser un nouveau tableau pour stocker les résultats
    let mappedArray = [];
    // Parcours du tableau
    for (let i = 0; i < this.length; i++) {
        // Appel de la fonction de rappel sur chaque élément et stockage du résultat
        mappedArray.push(callback(this[i], i, this));
    }
    // Renvoyer le nouveau tableau contenant les résultats
    return mappedArray;
};
Array.prototype._flatMap = function(callback) {
    // Initialiser un nouveau tableau pour stocker les résultats aplatis
    let mappedArray = [];
    // Parcours du tableau
    for (let i = 0; i < this.length; i++) {
        // Appel de la fonction de rappel sur chaque élément
        let result = callback(this[i], i, this);
        // Vérifier si le résultat est un tableau
        if (Array.isArray(result)) {
            // Aplatir le résultat et concaténer ses éléments dans le tableau aplati
            mappedArray = mappedArray.concat(result);
        } else {
            // Ajouter le résultat au tableau aplati tel quel
            mappedArray.push(result);
        }
    }
    // Renvoyer le nouveau tableau aplati
    return mappedArray;
};