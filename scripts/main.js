import {getData} from './utils/functions.js';
import {cardTemplate} from './templates/card.js';

const totalData = await getData();
totalData.forEach( (currentCard) => {
    const cardToDisplay = cardTemplate(currentCard)
    cardToDisplay.displayCardInDOM(cardToDisplay.card)
})
