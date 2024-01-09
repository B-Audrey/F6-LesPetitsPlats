
const handleFormTitleClick = (formTitle) => {
    const toggleable = formTitle.closest('.formBloc').querySelector('.toggleable');
    const chevronIcon = formTitle.querySelector('i.fa-chevron-down');

    toggleable.classList.toggle('toggleOpen');

    // Ajout ou suppression de la class 'rotate' pour l'animation du chevron
    chevronIcon.classList.toggle('rotate');
}

document.addEventListener('DOMContentLoaded', function() {
    const formTitles = document.querySelectorAll('.formTitle');

    formTitles.forEach((formTitle) => {
        formTitle.addEventListener('click', function(event) {
            handleFormTitleClick(event.currentTarget);
        });
    });
});
