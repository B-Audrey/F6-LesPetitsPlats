export const displayFilterList = (listToDisplay, DOMElementId, cssClass) => {
    const htmlUlElement = document.getElementById(DOMElementId);
    htmlUlElement.innerHTML = '';

    listToDisplay
        .sort()
        .forEach((item) => htmlUlElement.innerHTML += `<li class="${cssClass}">${item}</li>`
    );

}
