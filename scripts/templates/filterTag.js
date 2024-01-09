export const addTag = (tagStringContent) => {
    document.getElementById('tagsBloc').innerHTML += `
        <li>
        <span>${tagStringContent}</span>
        <button><i class="fa-solid fa-xmark"></i></button>
        </li>`
}