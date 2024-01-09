export const addTag = (tagStringContent) => {
    document.getElementById('tagsBloc').innerHTML += `
        <div>
        <span>${tagStringContent}</span>
        <button><i class="fa-solid fa-xmark"></i></button>
        </div>`
}