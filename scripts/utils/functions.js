import {listenLiFilterTags} from '../main.js';

export const getData = async () => {
    const response = await fetch('../../recipes.json')
    return await response.json();
};

export const isInputWritten = (string) => string.length > 0;

export const listenAllLiFilterTags = () => {
    listenLiFilterTags('searchIngredientsResults');
    listenLiFilterTags('searchDevicesResults');
    listenLiFilterTags('searchUtensilsResults');
}




