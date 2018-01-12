const AudioHandler = function(domHandler) {
    const gameOverSound = domHandler.getElement('gameOverSound');
    const cardFlipSound = domHandler.getElement('cardFlipSound');
    const moveCardCloseOpenSound = domHandler.getElement('moveCardCloseOpenSound');
    const moveCardOpenCorrectSound = domHandler.getElement('moveCardOpenCorrectSound');

    const playSound = (soundElement, delay = 0) => {
        setTimeout(() => {
            soundElement.play();
        }, delay);
    };
};