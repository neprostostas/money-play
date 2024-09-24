document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html'),
        currLangDom = document.querySelector('.curr_lang'),
        preloader = document.querySelector('.preloader'),
        $preloader = $('.preloader'),
        langSwitcher = document.querySelector('.lang_switcher_outer'),
        langListItem = [...document.querySelectorAll('.lang_list_item')],
        userLangBrowser = navigator.language || navigator.userLanguage,
        languageParts = userLangBrowser.split('-'),
        userLang = languageParts[0],
        bonus = [...document.querySelectorAll('.bonus')],
        halfBonus = [...document.querySelectorAll('#halfBonus')],
        country = html.getAttribute('data-country');

    const hidePreloader = () => {
        html.classList.remove('hide');
        $preloader.fadeIn();
        setTimeout(function () {
            // preloader.classList.add('hide');
            $preloader.fadeOut();
            html.classList.add('hide');
        }, 200);
    };

    hidePreloader();

    const listOfLang = ['en', 'de', 'fi', 'pl', 'pt', 'es', 'ro', 'hu', 'fr', 'vn', 'th', 'cz', 'jp', 'se', 'lt', 'lv', 'ee', 'sk', 'gr', 'ph', 'no', 'dk', 'it', 'bg'];

    const countryToLang = {
        de: 'de',
        fi: 'fi',
        pl: 'pl',
        pt: 'pt',
        br: 'pt',
        es: 'es',
        ro: 'ro',
        hu: 'hu',
        fr: 'fr',
        vn: 'vn',
        vi: 'vn',
        th: 'th',
        // cz: 'cz',
        // cs: 'cz'
        jp: 'jp',
        ja: 'jp',
        se: 'se',
        sv: 'se',
        ee: 'ee',
        et: 'ee',
        sk: 'sk',
        lt: 'lt',
        lv: 'lv',
        gr: 'gr',
        el: 'gr',
        no: 'no',
        nn: 'no',
        nb: 'no',
        ph: 'ph',
        fil: 'ph',
        dk: 'dk',
        da: 'dk',
        it: 'it',
        bg: 'bg',
        default: 'en',
    };

    const data = {
        by: {
            countWB: '1600 USD',
        },
        az: {
            countWB: '1600 USD',
        },
        am: {
            countWB: '1600 USD',
        },
        ge: {
            countWB: '1600 USD',
        },
        md: {
            countWB: '1600 USD',
        },
        mn: {
            countWB: '1600 USD',
        },
        tm: {
            countWB: '1600 USD',
        },
        kg: {
            countWB: '1600 USD',
        },
        tj: {
            countWB: '1600 USD',
        },
        nz: {
            countWB: '1600 NZD',
        },
        ck: {
            countWB: '1600 NZD',
        },
        nu: {
            countWB: '1600 NZD',
        },
        pn: {
            countWB: '1600 NZD',
        },
        tk: {
            countWB: '1600 NZD',
        },
        dk: {
            countWB: '6000 DKK',
        },
        fo: {
            countWB: '6000 DKK',
        },
        gl: {
            countWB: '6000 DKK',
        },
        in: {
            countWB: '60 000 INR',
        },
        bt: {
            countWB: '60 000 INR',
        },
        np: {
            countWB: '60 000 INR',
        },
        ch: {
            countWB: '1600 CHF',
        },
        li: {
            countWB: '1600 CHF',
        },
        ca: {
            countWB: '1600 CAD',
        },
        pm: {
            countWB: '1600 CAD',
        },
        no: {
            countWB: '12 000 NOK',
        },
        sj: {
            countWB: '12 000 NOK',
        },
        cl: {
            countWB: '850 000 CLP',
        },
        pl: {
            countWB: '5000 PLN',
        },
        mx: {
            countWB: '30 000 MXN',
        },
        co: {
            countWB: '5 000 000 COP',
        },
        ar: {
            countWB: '600 000 ARS',
        },
        br: {
            countWB: '6000 BRL',
        },
        // cz: {
        //     countWB: '30 000 CZK',
        // },
        hu: {
            countWB: '360 000 HUF',
        },
        jp: {
            countWB: '120 000 JPY',
        },
        pe: {
            countWB: '5000 PEN',
        },
        ph: {
            countWB: '60 000 PHP',
        },
        ro: {
            countWB: '4800 RON',
        },
        th: {
            countWB: '36 000 THB',
        },
        vn: {
            countWB: '30 000 000 VND',
        },
        bg: {
            countWB: '2400 BGN',
        },
        default: {
            countWB: '1600 EUR',
        },
    }

    let lang = countryToLang[userLang] || countryToLang.default;

    if (country) {
        Object.keys(data).forEach(item => {
            (item === country) && html.classList.add(`curr_${country}`);
        })
    }

    listOfLang.forEach(item => {
        html.classList.remove(item);
        html.classList.add(lang);
    });

    const changeLanguage = item => {
        hidePreloader();

        const lang = item.getAttribute('data-lang');

        listOfLang.forEach(item => {
            html.classList.contains(item) && html.classList.remove(item);
        });

        html.classList.add(lang);

        langListItem.forEach(item => {
            item.classList.remove('curr');
        });
        item.classList.add('curr');

        currLangDom.innerHTML = item.innerHTML;
    };

    langListItem.forEach(item => {
        item.classList.remove('curr');
        item.addEventListener('click', () => {
            changeLanguage(item);
        });
    });

    const currLangItem = langListItem.find(
        item => item.getAttribute('data-lang') === lang
    );

    if (currLangItem) {
        currLangItem.classList.add('curr');
        currLangDom.innerHTML = currLangItem.innerHTML;
    } else {
        currLangDom.innerHTML = `<span>${countryToLang.default}</span>`;
    }

    document.addEventListener('click', e => {
        !e.target.closest('.lang_switcher_outer') &&
        langSwitcher.classList.remove('act');
    });

    langSwitcher.addEventListener('click', () => {
        langSwitcher.classList.toggle('act');
    });

    bonus.forEach(item => {
        item.textContent = data[country]
            ? data[country].countWB
            : data.default.countWB;
    });

    const inputValue = data[country] ? data[country].countWB : data.default.countWB;;
    const result = processValue(inputValue);
    function processValue(inputValue) {

        const [numbers, currencyIndex] = inputValue.match(/\d+(\s+\d+)*|\D+/g);

        if (numbers && currencyIndex) {
        const numericValue = numbers.replace(/ /g, '');

        const result = {
            fullBonus: numericValue + currencyIndex,
            halfBonus: Math.round(numericValue / 2) + currencyIndex,
            currencyIndex
        };
        return result;
        }
        return [];
    }

    function changeBonusContent(bonusWrapper, bonus) {
        let formattedNumber;
        bonusWrapper.forEach(item => {
        if(result[bonus].length > 4){
            formattedNumber = result[bonus].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        } else {
            formattedNumber = result[bonus];
        }
        item.textContent = formattedNumber;
        // item.setAttribute('data-text', formattedNumber);
        });
    }

    changeBonusContent(halfBonus, 'halfBonus');

    const button = $('.wheel__button'),
        spinner = document.getElementById('wheel__spinner'),
        wheel = document.getElementById('wheel'),
        cards = document.getElementById('cards'),
        popup = document.getElementById('popup'),
        popupFirst = document.getElementById('popup__first'),
        popupFinal = document.getElementById('popup__final'),
        popupBtnFirst = document.getElementById('popup__button_first'),
        wrapper = document.getElementById('wrapper'),
        title = document.getElementById('title'),
        titleFirst = document.getElementById('title__first'),
        titleSecond = document.getElementById('title__second'),
        titleCard = document.getElementById('title__card'),
        titleFinal = document.getElementById('title__final'),
        logo = document.getElementById('logo'),
        card = document.getElementsByClassName('card');

    button.click(function () {
        spin();
    });

    function spin() {
        button.addClass('disabled');
        spinner.classList.add('wheel__spinner_animated_1');
        spinner.classList.remove('wheel__spinner_animated');
        titleFirst.classList.add('title__hidden');
        titleSecond.classList.remove('title__hidden');
        setTimeout(function () {
            localStorage.status_2013 = 'wheel';
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');
        }, 4500);
    }

    popupBtnFirst.addEventListener('click', () => {
        popup.classList.remove('popup__show');
        popupFirst.classList.remove('popup__content_show');
        titleSecond.classList.add('title__hidden');
        titleCard.classList.remove('title__hidden');
        wheel.classList.add('game__hidden');
        cards.classList.remove('game__hidden');
        wrapper.classList.add('wrapper__second');
        localStorage.status_2013 = 'cards';
    })

    let counter = 0;

    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', () => {
            if (counter == 0) {
                card[i].classList.add('card__active1');
                counter = 1;
                localStorage.card_win1_2013 = card[i].getAttribute('data-attr');
                localStorage.status_2013 = 'cards__active';
                for (let j = 0; j < card.length; j++) {
                    if (j != i) {
                        card[j].classList.add('card__disabled');
                    }
                }

                setTimeout(function () {
                    for (let j = 0; j < card.length; j++) {
                        if (j != i) {
                            card[j].classList.remove('card__disabled');
                        }
                    }
                }, 1000);
            } else if (counter == 1) {
                card[i].classList.add('card__active2');
                counter = 2;
                localStorage.card_win2_2013 = card[i].getAttribute('data-attr');
                localStorage.status_2013 = 'final';
                for (let j = 0; j < card.length; j++) {
                    if (j != i) {
                        card[j].classList.add('card__disabled');
                    }
                }
                setTimeout(function () {

                    popup.classList.add('popup__show');
                    popupFinal.classList.add('popup__content_show');
                    titleCard.classList.add('title__hidden');
                    titleFinal.classList.remove('title__hidden');
                    title.classList.add('title__win');
                    logo.classList.add('logo__final');
                }, 1700);
            }

        })
    }

    if (localStorage.status_2013) {
        if (localStorage.status_2013 == 'wheel') {
            button.addClass('disabled');
            spinner.classList.add('wheel__spinner_final');
            spinner.classList.remove('wheel__spinner_animated');
            titleFirst.classList.add('title__hidden');
            titleSecond.classList.remove('title__hidden');
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');
        } else if (localStorage.status_2013 == 'cards') {
            titleFirst.classList.add('title__hidden');
            titleSecond.classList.add('title__hidden');
            titleCard.classList.remove('title__hidden');
            popup.classList.add('popup__show');
            popupFirst.classList.add('popup__content_show');
            wheel.classList.add('game__hidden');
            cards.classList.remove('game__hidden');
            wrapper.classList.add('wrapper__second');
        } else if (localStorage.status_2013 == 'cards__active') {
            titleFirst.classList.add('title__hidden');
            titleSecond.classList.add('title__hidden');
            titleCard.classList.remove('title__hidden');
            wheel.classList.add('game__hidden');
            cards.classList.remove('game__hidden');
            wrapper.classList.add('wrapper__second');
        } else if (localStorage.status_2013 == 'final') {
            titleFirst.classList.add('title__hidden');
            titleSecond.classList.add('title__hidden');
            titleCard.classList.add('title__hidden');
            title.classList.add('title__win');
            titleFinal.classList.remove('title__hidden');
            wheel.classList.add('game__hidden');
            cards.classList.remove('game__hidden');
            wrapper.classList.add('wrapper__second');
            popup.classList.add('popup__show');
            popupFinal.classList.add('popup__content_show');
            logo.classList.add('logo__final');
        }
        for (let i = 0; i < card.length; i++) {
            if (localStorage.card_win1_2013 == card[i].getAttribute('data-attr')) {
                card[i].classList.add('card__final');
                counter = 1;
            }
            if (localStorage.card_win2_2013 == card[i].getAttribute('data-attr')) {
                card[i].classList.add('card__final');
                counter = 2;
                for (let j = 0; j < card.length; j++) {
                    card[j].classList.add('card__disabled');
                }
            }
        }
    }

    document.getElementById("year").innerHTML = new Date().getFullYear();
});