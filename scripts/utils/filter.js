import {cardTemplate} from '../templates/card.js';
import {displayCountRecipes} from '../templates/recipes.js';
import {displayFilterList} from '../templates/filterList.js';

export class filterClass {

    ingredients = [];
    devices = [];
    utensils = [];
    currentFilters = {};
    currentFilteredData = [];

    constructor(totalData) {
        this.totalData = totalData;
    }

    init() {
        // affecte les filtres resultant de totalData
        this.devices = this._filterAvailableDevices(this.totalData);
        this.utensils = this._filterAvailableUtensils(this.totalData);
        this.ingredients = this._filterAvailableIngredients(this.totalData);
        // la data courante demarre avec la totalité
        this.currentFilteredData = this.totalData
        // init les filtres a vide
        this.currentFilters = {
            ingredientsToFind: [],
            devicesToFind: [],
            utensilsToFind: [],
            textToFind: [],
            currentText: ''
        }
        // affiche les data courantes
        this.displayCurrentData()
    }

    addCurrentFilter(filter, filterType) {
        // défini mes fn selon le type
        const filterDispatch = {
            currentText: () => {
                // current text prend la nouvelle val du filtre
                this.currentFilters.currentText = filter;
            },
            text: () => {
                // le current text est remis à zéro et le filtre validé passe en critère de recherche de text
                this.currentFilters.currentText = '';
                this.currentFilters.textToFind.push(filter);
            },
            ingredient: () => {
                // passe l'ingredient en filtre
                this.currentFilters.ingredientsToFind.push(filter);
            },
            device: () => {
                // passe l appareil en filtre
                this.currentFilters.devicesToFind.push(filter);

            },
            utensil: () => {
                // passe l ustensil en filtre
                this.currentFilters.utensilsToFind.push(filter);

            },
            elseCase: () => {
                // autre renvoie un erreur
                console.error('Filter type not recognized');
            }
        }
        //si le filtre n'est pas dispo : renvoi error
        if (!filterType in filterDispatch) return filterDispatch['elseCase']();
        // appelle la fn du filtre
        filterDispatch[filterType]();
        //filtre
        this._fullFilter();
        //affiche le resultat
        this.displayCurrentData(filter);

    }

    removeCurrentFilter(filter, filterType) {
        const filterRemover = {
            currentText: () => {
                this.currentFilters.currentText = '';
            },
            text: () => {
                this.currentFilters.textToFind = this.currentFilters.textToFind.filter((item) => item !== filter);
            },
            ingredient: () => {
                this.currentFilters.ingredientsToFind = this.currentFilters.ingredientsToFind.filter((item) => item !== filter);
            },
            device: () => {
                this.currentFilters.devicesToFind = this.currentFilters.devicesToFind.filter((item) => item !== filter);
            },
            utensil: () => {
                this.currentFilters.utensilsToFind = this.currentFilters.utensilsToFind.filter((item) => item !== filter);
            },
            elseCase: () => {
                console.error('Filter type not recognized');
            }
        }
        if (!filterType in filterRemover) return filterRemover['elseCase']();
        filterRemover[filterType]();
        this._fullFilter();
        this.displayCurrentData(filter);


    }


    // méthodes de la class
    _filterAvailableUtensils(totalRecipes) {
        const uniqueUtensils = new Set(totalRecipes.flatMap((recipe) => recipe.ustensils.map((utensil) => utensil.toLowerCase())));
        return Array.from(uniqueUtensils);
    }

    _filterAvailableDevices(totalRecipes) {
        const uniqueDevices = new Set(totalRecipes.flatMap((recipe) => recipe.appliance.toLowerCase()));
        return Array.from(uniqueDevices);
    }

    _filterAvailableIngredients(totalRecipes) {
        const uniqueIngredients = new Set(totalRecipes.flatMap((recipe) => recipe.ingredients.map((ingredientInfos) => ingredientInfos.ingredient.toLowerCase())));
        return Array.from(uniqueIngredients);
    }


