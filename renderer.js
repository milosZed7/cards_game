const DOMHandler = function() {

    const getContentOfFrontCard = (card) => {
        const number = document.createElement('div');
        const reverseNumber = document.createElement('div');
        const sign = document.createElement('div');
        sign.innerHTML = card.sign;
        number.innerHTML = card.number;
        reverseNumber.innerHTML = card.number;
        sign.setAttribute('class', 'card-sign');
        number.setAttribute('class', 'card-number');
        reverseNumber.setAttribute('class', 'card-reverse-number');
        return {
            sign,
            number,
            reverseNumber
        };
    };
    const getFrontCard = (card) => {
        const frontCard = document.createElement('div');
        const cardContent = getContentOfFrontCard(card);
        frontCard.setAttribute('class', `front-card-${card.color}`);
        frontCard.appendChild(cardContent.number);
        frontCard.appendChild(cardContent.sign);
        frontCard.appendChild(cardContent.reverseNumber);
        return frontCard;
    };

    const getBackCard = () => {
        const backCard = document.createElement('div');
        backCard.setAttribute('class', 'back-card');
        return backCard;
    };
    const getWholeCard = (frontCard, backCard) => {
        const wholeCard = document.createElement('div');
        wholeCard.setAttribute('class', 'whole-card');
        wholeCard.appendChild(backCard);
        wholeCard.appendChild(frontCard);
        return wholeCard;
    }
    const getElement = (elementName) => {
        const elementSelector = {
            upbutton: '.great-lower-button .up',
            donwButton: '.great-lower-button .down',
            gameOverButton: '.game-over-btn',
            openCardSection: '.open-card',
            closeCardSection: '.close-card',
            gameOverSound: '.game-over-sound',
            cardFlipSOund: '.card-flip-sound',
            moveCardCloseOpenSound: '.card-move-sound',
            moveCardOpenCorrectSound: '.card-move-sound2',
            correctCardContainer: '.correct-cards',
            counter: '.counter',
            gameOverContainer: '.game-over',
        }[elementName];

        return document.querySelector(elementSelector);
    };
    const getElementBySelector = (selector) => {
        return document.querySelector(selector);
    };
    const removeChilds = element => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    const removeClass = (element, className) => {
        element.removeClass(className);
    };
    const setClass = (element, className, append = true) => {
        if (append) {
            element.className = `${element.className} ${className}`;
        } else
            element.className = className;
    };


    const publicAPI = {
        renderCard(card, type) {
            const cardPositionClass = {
                open: 'openCardSection',
                close: 'closeCardSection'
            }[type];
            const cardPosition = getElement(cardPositionClass);
            const backCard = getBackCard();
            const frontCard = getFrontCard(card);
            const wholeCard = getWholeCard(frontCard, backCard);
            cardPosition.appendChild(wholeCard);
            return wholeCard;
        },
        getElement,
        getElementBySelector,
        removeChilds,
        removeClass,
    };
    return publicAPI;
};