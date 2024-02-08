import {State} from './state.js';
import {generateCardTemplate} from './templates/card.js';
import {displayFilterList} from './templates/filterList.js';
import {addTag} from './templates/filterTag.js';

//FN
const resetCardGallery = () => {
    document.getElementById('cardGallery').innerHTML = ''
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded');
    const state = new State();

    resetCardGallery();
    state.listen('recipes', (recipes) => {
        resetCardGallery();
        recipes
            .map(r => generateCardTemplate(r))
            .forEach(r => r.displayCardInDom(r.card));
    });

    state.listen('ingredients', (ingredients) => {
        displayFilterList(ingredients, 'searchIngredientsResults', 'ingredients')
        const liTags = document.querySelectorAll('li[filterType=ingredients]')
        liTags.forEach(li => li.addEventListener('click', async () => {
            addTag(li.textContent, li.getAttribute('filtertype'), 'tagsBloc')
            await state.setFilter('add',li.textContent.toLowerCase(), li.getAttribute('filtertype'))
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
            await state.setFilter('add',li.textContent.toLowerCase(), li.getAttribute('filtertype'))
        }))
    })

    state.listen('remove', () => {
        console.log('je rentre ici')
        let removeTags = document.querySelectorAll('.removeTag')
        console.log(removeTags)
        if (!removeTags.length) return
        removeTags.forEach( tag => {
            tag.addEventListener('click', () => {
                console.log('je clique')
                state.setFilter('remove', tag.textContent, tag.className)
                tag.remove()
            })
        })
    })

    await state.setFilter(null ,null, '');

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', async () => {
        document.getElementById('searchXmark').style.opacity = '0';

        if (searchInput.value.length > 0) {
            document.getElementById('searchXmark').style.opacity = '1';
        }
        await state.setFilter('add',searchInput.value, 'query');
    });

    const searchLoop = document.getElementById('searchLoop')
    searchLoop.addEventListener('click', async () => {
        await state.setFilter('add',searchInput.value, 'text')
        addTag(searchInput.value, 'text', 'searchTagsBloc')
        searchInput.value = ''
        document.getElementById('searchXmark').style.opacity = '0';

    })

});