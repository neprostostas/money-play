document.addEventListener('DOMContentLoaded', () => {

    const button = document.querySelector('.wheel__button'),
        spinner = document.getElementById('wheel__spinner'),
        popup = document.getElementById('popup'),
        popupFirst = document.getElementById('popup__first');

    button.addEventListener('click', () => spin());

    const spin = () => {
        button.classList.add('disabled');
        spinner.classList.add('wheel__spinner_animated_1');
        spinner.classList.remove('wheel__spinner_animated');
        setTimeout(() => {
            localStorage.status = 'wheel';
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');
        }, 4500);
    };

});