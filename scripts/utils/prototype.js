Array.prototype._filter = function(callback) {
    //init result
    let filteredArray = [];
//pour chaque donnée on boucle dessus
    for (let i = 0; i < this.length;  i++) {
        //on applique la fn callback sur l'element courant et on regarde si elle renvoie vrai
        if (callback(this[i])) {
            //si elle renvoie vrai, on pousse sa valeur dans le tableau de resultat
            filteredArray.push(this[i]);
        }
    }

    return filteredArray;
}

Array.prototype._some = function(callback) {
    // Parcours du tableau
    for (let i = 0; i < this.length; i++) {
        // applique la callback sur chaque élément
        if (callback(this[i])) {
            return true; // si on rentre dans la boucle c'est que la callback apliquée renvoi vrai
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
        // Applique la callback sur chaque élément et stock du résultat
        mappedArray.push(callback(this[i]));
    }
    // Renvoyer le nouveau tableau contenant les résultats
    return mappedArray;
};
