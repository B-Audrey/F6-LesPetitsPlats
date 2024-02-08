
export const displayFilterList = (listToDisplay, DOMElementId, filterType) => {
    const htmlUlElement = document.getElementById(DOMElementId);
    htmlUlElement.innerHTML = '';

    listToDisplay
        .sort()
        .forEach((item) => htmlUlElement.innerHTML += `<li filtertype="${filterType}">${item}</li>`
    );

}
