(function main() {
    // move all the DOM handling logic out of this script to related services
    const cardHandler = CardHandler();
    const renderer = Renderer();
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
        cardClose = getDifferentCard(cardOpen);
        currentClosedCardElement = renderer.renderCard(cardClose, 'close');
    };

    // move this pure function to cardHandler as well
    const getDifferentCard = (card) => {
        let generatedCard = cardHandler.generateCard();
        while (card.value === generatedCard.value) {
            generatedCard = cardHandler.generateCard();
        }
        return generatedCard;
    };
    const disableButtons = () => {
        upButton.disabled = true;
        downButton.disabled = true;
    }
    const enableButtons = () => {
        upButton.disabled = false;
        downButton.disabled = false;
    };

    //move to card.js
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

    // the whole functionality should be part of card-handler.js
    const moveClosedCard = (front, back) => {
        //avoid setTimeout hack. Use promise mechanism
        setTimeout(function() {
            front.style.zIndex = 2;
            back.style.zIndex = 1;
            const distance = getXandYDistance(openCardSection, closeCardSection);
            currentClosedCardElement.style.transition = `transform 0.5s ease`;
            currentClosedCardElement.style.transform = `translate(${distance.xTranslation}px,${distance.yTranslation}px)`;
            playSound(moveCardCloseOpenSound);
            cardOpen = cardClose;
            cardClose = getDifferentCard(cardOpen);
            setTimeout(() => {
                currentClosedCardElement.parentElement.removeChild(currentClosedCardElement); // to renderer.js :)
                currentOpenCardElement = renderer.renderCard(cardOpen, 'open');
                currentClosedCardElement = renderer.renderCard(cardClose, 'close')
                counter.innerHTML = `Your score: ${score}`; // to renderer.js
                enableButtons();
            }, 500);
        }, 1000);
    };

    // 1) move this to card.js 
    // 2) change the setTimeout hack with proper promise utilization
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

    // move to card.js and instead of modifying passed arguments, I suggest making this function pure
    // so it returns an object or array containing modified front and back cards
    // I recommend to stick with immutability techniques
    const setFLipCardClass = (front, back) => {
        front.className = `${front.className} flip-card`;
        back.className = `${back.className} flip-card`;
    };

    // try to move the sound handling logic to a seperate module
    const playSound = (soundElement, delay = 0) => {
        // use promises to chain sounds seqentually 
        setTimeout(() => {
            soundElement.play();
        }, delay);
    };
    const gameOver = () => {
        disableButtons();
        gameOverContainer.className = `${gameOverContainer.className} game-over-slide`;
        playSound(gameOverSound);
    };

    // move all the button related logic to button-controller.js
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

    // move to renderer.js eg. Rederer,removeChilds(element);
    const removeChilds = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    const startOverGame = () => {
        enableButtons();
        gameOverContainer.className = 'game-over';
        removeChilds(openCardSection);
        removeChilds(closeCardSection);
        removeChilds(correctCardContainer);
        addPixel = 0;
        score = 0;
        counter.innerHTML = `Your score: ${score}`;
        initGame();
    };

    initGame();

    //move to button-controller.js
    upButton.addEventListener('click', clickButtonUp);
    downButton.addEventListener('click', clickButtonDown);
    gameOverBtn.addEventListener('click', startOverGame);
})();