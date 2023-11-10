import { marksNumber } from "@/utils/mark/markUtil"
export const Tutorial = class {
    constructor() {
        this.deck = deck
        this.playerHands = ["s1", "h3", "c3", "d8", "dx", "hq", "ck"]
        this.enemyHands = ["sx", "s3", "h7", "c7", "c8", "d9", "cq"]
        this.discard = ["s4"]
        this.isDisabledDeck = true
        this.isDisabledHands = false
        this.phase = 0
    }
    nextStep() {
        this.phase += 1
        // phase1
        switch (this.phase) {
            case 1:
                this.isDisabledHands = true;
                this.isDisabledDeck = false;
                break;

            case 2:
                this.playerHands = this.sortOfNumber(this.playerHands)
                break;
            case 3:
                this.enemyHands = ["sx", "s3", "h7", "c7", "c8", "d9"]
                this.drawADeck(this.enemyHands)
                this.discard = ["cq"].concat(this.discard);
                break;
            case 4:
                this.isDisabledHands = true;
                this.isDisabledDeck = false;
                break;
            case 6:
                this.deck = deck2
                this.playerHands = ["s1", "h3", "c3", "d4"]
                this.enemyHands = ["h1", "s2", "h2", "c4"]
                this.discard = ["c9"]
                break
            case 7:
                this.isDisabledHands = true;
                this.isDisabledDeck = false;
                break;
            case 8:
                this.playerHands = this.sortOfNumber(this.playerHands)
                break;
            case 9:
                this.enemyHands = ["h1", "c4"]
                this.drawADeck(this.enemyHands)
                this.discard = ["s2"].concat(this.discard);
                break;
            case 10:
                this.isDisabledHands = true;
                this.isDisabledDeck = false;
                break;

            default:
                break;
        }
    }
    // デッキから1枚引く
    drawADeck(cards) {
        let drawHands = this.deck.slice(0, 1)
        this.deck = this.deck.slice(1)
        if (cards) {
            return (cards.push(drawHands[0]))
        } else {
            return drawHands[0]
        }
    }
    // 手札をソートする
    sortOfNumber(cards) {
        return cards.sort((a, b) => marksNumber.indexOf(a) - marksNumber.indexOf(b))
    }
}
const deck = [
    "hx",
    "s2",
    "s5",
    "s6",
    "s7",
    "s8",
    "s9",
    "sx",
    "sj",
    "sq",
    "sk",
    "h1",
    "h2",
    "h4",
    "h5",
    "h6",
    "h8",
    "h9",
    "hj",
    "hk",
    "c1",
    "c2",
    "c4",
    "c5",
    "c6",
    "cx",
    "cj",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "dj",
    "dq",
    "dk"
]

const deck2 = [
    "d3",
    "hj",
    "hk",
    "c1",
    "c2",
    "c4",
    "c5",
    "c6",
    "cx",
    "cj",
    "d1",
    "d2",
    "d4",
    "d5",
    "d6",
    "d7",
    "dj",
    "dq",
    "dk"
]