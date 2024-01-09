export const cardTemplate = (card) => {
    const generateMediaPath = (mediaPath) => {
        return mediaPath.startsWith('./assets/card-img/') ? mediaPath : `./assets/card-img/${mediaPath}`;
    };

    card.image = generateMediaPath(card.image);
    // call function to generate correct mediaPath only at the 1st time, for next calls, path won't be changed again

    function displayCardInDOM(cardToDisplay) {
        let liTagContent = ""
        cardToDisplay.ingredients.forEach( (ingredient) => {
            liTagContent += `<li>
                            <span class="ingredient">${ingredient.ingredient}</span>
                            <span class="ingredient-quantity">${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ""}</span>
                           </li>`
        } )
        const html = `
                            <article class="card">
                                <img src="${cardToDisplay.image}" alt="image de ${cardToDisplay.name}">
                                <div class="timer">${cardToDisplay.time}min</div>
                                <div class="card-content">
                                    <div class="card-header">
                                        <h2>${cardToDisplay.name}</h2>
                                    </div>                      
                                    <div>
                                        <h3>recette</h3>
                                        <p>${cardToDisplay.description}</p>
                                    </div>
                                    <h3>ingrédients</h3>
                                    <ul>     
                                        ${liTagContent}                    
                                    </ul>
                                </div>
                            </article>
                            `
        //add the HTML content to DOM
        return document.getElementById('cardGallery').innerHTML += html;
    }
    return {card, displayCardInDOM}
}