    _fullFilter() {
        console.log(this.currentFilters)
        // init le resultat avec la totalité
        let filterResult = this.totalData;
        if (this.currentFilters.devicesToFind.length) {
            //garde que les result donc l appareil est dans l'obj
            filterResult = filterResult.filter(recipe => this.currentFilters.devicesToFind.includes(recipe.appliance.toLowerCase()));
        }
        if (this.currentFilters.ingredientsToFind.length) {
            //garde les resultat dont l ingredient est dans l'obj
            filterResult = filterResult.filter(recipe => {
                return recipe.ingredients.some(ingredient => this.currentFilters.ingredientsToFind.includes(ingredient.ingredient.toLowerCase()));
            });
        }

        if (this.currentFilters.utensilsToFind.length) {
            //garde les resultats dont l'ustensil est dans l'obj de filtre
            filterResult = filterResult.filter(recipe => {
                return recipe.ustensils.some(utensil => this.currentFilters.utensilsToFind.includes(utensil.toLowerCase()));
            });
        }

        if (this.currentFilters.textToFind.length) {
            // cherche dans chaque recette si un le text est présent puis renvoi la valeur qui sera trouvée
            filterResult = filterResult.filter((recipe) => {
                const descriptionMatch = recipe.description.toLowerCase().includes(this.currentFilters.textToFind);
                const recipeNameMatches = recipe.name.toLowerCase().includes(this.currentFilters.textToFind);
                const ingredientsMatch = recipe.ingredients.some((element) => {
                    return element.ingredient.toLowerCase().includes(this.currentFilters.textToFind);
                });
                //return the true element
                return recipeNameMatches || ingredientsMatch || descriptionMatch;
            });
        }

        if (this.currentFilters.currentText.length) {
            // cherche dans chaque recette si un le text est présent puis renvoi la valeur qui sera trouvée
            filterResult = filterResult.filter((recipe) => {
                const descriptionMatch = recipe.description.toLowerCase().includes(this.currentFilters.currentText);
                const recipeNameMatches = recipe.name.toLowerCase().includes(this.currentFilters.currentText);
                const ingredientsMatch = recipe.ingredients.some((element) => {
                    return element.ingredient.toLowerCase().includes(this.currentFilters.currentText);
                });
                return recipeNameMatches || ingredientsMatch || descriptionMatch;
            });
        }
        // affecte le result obtenu au currentData
        this.currentFilteredData = filterResult;
        // ajuste les elements de filtre disponibles
        this.devices = this._filterAvailableDevices(this.currentFilteredData);
        this.utensils = this._filterAvailableUtensils(this.currentFilteredData);
        this.ingredients = this._filterAvailableIngredients(this.currentFilteredData);
        // renvoie le resultat
        return this.currentFilteredData;
    }

    displayCurrentData(errorMessageIfNullValue) {
        //recupère l elem error du DOM
        const errorMessage = document.getElementById('errorMessage');
        // vide la galerie
        document.getElementById('cardGallery').innerHTML = '';
        //vide les potentielles precedents messages d'erreur
        errorMessage.innerHTML = '';
        // si pas de card a afficher
        if (!this.currentFilteredData.length) {
            // renvoie l'erreur
            return errorMessage.innerHTML = `Aucune recette ne contient <em>${errorMessageIfNullValue}</em>, vous pouvez chercher tarte aux pommes, poissons etc...`;
        }
        // pour chaque card, lance les fn d'affichage
        this.currentFilteredData.forEach((currentCard) => {
            const cardToDisplay = cardTemplate(currentCard);
            cardToDisplay.displayCardInDOM(cardToDisplay.card);
        });
        // affiche le compte des recettes affichées
        displayCountRecipes(this.currentFilteredData.length);
        // affiche tous les filtres disponibles
        this.displayAllFiltersLiContent()
    }

    displayAllFiltersLiContent = () => {
        displayFilterList(this.ingredients, 'searchIngredientsResults', 'ingredient');
        displayFilterList(this.devices, 'searchDevicesResults', 'device');
        displayFilterList(this.utensils, 'searchUtensilsResults', 'utensil');
    }


}