(function main() {
    const cardHandler = CardHandler();
    const renderer = DOMHandler();
    let cardOpen, cardClose, currentClosedCardElement, currentOpenCardElement, addPixel = 0;

    const upButton = document.querySelector('.great-lower-button .up');
    const downButton = document.querySelector('.great-lower-button .down');
    const gameOverContainer = document.querySelector('.game-over');
    const gameOverBtn = document.querySelector('.game-over-btn');
    const openCardSection = document.querySelector('.open-card');
    const closeCardSection = document.querySelector('.close-card');
    const counter = document.querySelector('.counter');
    const gameOverSound = closeCardSection.nextElementSibling;
    const cardFlipSound = gameOverSound.nextElementSibling;
    const moveCardCloseOpenSound = cardFlipSound.nextElementSibling;
    const moveCardOpenCorrectSound = moveCardCloseOpenSound.nextElementSibling;
    const correctCardContainer = document.querySelector('.correct-cards');

    let score = 0;
    const initGame = () => {
        cardOpen = cardHandler.generateCard();
        currentOpenCardElement = renderer.renderCard(cardOpen, 'open');
        cardClose = cardHandler.getDifferentCard(cardOpen);
        currentClosedCardElement = renderer.renderCard(cardClose, 'close');
    };

    const disableButtons = () => {
        upButton.disabled = true;
        downButton.disabled = true;
    }
    const enableButtons = () => {
        upButton.disabled = false;
        downButton.disabled = false;
    };
    const getXandYDistance = (elem1, elem2) => {
        elem1Dimension = elem1.getBoundingClientRect();
        elem2Dimension = elem2.getBoundingClientRect();
        const xTranslation = elem1Dimension.x - elem2Dimension.x;
        const yTranslation = elem1Dimension.y - elem2Dimension.y;
        return {
            xTranslation,
            yTranslation
        };
    };
    const moveClosedCard = (front, back) => {
        setTimeout(function() {
            front.style.zIndex = 2;
            back.style.zIndex = 1;
            const distance = getXandYDistance(openCardSection, closeCardSection);
            currentClosedCardElement.style.transition = `transform 0.5s ease`;
            currentClosedCardElement.style.transform = `translate(${distance.xTranslation}px,${distance.yTranslation}px)`;
            playSound(moveCardCloseOpenSound);
            cardOpen = cardClose;
            cardClose = cardHandler.getDifferentCard(cardOpen);
            setTimeout(() => {
                currentClosedCardElement.parentElement.removeChild(currentClosedCardElement);
                currentOpenCardElement = renderer.renderCard(cardOpen, 'open');
                currentClosedCardElement = renderer.renderCard(cardClose, 'close')
                counter.innerHTML = `Your score: ${score}`;
                enableButtons();
            }, 500);
        }, 1000);
    };
    const moveOpenCard = (card, addPixel = 0) => {
        setTimeout(() => {
            playSound(moveCardOpenCorrectSound);
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
    const playSound = (soundElement, delay = 0) => {
        setTimeout(() => {
            soundElement.play();
        }, delay);
    };
    const gameOver = () => {
        disableButtons();
        gameOverContainer.className = `${gameOverContainer.className} game-over-slide`;
        playSound(gameOverSound);
    };

    const getButtonHandler = type => evt => {
        disableButtons();
        evt.preventDefault();
        if (evt.button === 0) {
            const front = currentClosedCardElement.lastChild;
            const back = currentClosedCardElement.firstChild;
            setFLipCardClass(front, back);
            playSound(cardFlipSound, 100);
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

    const startOverGame = () => {
        enableButtons();
        gameOverContainer.className = 'game-over';
        renderer.removeChilds(openCardSection);
        renderer.removeChilds(closeCardSection);
        renderer.removeChilds(correctCardContainer);
        addPixel = 0;
        score = 0;
        counter.innerHTML = `Your score: ${score}`;
        initGame();
    };

    initGame();
    upButton.addEventListener('click', clickButtonUp);
    downButton.addEventListener('click', clickButtonDown);
    gameOverBtn.addEventListener('click', startOverGame);
})();