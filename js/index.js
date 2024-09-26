document.addEventListener('DOMContentLoaded', () => {
    // Get elements and variables
    const button = document.querySelector('.wheel__button'),
        spinner = document.getElementById('wheel__spinner'),
        popup = document.getElementById('popup'),
        popupFirst = document.getElementById('popup__first'),
        claimButton = document.querySelector('.button.claim'),
        againButton = document.querySelector('.button.again'),
        buttonWrap = document.querySelector('.button-wrap');

    let spinCount = localStorage.getItem('spinCount') ? parseInt(localStorage.getItem('spinCount')) : 0;
    let prize = localStorage.getItem('prize') || '-';

    // Wheel entries array with content and flags (8 entries)
    const wheelEntries = [
        // wheel__text-1, wheel__bonus_wrap-1
        {
            sectorIndex: 0,
            subSectorIndex: 0,
            popupText: 'Try Again',
            showClaim: false,
            showSpin: true
        },
        // wheel__text-2, wheel__bonus_wrap-1
        {
            sectorIndex: 1,
            subSectorIndex: 0,
            popupText: 'You won a 100% Bonus + 20 FS!',
            showClaim: true,
            showSpin: true
        },
        // wheel__text-3, wheel__bonus_wrap-1
        {
            sectorIndex: 2,
            subSectorIndex: 0,
            popupText: 'You won a 100% Bonus!',
            showClaim: true,
            showSpin: true
        },
        // wheel__text-4, wheel__bonus_wrap-1
        {
            sectorIndex: 3,
            subSectorIndex: 0,
            popupText: 'You won 20 Free Spins!',
            showClaim: true,
            showSpin: true
        },
        // wheel__text-1, wheel__bonus_wrap-2
        {
            sectorIndex: 0,
            subSectorIndex: 1,
            popupText: 'You won 75 Free Spins!',
            showClaim: true,
            showSpin: true
        },
        // wheel__text-2, wheel__bonus_wrap-2
        {
            sectorIndex: 1,
            subSectorIndex: 1,
            popupText: 'You won a Free Bet!',
            showClaim: true,
            showSpin: true
        },

        // wheel__text-3, wheel__bonus_wrap-2
        {
            sectorIndex: 2,
            subSectorIndex: 1,
            popupText: 'You won a 25% Bonus!',
            showClaim: true,
            showSpin: true
        },
        // wheel__text-4, wheel__bonus_wrap-2
        {
            sectorIndex: 3,
            subSectorIndex: 1,
            popupText: 'You won 50 Free Spins!',
            showClaim: true,
            showSpin: true
        }
    ];

    // Update wheel sectors with the correct content
    const wheelSectors = document.querySelectorAll('#wheel__spinner .wheel__text');
    wheelSectors.forEach((sector, sectorIndex) => {
        // Clear existing content
        sector.innerHTML = '';

        // Get entries for this sector
        const entriesForSector = wheelEntries.filter(entry => entry.sectorIndex === sectorIndex);

        entriesForSector.forEach(entry => {
            const subSectorNumber = entry.subSectorIndex + 1;

            // Build the sub-sector HTML
            let wheelBonusWrap = document.createElement('div');
            wheelBonusWrap.classList.add('wheel__bonus_wrap', `wheel__bonus-${subSectorNumber}`);

            let wheelBonus = document.createElement('div');
            wheelBonus.classList.add('wheel__bonus');

            // Add content based on sector and sub-sector
            // Here, we need to match your specified structure and content
            if (sectorIndex === 0 && subSectorNumber === 1) {
                // Try Again
                wheelBonus.innerHTML = `
                    <span>Try Again</span>
                    <span class="en"></span>
                `;
            } else if (sectorIndex === 0 && subSectorNumber === 2) {
                // 75 FS
                wheelBonus.innerHTML = `
                    <span>75</span>
                    <span class="en">FS</span>
                `;
            } else if (sectorIndex === 1 && subSectorNumber === 1) {
                // 100% BONUS + 20 FS
                wheelBonus.innerHTML = `
                    <span>100%</span>
                    <br>
                    <span>BONUS</span>
                    <br>
                    <span class="en">+ 20 FS</span>
                `;
            } else if (sectorIndex === 1 && subSectorNumber === 2) {
                // FREE BET
                wheelBonus.innerHTML = `
                    <span>FREE BET</span>
                    <span class="en"></span>
                `;
            } else if (sectorIndex === 2 && subSectorNumber === 1) {
                // 100% BONUS
                wheelBonus.innerHTML = `
                    <span>100%</span>
                    <br>
                    <span class="en">BONUS</span>
                `;
            } else if (sectorIndex === 2 && subSectorNumber === 2) {
                // 25% Bonus
                wheelBonus.innerHTML = `
                    <span>25%</span>
                    <br>
                    <span class="en">Bonus</span>
                `;
            } else if (sectorIndex === 3 && subSectorNumber === 1) {
                // 20 FS
                wheelBonus.innerHTML = `
                    <span>20</span>
                    <span class="en">FS</span>
                `;
            } else if (sectorIndex === 3 && subSectorNumber === 2) {
                // 50 FS
                wheelBonus.innerHTML = `
                    <span>50</span>
                    <span class="en">FS</span>
                `;
            }

            wheelBonusWrap.appendChild(wheelBonus);
            sector.appendChild(wheelBonusWrap);
        });
    });

    // Forced entries to land on
    let forcedEntries = [0, 2, 5]; // Adjust this array as needed
    let forcedIndex = 0;

    button.addEventListener('click', () => {
        if (button.classList.contains('disabled')) return; // Prevent multiple clicks
        const targetEntryIndex = forcedEntries[forcedIndex];
        spin(targetEntryIndex);
        forcedIndex = (forcedIndex + 1) % forcedEntries.length; // Update forced index for next spin
    });

    // Function to generate keyframes for specific rotation
    function generateKeyframes(targetRotation) {
        const rotationAt0 = -5;
        const randomRotation70 = targetRotation;
        const randomRotation80 = targetRotation + 8; // Overshoot by 8 degrees
        const randomRotation100 = targetRotation + 4; // Settle back 4 degrees

        // Remove any existing dynamic keyframes
        const existingStyle = document.getElementById('dynamicSpinStyle');
        if (existingStyle) {
            existingStyle.parentNode.removeChild(existingStyle);
        }

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.id = 'dynamicSpinStyle';
        styleSheet.innerHTML = `
        @keyframes dynamicSpin {
            0% {
                transform: rotate(${rotationAt0}deg);
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

    // Spin function
    const spin = (targetEntryIndex = null) => {
        button.classList.add('disabled');

        const degreesPerSubSector = 360 / wheelEntries.length; // 45 degrees per sub-sector
        const totalSpins = 5; // Number of full rotations

        // Calculate target rotation
        let targetRotation = (totalSpins * 360) + (targetEntryIndex * degreesPerSubSector) - 18;
        targetRotation = -targetRotation;

        // Adjust by half a sub-sector to align with the arrow
        targetRotation -= degreesPerSubSector / 2;

        // Generate keyframes for the rotation
        generateKeyframes(targetRotation);

        // Reset previous animation
        spinner.classList.remove('wheel__spinner_animated_1');
        void spinner.offsetWidth; // Trigger reflow
        spinner.classList.add('wheel__spinner_animated_1');

        // Get the corresponding entry
        const entry = wheelEntries[targetEntryIndex];

        localStorage.setItem('prize', entry.popupText);

        setTimeout(() => {
            // Show the popup
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');

            prize = entry.popupText;

            // Update the popup text
            document.querySelector('.gradient-text').innerHTML = prize;

            // Show or hide buttons
            claimButton.style.display = entry.showClaim ? 'inline-block' : 'none';
            againButton.style.display = entry.showSpin ? 'inline-block' : 'none';

            // Adjust button-wrap grid-template-columns
            if (entry.showClaim && entry.showSpin && spinCount < 2) {
                buttonWrap.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                buttonWrap.style.gridTemplateColumns = 'auto';
            }

            if (spinCount >= 2) {
                againButton.style.display = 'none';
                if (entry.showClaim) {
                    buttonWrap.style.gridTemplateColumns = 'auto';
                } else {
                    buttonWrap.style.display = 'none';
                }
            }

            button.classList.remove('disabled');

        }, 4500); // Animation duration
    };

    // Event listeners for "Claim" and "Spin Again" buttons
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
                spinAgain();
            }, 5);
            const targetEntryIndex = forcedEntries[forcedIndex];
            spin(targetEntryIndex);
            forcedIndex = (forcedIndex + 1) % forcedEntries.length;
        }
    });

    const spinAgain = () => {
        spinner.classList.remove('wheel__spinner_animated_1');
        void spinner.offsetWidth;
        spinner.classList.add('wheel__spinner_animated_1');
    };

    // Initial check for spin count
    const startCheck = () => {
        if (spinCount > 0) {
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');
            document.querySelector('.gradient-text').innerHTML = prize;
            if (spinCount >= 2) {
                againButton.style.display = 'none';
                buttonWrap.style.gridTemplateColumns = 'auto';
            }
            // if (prize === 'Try Again') {
            //     claimButton.style.display = 'none';
            // }
        }
    };

    startCheck();


// Additional animations and effects (unchanged)
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
});