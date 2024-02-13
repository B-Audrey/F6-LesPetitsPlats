import {State} from './state.js';
import {generateCardTemplate} from './templates/card.js';
import {displayFilterList} from './templates/filterList.js';
import {addTag} from './templates/filterTag.js';
import {displayCountRecipes} from './templates/recipes.js';

//FN
const resetCardGallery = () => {
    document.getElementById('cardGallery').innerHTML = ''
}
const state = new State();

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded');

    resetCardGallery();
    state.listen('recipes', (recipes) => {
        resetCardGallery();
        document.getElementById('errorMessage').innerHTML = ''
        if (!state.recipes.length) {
            let errorMessage;
            !searchInput.value.length > 0 ? errorMessage = `Aucune recette ne contient ${searchInput.value} vous pouvez chercher «
tarte aux pommes », « poisson », etc` : errorMessage = 'vos filtres';
            document.getElementById('errorMessage').innerHTML = errorMessage;
        }
        recipes
            .map(r => generateCardTemplate(r))
            .forEach(r => r.displayCardInDom(r.card));
        displayCountRecipes(state.recipes.length)

    });

    state.listen('ingredients', (ingredients) => {
        displayFilterList(ingredients, 'searchIngredientsResults', 'ingredients')
        const liTags = document.querySelectorAll('li[filterType=ingredients]')
        liTags.forEach(li => li.addEventListener('click', async () => {
            addTag(li.textContent, li.getAttribute('filtertype'), 'tagsBloc')
            await state.setFilter('add', li.textContent.toLowerCase(), li.getAttribute('filtertype'))
        }))
    })

    state.listen('devices', (devices) => {
        displayFilterList(devices, 'searchDevicesResults', 'devices')
        const liTags = document.querySelectorAll('li[filterType=devices]')
        liTags.forEach(li => li.addEventListener('click', async () => {
            addTag(li.textContent, li.getAttribute('filtertype'), 'tagsBloc')
            await state.setFilter('add', li.textContent.toLowerCase(), li.getAttribute('filtertype'))
        }))
    })

    state.listen('utensils', (utensils) => {
        displayFilterList(utensils, 'searchUtensilsResults', 'utensils')
        const liTags = document.querySelectorAll('li[filterType=utensils]')
        liTags.forEach(li => li.addEventListener('click', async () => {
            addTag(li.textContent, li.getAttribute('filtertype'), 'tagsBloc')
            await state.setFilter('add', li.textContent.toLowerCase(), li.getAttribute('filtertype'))
        }))
    })


    await state.setFilter(null, null, '');


    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', async () => {
        document.getElementById('searchXmark').style.opacity = '0';

        if (searchInput.value.length > 0) {
            document.getElementById('searchXmark').style.opacity = '1';
        }
        await state.setFilter('add', searchInput.value, 'query');
    });

    const searchLoop = document.getElementById('searchLoop')
    searchLoop.addEventListener('click', async () => {
        await state.setFilter('add', searchInput.value, 'text')
        addTag(searchInput.value, 'text', 'searchTagsBloc')
        searchInput.value = ''
        document.getElementById('searchXmark').style.opacity = '0';
    })

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
});

export const listenTag = (liParent) => {
    state.setFilter('remove', liParent.textContent, liParent.className)
    liParent.remove()
    return displayCountRecipes(state.recipes.length)
}
