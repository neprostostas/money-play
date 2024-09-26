document.addEventListener('DOMContentLoaded', () => {

    const button = document.querySelector('.wheel__button'),
        spinner = document.getElementById('wheel__spinner'),
        popup = document.getElementById('popup'),
        popupFirst = document.getElementById('popup__first'),
        claimButton = document.querySelector('.button.claim'),
        againButton = document.querySelector('.button.again'),
        lights = document.querySelectorAll('.wheel__spinner-on');

    let spinCount = localStorage.getItem('spinCount') ? parseInt(localStorage.getItem('spinCount')) : 0;

    button.addEventListener('click', () => spin());

    function generateKeyframes() {
        const randomRotation70 = getRandomRotation(950, 1950); // Random between 950 and 1950 degrees
        const randomRotation80 = randomRotation70 - 8;         // 80% is 8 degrees less than 70%
        const randomRotation100 = randomRotation80 + 4;        // 100% is 4 degrees more than 80%

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerHTML = `
        @keyframes dynamicSpin {
            0% {
                transform: rotate(-5deg);
            }
            70% {
                transform: rotate(${randomRotation70}deg);
            }
            80% {
                transform: rotate(${randomRotation80}deg);
            }
            100% {
                transform: rotate(${randomRotation100}deg);
            }
        }
        .wheel__spinner_animated_1 {
            animation: 4s dynamicSpin ease-in-out forwards;
        }
    `;
        document.head.appendChild(styleSheet);
    }

    // Random generator function
    function getRandomRotation(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    const spin = () => {
        button.classList.add('disabled');

        // Generate dynamic keyframes with random rotations before spinning
        generateKeyframes();

        spinner.classList.add('wheel__spinner_animated_1');
        spinner.classList.remove('wheel__spinner_animated');

        setTimeout(() => {
            localStorage.status = 'wheel';
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');
            if (localStorage.status === 'wheel') {
                gsap.killTweensOf(lights);
                lights.forEach(light => {
                    light.style.opacity = '0';
                });
            }
            if (spinCount >= 3) {
                againButton.style.display = 'none';
                const buttonWrap = document.querySelector('.button-wrap');
                buttonWrap.style.gridTemplateColumns = 'auto';
            }
            button.classList.remove('disabled');
        }, 4500); // Ensure this matches the animation duration
    };

    claimButton.addEventListener('click', () => {
        console.log('claimed');
    });

    againButton.addEventListener('click', () => {
        spinCount++;
        localStorage.setItem('spinCount', spinCount);

        if (spinCount <= 3) {
            popup.classList.remove('popup__show');
            popupFirst.classList.remove('popup__content_show');
            setTimeout(() => {
                spinAgain(); // Trigger spin when popup closes
            }, 5);
            spin();
        }

    });

    const startCheck = () => {
        if (spinCount >= 3) {
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');
            againButton.style.display = 'none';
            const buttonWrap = document.querySelector('.button-wrap');
            buttonWrap.style.gridTemplateColumns = 'auto';
        }
    };

    startCheck();

    const spinAgain = () => {
        spinner.classList.remove('wheel__spinner_animated_1'); // Reset animation
        void spinner.offsetWidth; // Trigger reflow to restart animation
        spinner.classList.add('wheel__spinner_animated_1'); // Restart animation
    };

    // lights.forEach(light => {
    //     gsap.to(light, {
    //         opacity: 0,
    //         duration: 1,
    //         repeat: -1,
    //         yoyo: true,
    //         ease: "power1.inOut",
    //     });
    // });

    const borderImage = document.querySelector('.border-image');
    const borderImagePopupOn = document.querySelector('.border-image.popup-on');

    const timeline = gsap.timeline({ repeat: -1, yoyo: true, ease: "power1.inOut" });

    timeline
        .to(borderImage, {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
        }, 0)
        .to(borderImagePopupOn, {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
        }, 0);

    if (spinCount >= 3) {
        againButton.style.display = 'none';
    }




    const scrollBlock = document.querySelector('.block-scroll');
    const blurAccordion = document.querySelector('.blur-accordion');

    const hideBlurOnScroll = () => {
        const scrollHeight = scrollBlock.scrollHeight;
        const scrollPosition = scrollBlock.scrollTop + scrollBlock.offsetHeight;

        if (scrollPosition >= scrollHeight - 50) {
            gsap.to(blurAccordion, { opacity: 0, duration: 1 });
        } else {
            gsap.to(blurAccordion, { opacity: 1, duration: 1 });
        }
    };

    scrollBlock.addEventListener('scroll', () => hideBlurOnScroll());










    scrollBlock.addEventListener('touchstart', function(event) {
        const startY = event.touches[0].clientY;
        scrollBlock.addEventListener('touchmove', function(event) {
            const currentY = event.touches[0].clientY;
            const scrollTop = scrollBlock.scrollTop;
            const scrollHeight = scrollBlock.scrollHeight;
            const blockHeight = scrollBlock.clientHeight;

            // Перевіряємо чи на початку або в кінці блоку
            if (scrollTop === 0 && currentY > startY) {
                // Якщо на початку блоку і користувач тягне вниз
                event.preventDefault(); // Забороняємо блокування скролу
            } else if (scrollTop + blockHeight >= scrollHeight && currentY < startY) {
                // Якщо в кінці блоку і користувач тягне вгору
                event.preventDefault(); // Забороняємо блокування скролу
            }
        });
    });



});
