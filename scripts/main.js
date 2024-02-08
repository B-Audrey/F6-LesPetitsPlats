import {getData, isInputWritten, listenAllLiFilterTags} from './utils/functions.js';
import {displayFilterList} from './templates/filterList.js';
import {filterClass} from './utils/filter.js';
import {addTag} from './templates/filterTag.js';
import {handleFormTitleClick} from './style/toogle.js'


//VARIABLES
const totalData = await getData();
const filterDataClass = new filterClass(totalData);
filterDataClass.init();

const search = document.getElementById('search');
const ingredientsFilter = document.getElementById('ingredients');
const devicesFilter = document.getElementById('devices');
const utensilsFilter = document.getElementById('utensils');
const searchXmark = document.getElementById('searchXmark');
const searchLoop = document.getElementById('searchLoop')
let displayedIngredients = filterDataClass.ingredients;
let displayedDevices = filterDataClass.devices;
let displayedUtensils = filterDataClass.utensils;

// LOCAL FN

export const removeSearchFilter = (tagId) => {
    // recupère l elem a supprimer
    const tagElement = document.getElementById(tagId);
    // découpe l'id
    const [filterType, tagContent] = tagId.split('_').slice(1); //coupe aux _ et enlève le "tag" du début
    //retire le filtre
    filterDataClass.removeCurrentFilter(tagContent, filterType);
    //retire l elem du DOM
    tagElement.remove();
};

export const listenLiFilterTags = (searchingId) => {
    //recupere le parent filtre du DOM
    const parentElement = document.getElementById(searchingId);
    // au clic sur un elem dans le parent
    parentElement.addEventListener('click', (e) => {
        // recupère la li cliquée
        const targetLi = e.target.closest('li');
        // ajoute le tag
        addTag(e.target.textContent, e.target.className, 'tagsBloc');
        // recupère le bloc a fermer
        const formTitleToClose = targetLi.closest('.formBloc').querySelector('.formTitle');
        // ferme le bloc
        handleFormTitleClick(formTitleToClose);
        // ajoute le filtre cliqué
        filterDataClass.addCurrentFilter(e.target.textContent, e.target.className);
        // retire la balise li pour pas la cliquer de nouveau
        targetLi.remove();
    })
}


// LISTENERS
searchLoop.addEventListener('click', () => {
    // Isoler la valeur de l'input en minuscule sans potentiels espaces av/ap dans un variable
    let currentSearchFilter = search.value.toLowerCase().trim();
    //remettre la value à vide pour pas ajouter de currentText
    search.value = ''
    //ajouter le filtre au type text
    filterDataClass.addCurrentFilter(currentSearchFilter, 'text');
    //afficher le tag
    addTag(currentSearchFilter, 'text', 'searchTagsBloc');
})
search.addEventListener('input', () => {
    //de base, on cache la croix
    searchXmark.style.opacity = '0';
    //recupérer la valeur de l'input en minuscule sans potentiels espaces av/ap
    const currentSearchFilter = search.value.toLowerCase().trim();
    //si c'est ecrit affiche la croix
    if (isInputWritten(currentSearchFilter)) {
        searchXmark.style.opacity = '1';
    }
    // si - de 3 caractères
    if (currentSearchFilter.length <= 3) {
        // et il y a un filtre en cours
        if (filterDataClass.currentFilters.utensilsToFind.length ||
            filterDataClass.currentFilters.ingredientsToFind.length ||
            filterDataClass.currentFilters.devicesToFind.length ||
            filterDataClass.currentFilters.textToFind.length
        ) return null
        // et il n'y a pas de filtre en cours : je repars de zéro
        else {
            // sinon repars de zéro
            filterDataClass.init()
        }
    }
    // si + de 3 caractères, je mets le filtres en current
    if (currentSearchFilter.length > 3) {
        return filterDataClass.addCurrentFilter(currentSearchFilter, 'currentText');
    }
});
ingredientsFilter.addEventListener('input', (event) => {
    //filter les filtres affichés a la saisie
    let currentFilterSearch = displayedIngredients.filter((ingredient) => {
        return ingredient.toLowerCase().includes(ingredientsFilter.value.toLowerCase().trim());
    });
    // réaffecte les actuels ingredients
    displayedIngredients = currentFilterSearch;
    // affiche le resultat
    displayFilterList(displayedIngredients, 'searchIngredientsResults', 'ingredient');
    // écoute le resultat généré
    listenLiFilterTags('searchIngredientsResults')
});

document.querySelectorAll('.ingredients').addEventListener('click',() => {

})
devicesFilter.addEventListener('input', (event) => {
    let currentFilterSearch = displayedDevices.filter((ingredient) => {
        return ingredient.toLowerCase().includes(devicesFilter.value.toLowerCase().trim());
    });
    displayedDevices = currentFilterSearch;
    displayFilterList(displayedDevices, 'searchDevicesResults', 'device');
    listenLiFilterTags('searchDevicesResults')
});
utensilsFilter.addEventListener('input', (event) => {
    //filter les filtres affichés a la saisie
    let currentFilterSearch = displayedUtensils.filter((ingredient) => {
        return ingredient.toLowerCase().includes(utensilsFilter.value.toLowerCase().trim());
    });
    displayedUtensils = currentFilterSearch;
    displayFilterList(displayedUtensils, 'searchUtensilsResults', 'utensil');
    listenLiFilterTags('searchUtensilsResults')
});
searchXmark.addEventListener('click', (event) => {
    search.value = '';
    searchXmark.style.opacity = '0';
})

listenAllLiFilterTags()