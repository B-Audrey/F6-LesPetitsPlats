
//utilisation des "create element" pour ne pas regénérer tout le HTML et perdre les listeners précédemment placés
export const addTag = (tagStringContent, className, parentElementId) => {
    const tagId = `tag_${className}_${tagStringContent}`;

    const liElement = document.createElement('li');
    liElement.className = className
    liElement.id = tagId;

    const spanElement = document.createElement('span');
    spanElement.textContent = tagStringContent;

    const removeButton = document.createElement('button');
    removeButton.className = 'removeTag';
    removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    liElement.appendChild(spanElement);
    liElement.appendChild(removeButton);

    document.getElementById(`${parentElementId}`).appendChild(liElement);
}



