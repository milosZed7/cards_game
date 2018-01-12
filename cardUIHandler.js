const CardUIHandler = function(domHandler) {
    const openCardSection = domHandler.getElement('openCardSection');
    const closeCardSection = domHandler.getElement('closeCardSection');

    const getXandYDistance = (elem1, elem2) => {
        const elem1Dimension = elem1.getBoundingClientRect();
        const elem2Dimension = elem2.getBoundingClientRect();
        const xTranslation = elem1Dimension.x - elem2Dimension.x;
        const yTranslation = elem1Dimension.y - elem2Dimension.y;
        return {
            xTranslation,
            yTranslation
        };
    };

    const moveClosedCard = (currentClosedCardElement, currentClosedCardElement) => {
        return Primise.resolve()
            .then(function() {
                front.style.zIndex = 2;
                back.style.zIndex = 1;
                const distance = getXandYDistance(openCardSection, closeCardSection);
                currentClosedCardElement.style.transition = `transform 0.5s ease`;
                currentClosedCardElement.style.transform = `translate(${distance.xTranslation}px,${distance.yTranslation}px)`;
                //playSound(moveCardCloseOpenSound);
                cardOpen = cardClose;
                cardClose = getDifferentCard(cardOpen);
            })
            .then(function() {
                currentClosedCardElement.parentElement.removeChild(currentClosedCardElement);
                currentOpenCardElement = renderer.renderCard(cardOpen, 'open');
                currentClosedCardElement = renderer.renderCard(cardClose, 'close')
                counter.innerHTML = `Your score: ${score}`;
            });
    };
    const moveOpenCard = (card, addPixel = 0) => {
        setTimeout(() => {
            //playSound(moveCardOpenCorrectSound);
            const distance = getXandYDistance(correctCardContainer, card);
            card.style.transition = `transform 0.5s ease`;
            card.style.transform = `translate(${distance.xTranslation + addPixel}px,${distance.yTranslation}px)`;
            setTimeout(() => {
                card.removeAttribute('style');
                card.className = `${card.className} correct-card-number-position`;
                card.style.left = `${addPixel}px`
                card.parentElement.removeChild(card);
                correctCardContainer.appendChild(card);
            }, 500);
        }, 500);
    };

    const setFLipCardClass = (front, back) => {
        front.className = `${front.className} flip-card`;
        back.className = `${back.className} flip-card`;
    };
};