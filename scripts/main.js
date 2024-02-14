import {State} from './state.js';
import {generateCardTemplate} from './templates/card.js';
import {displayFilterList} from './templates/filterList.js';
import {addTag} from './templates/filterTag.js';
import {displayCountRecipes} from './templates/recipes.js';

//FN
const resetCardGallery = () => {
    document.getElementById('cardGallery').innerHTML = ''
}
//INIT STATE
const state = new State();

//Wait for DOM to be full
document.addEventListener('DOMContentLoaded', async () => {

    //start with gallery empty
    resetCardGallery();

    // DEFINES FN TO BE CALLED LATER

    /**
     * to display recipes :
     * start with empty DOM
     * if 0 recipe, display message
     * generate html template
     * display html
     * actualize recipes total
     */
    state.setListenFunctions('recipes', (recipes) => {
        resetCardGallery();
        document.getElementById('errorMessage').innerHTML = ''
        if (!state.recipes.length) {
            let errorMessage;
            searchInput.value.length > 0
                ? errorMessage = `Aucune recette ne contient ${searchInput.value}, vous pouvez chercher «
            tarte aux pommes », « poisson », etc`
                : errorMessage = `Aucune recette ne contient vos filtres, vous pouvez chercher «
            tarte aux pommes », « poisson », etc`
            document.getElementById('errorMessage').innerHTML = errorMessage;
        }
        recipes
            .map(r => generateCardTemplate(r))
            .forEach(r => r.displayCardInDom(r.card));
        displayCountRecipes(state.recipes.length)

    });

    /**
     * to display different filters lists (for ingredients, devices and utensils)
     * re init all display list from zero with html template
     * add listener on every new generated Tag
     * defines the click fn that will be called when click
     * a tag will be added, filters will be set in state, input is empty, cross is hidden
     */

    state.setListenFunctions('ingredients', (ingredients) => {
        displayFilterList(ingredients, 'searchIngredientsResults', 'ingredients')
        const liTags = document.querySelectorAll('li[filterType=ingredients]')
        liTags.forEach(li => li.addEventListener('click', async () => {
            addTag(li.textContent, li.getAttribute('filtertype'), 'tagsBloc')
            await state.setFilter('add', li.textContent.toLowerCase(), li.getAttribute('filtertype'))
            ingredientInput.value = ''
            ingredientCross.style.opacity = '0'
        }))
    })

    state.setListenFunctions('devices', (devices) => {
        displayFilterList(devices, 'searchDevicesResults', 'devices')
        const liTags = document.querySelectorAll('li[filterType=devices]')
        liTags.forEach(li => li.addEventListener('click', async () => {
            addTag(li.textContent, li.getAttribute('filtertype'), 'tagsBloc')
            await state.setFilter('add', li.textContent.toLowerCase(), li.getAttribute('filtertype'))
            devicesInput.value = ''
            devicesCross.style.opacity = '0'
        }))
    })

    state.setListenFunctions('utensils', (utensils) => {
        displayFilterList(utensils, 'searchUtensilsResults', 'utensils')
        const liTags = document.querySelectorAll('li[filterType=utensils]')
        liTags.forEach(li => li.addEventListener('click', async () => {
            addTag(li.textContent, li.getAttribute('filtertype'), 'tagsBloc')
            await state.setFilter('add', li.textContent.toLowerCase(), li.getAttribute('filtertype'))
            utensilsInput.value = ''
            utensilCross.style.opacity = '0'
        }))
    })

    /**
     * init with empty filters
     */
    await state.setFilter(null, null, '');

    // LISTENERS

    /**
     * listen on search input, when there is a value, set filters
     */
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', async () => {
        document.getElementById('searchCross').style.opacity = '0';

        if (searchInput.value.length > 0) {
            document.getElementById('searchCross').style.opacity = '1';
        }
        await state.setFilter('add', searchInput.value, 'query');
    });

    /**
     * listen on loop, when click
     * set filters, add tag and init value
     */
    const searchLoop = document.getElementById('searchLoop')
    searchLoop.addEventListener('click', async () => {
        await state.setFilter('add', searchInput.value, 'text')
        addTag(searchInput.value, 'text', 'searchTagsBloc')
        searchInput.value = ''
        document.getElementById('searchXmark').style.opacity = '0';
    })

    /**
     * listen on filter blocs when written
     * if input is written, display X cross
     * simule an auto-complete
     * generate new HTML content filtered with input value content
     */
    const ingredientInput = document.getElementById('ingredients')
    ingredientInput.addEventListener('input', () => {
        const cross = document.querySelector('#ingredients + button')
        cross.style.opacity = '0'
        if (ingredientInput.value.length > 0) cross.style.opacity = '1'
        const result = state.ingredients.filter(v => v.includes(ingredientInput.value))
        state.listenersFn.ingredients.forEach(fn => fn(result))
    })

    const devicesInput = document.getElementById('devices')
    devicesInput.addEventListener('input', () => {
        const cross = document.querySelector('#devices + button')
        cross.style.opacity = '0'
        if (devicesInput.value.length > 0) cross.style.opacity = '1'
        const result = state.devices.filter(v => v.includes(devicesInput.value))
        state.listenersFn.devices.forEach(fn => fn(result))
    })

    const utensilsInput = document.getElementById('utensils')
    utensilsInput.addEventListener('input', () => {
        const cross = document.querySelector('#utensils + button')
        cross.style.opacity = '0'
        if (utensilsInput.value.length > 0) cross.style.opacity = '1'
        const result = state.utensils.filter(v => v.includes(utensilsInput.value))
        state.listenersFn.utensils.forEach(fn => fn(result))
    })

    /**
     * listeners on every X cross to empty input values
     */
    const ingredientCross = document.getElementById('ingredientsCross')
    ingredientCross.addEventListener('click', () => {
        ingredientInput.value = ''
        state.listenersFn.ingredients.forEach(fn => fn(state.ingredients))
        ingredientCross.style.opacity = '0'
    });
    const devicesCross = document.getElementById('devicesCross')
    devicesCross.addEventListener('click', () => {
        devicesInput.value = ''
        state.listenersFn.devices.forEach(fn => fn(state.devices))
        devicesCross.style.opacity = '0'
    });
    const utensilCross = document.getElementById('utensilsCross')
    utensilCross.addEventListener('click', () => {
        utensilsInput.value = '';
        state.listenersFn.utensils.forEach(fn => fn(state.utensils))
        utensilCross.style.opacity = '0'
    })
    const searchCross = document.getElementById('searchCross')
    searchCross.addEventListener('click', () => {
        searchInput.value = ''
        searchCross.style.opacity = '0'
    })
});


//make this fn available to be used in other file and separate remover event listeners
export const listenTag = (liParent) => {
    state.setFilter('remove', liParent.textContent, liParent.className)
    liParent.remove()
    return displayCountRecipes(state.recipes.length)
}
