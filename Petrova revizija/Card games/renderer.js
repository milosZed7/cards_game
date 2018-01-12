const Renderer = function() {
    const getFrontCard = (card) => {
        const frontCard = document.createElement('div');
        const cardContent = setAttributesForFrontCardContent(card);
        frontCard.setAttribute('class', `front-card-${card.color}`);
        frontCard.appendChild(cardContent.number);
        frontCard.appendChild(cardContent.sign);
        frontCard.appendChild(cardContent.reverseNumber);
        return frontCard;
    };

    // this function is predixed with 'set', but in fact it returns an object ?
    const setAttributesForFrontCardContent = (card) => {
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
    const publicAPI = {
        renderCard(card, type) {
            const cardPositionClass = {
                open: 'open-card',
                close: 'close-card'
            }[type];
            const cardPosition = document.querySelector(`.${cardPositionClass}`);
            const backCard = getBackCard();
            const frontCard = getFrontCard(card);
            const wholeCard = getWholeCard(frontCard, backCard);
            cardPosition.appendChild(wholeCard);
            return wholeCard;
        }
    };
    return publicAPI;
};