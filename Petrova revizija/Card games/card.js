const CardHandler = function() {

    const SIGNS = {
        HEART: '♥',
        DIAMOND: '♦',
        CLUBE: '♣',
        SPADE: '♠'
    };
    const HIGH_CARDS = {
        ACE: 'A',
        QUEEN: 'Q',
        KING: 'K',
        JOKER: 'J'
    };
    const signs = Object.keys(SIGNS).map((signName) => SIGNS[signName]);
    const MAX_CARD_NUBMER = 13;
    const getColor = (sign) => {
        switch (sign) {
            case SIGNS.HEART:
                return 'red';
            case SIGNS.DIAMOND:
                return 'red';
            case SIGNS.CLUBE:
                return 'black';
            case SIGNS.SPADE:
                return 'black';
        };
    }
    const getNumber = (number) => {
        switch (number) {
            case 1:
                return HIGH_CARDS.ACE;
            case 11:
                return HIGH_CARDS.ACE;
            case 12:
                return HIGH_CARDS.JOKER;
            case 13:
                return HIGH_CARDS.QUEEN;
            case 14:
                return HIGH_CARDS.KING;
        }
        return number;
    };
    const getCardValue = (number) => {
        switch (number) {
            case HIGH_CARDS.ACE:
                return 15;
            case HIGH_CARDS.JOKER:
                return 12;
            case HIGH_CARDS.QUEEN:
                return 13;
            case HIGH_CARDS.KING:
                return 14;
        }
        return number;
    }
    const publicAPI = {
        generateCard() {
            const sign = signs[Math.round(Math.random() * (signs.length - 1))];
            const genNumber = Math.round(Math.random() * MAX_CARD_NUBMER) + 1;
            const number = getNumber(genNumber);
            return {
                number,
                sign,
                color: getColor(sign),
                value: getCardValue(number)
            };
        },
    };
    return publicAPI;
};