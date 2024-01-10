document.addEventListener('DOMContentLoaded', function() {
    const toggleIcons = document.querySelectorAll('.formTitle i.fa-chevron-down');

    toggleIcons.forEach((toggleIcon) => {
        toggleIcon.addEventListener('click', function() {
           const toggleable = this.closest('.formBloc').querySelector('.toggleable');
            toggleable.classList.toggle('toggleOpen');
        });
    });
});
