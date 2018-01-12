const ButtonController = function(domHandler, audioHandler) {
    const upButton = domHandler.getElement('upButton');
    const downButton = domHandler.getElement('donwButton');
    const gameOverButton = domHandler.getElement('gameOverButton');
    const gameOverContainer = domHandler.getElement('gameOverContainer');
    // const gameOverSound = domHandler.getElement('gameOverSound');

    const enableUpDonwButtons = () => {
        upButton.disabled = true;
        downButton.disabled = true;
    };
    const disableUpDonwButtons = () => {
        upButton.disabled = false;
        downButton.disabled = false;
    };
    const startOverGame = () => {
        disableUpDonwButtons();
        domHandler.setClass(gameOverContainer, 'game-over', false);
        domHandler.removeChilds(openCardSection);
        domHandler.removeChilds(closeCardSection);
        domHandler.removeChilds(correctCardContainer);
    };
    const gameOver = () => {
        disableUpDonwButtons();
        domHandler.setClass(gameOverContainer, 'game-over', 'game-over-slide');
        //audioHandler.playSound(gameOverSound);
    };
    const getButtonHandler = type => evt => {
        disableUpDonwButtons();
        evt.preventDefault();
        if (evt.button === 0) {
            const front = currentClosedCardElement.lastChild;
            const back = currentClosedCardElement.firstChild;
            setFLipCardClass(front, back);
            // playSound(cardFlipSound, 100);
            if ((type === 'down' && cardOpen.value > cardClose.value) ||
                (type === 'up') && cardOpen.value < cardClose.value) {
                score++;
                moveOpenCard(currentOpenCardElement, addPixel);
                addPixel += 3;
                moveClosedCard(front, back);
            } else {
                gameOver();
            }
        }
    };
    const clickButtonUp = getButtonHandler('up');
    const clickButtonDown = getButtonHandler('down');

    upButton.addEventListener('click', clickButtonUp);
    downButton.addEventListener('click', clickButtonDown);
    gameOverButton.addEventListener('click', startOverGame);
};