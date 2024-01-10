export const displayFilterList = (listToDisplay, DOMElementId) => {
    const htmlUlElement = document.getElementById(DOMElementId);
    htmlUlElement.innerHTML = '';

    listToDisplay
        .sort()
        .forEach((item) => htmlUlElement.innerHTML += `<li>${item}</li>`
    )
}
