import { marks, marksNumber } from "@/utils/mark/markUtil"
export const Game = class {
    shuffleDeck() {
        this.deck = shuffle(this.deck)
    }
    drawDeck(sheet) {
        const drawHands = this.deck.slice(0, sheet)
        this.deck = this.deck.slice(sheet)
        return drawHands
    }
    drawADeck(notAllowedJoker) {
        let drawHands = this.deck.slice(0, 1)
        console.log(drawHands)
        while (notAllowedJoker || drawHands == "j1" || drawHands == "j2") {
            this.shuffleDeck()
            drawHands = this.deck.slice(0, 1)
        }
        this.deck = this.deck.slice(1)
        return drawHands[0]
    }
    sortOfNumber(cards) {
        return cards.sort((a,b) => marksNumber.indexOf(a) - marksNumber.indexOf(b))
    }
    constructor() {
        this.deck = shuffle(marks)
        this.playerHands = this.sortOfNumber(this.drawDeck(7))
        this.enemyHands = this.drawDeck(7)
        this.discard = this.drawADeck()
    }
}

const shuffle = (array) => {
    for (let i = (array.length - 1); 0 < i; i--) {

        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        let tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}

