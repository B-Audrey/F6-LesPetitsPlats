import {
    getActualAvailableDevices,
    getActualAvailableIngredients,
    getActualAvailableUtensils,
    getData,
    isInputWritten,
    isLengthThreeOrMore,
    textSearch
} from './utils/functions.js';
import {cardTemplate} from './templates/card.js';
import {displayCountRecipes} from './templates/recipes.js';
import {displayFilterList} from './templates/filterList.js';


//VARIABLES
const totalData = await getData();
const search = document.getElementById('search');
const ingredientsFilter = document.getElementById('ingredients');
const devicesFilter = document.getElementById('devices');
const utensilsFilter = document.getElementById('utensils');
const searchXmark = document.getElementById('searchXmark');
const cardGallery = document.getElementById('cardGallery');
const errorMessage = document.getElementById('errorMessage')
let currentFilteredDataResult = []
let currentIngredientFilters = []
let currentDeviceFilters = []
let currentUtensilFilters = []
let currentSearchFilter = ''

//MAIN CALL FUNCTIONS

// Display every cards and total count
totalData.forEach((currentCard) => {
    const cardToDisplay = cardTemplate(currentCard)
    cardToDisplay.displayCardInDOM(cardToDisplay.card)
})

displayCountRecipes(totalData)
currentIngredientFilters = getActualAvailableIngredients(totalData);
currentDeviceFilters = getActualAvailableDevices(totalData);
currentUtensilFilters = getActualAvailableUtensils(totalData);
displayFilterList(currentIngredientFilters, 'searchIngredientsResults')
displayFilterList(currentDeviceFilters, 'searchDevicesResults')
displayFilterList(currentUtensilFilters, 'searchUtensilsResults')


// LISTENERS
search.addEventListener('input', (event) => {

    errorMessage.innerHTML = ''
    //recupérer la valeur de l'input en minuscule sans potentiels espaces
    currentSearchFilter = search.value.toLowerCase().trim();


    if (!isInputWritten(currentSearchFilter)) {
        totalData.forEach((currentCard) => {
            const cardToDisplay = cardTemplate(currentCard)
            cardToDisplay.displayCardInDOM(cardToDisplay.card)
        })
        displayCountRecipes(totalData)
        currentIngredientFilters = getActualAvailableIngredients(totalData);
        currentDeviceFilters = getActualAvailableDevices(totalData);
        currentUtensilFilters = getActualAvailableUtensils(totalData);
    }
    if (isInputWritten(currentSearchFilter)) {
        searchXmark.style.opacity = '1';
    }

    if (isLengthThreeOrMore(currentSearchFilter)) {
        currentFilteredDataResult = textSearch(totalData, currentSearchFilter)
        cardGallery.innerHTML = ''
        if (currentFilteredDataResult.length > 0) {
            // Mettre à jour l'affichage des cartes et le compteur
            currentFilteredDataResult.forEach((currentCard) => {
                const cardToDisplay = cardTemplate(currentCard)
                cardToDisplay.displayCardInDOM(cardToDisplay.card)
            });
            displayCountRecipes(currentFilteredDataResult);
            //ajuster la liste filtres disponibles
            currentIngredientFilters = getActualAvailableIngredients(currentFilteredDataResult);
            currentDeviceFilters = getActualAvailableDevices(currentFilteredDataResult);
            currentUtensilFilters = getActualAvailableUtensils(currentFilteredDataResult);
        } else {
            // Mettre à jour l'affichage des cartes et le compteur
            errorMessage.innerHTML = `Aucune recette ne contient <em>${currentSearchFilter}</em>, vous pouvez chercher tarte aux pommes, poissons etc...`;
            displayCountRecipes([])
            //ajuster la liste filtres disponibles
            currentIngredientFilters = [];
            currentDeviceFilters = [];
            currentUtensilFilters = [];
        }
    }
    //afficher les filtres actualisés obtenus
    displayFilterList(currentIngredientFilters, 'searchIngredientsResults')
    displayFilterList(currentDeviceFilters, 'searchDevicesResults')
    displayFilterList(currentUtensilFilters, 'searchUtensilsResults')
});
ingredientsFilter.addEventListener('input', (event) => {
    const ingredientsValue = ingredientsFilter.value;
});

devicesFilter.addEventListener('input', (event) => {
    const deviceValue = devicesFilter.value;
});

utensilsFilter.addEventListener('input', (event) => {
    const utensilValue = utensilsFilter.value;
});

searchXmark.addEventListener('click', (event) => {
    search.value = '';
    searchXmark.style.opacity = '0';
})