import {getData} from './utils/functions.js';
import {cardTemplate} from './templates/card.js';
import {displayCountRecipes} from './templates/recipes.js';


// Display every cards and total count
const totalData = await getData();
totalData.forEach( (currentCard) => {
    const cardToDisplay = cardTemplate(currentCard)
    cardToDisplay.displayCardInDOM(cardToDisplay.card)
})
displayCountRecipes(totalData)
