import {isLenghtThreeOrMore, getData} from './utils/functions.js';
import {cardTemplate} from './templates/card.js';
import {displayCountRecipes} from './templates/recipes.js';
import {addTag} from './templates/filterTag.js';


//VARIABLES
const totalData = await getData();
const search = document.getElementById('search');
const ingredientsFilter = document.getElementById('ingredients');
const devicesFilter = document.getElementById('devices');
const utensilsFilter = document.getElementById('utensils');

let currentFilteredDataResult = []
let currentIngredientFilters = []
let currentDeviceFilters = []
let currentUtensilFilters = []
let currentSearchFilter = ''

//MAIN CALL FUNCTIONS

// Display every cards and total count
totalData.forEach( (currentCard) => {
    const cardToDisplay = cardTemplate(currentCard)
    cardToDisplay.displayCardInDOM(cardToDisplay.card)
})
displayCountRecipes(totalData)

addTag('toto')
addTag('toto')
addTag('toto')
addTag('toto')


// LISTENERS
search.addEventListener('input', (event ) => {
    const searchValue = search.value;
    console.log('Nouvelle valeur de la recherche :', searchValue);
    console.log(isLenghtThreeOrMore(event.target.value))
});
ingredientsFilter.addEventListener('input', (event ) => {
    const ingredientsValue = ingredientsFilter.value;
    console.log('ingredient :', ingredientsValue);
});

devicesFilter.addEventListener('input', (event ) => {
    const deviceValue = devicesFilter.value;
    console.log('device :', deviceValue);
});

utensilsFilter.addEventListener('input', (event ) => {
    const utensilValue = utensilsFilter.value;
    console.log('ustensil :', utensilValue);
});