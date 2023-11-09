import { marks, marksNumber, numberSort } from "@/utils/mark/markUtil"
export const Game = class {
    // デッキをシャッフル
    shuffleDeck() {
        this.deck = shuffle(this.deck)
    }
    // デッキから任意の枚数引く
    drawDeck(sheet) {
        const drawHands = this.deck.slice(0, sheet)
        this.deck = this.deck.slice(sheet)
        return drawHands
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
    // 手札を捨ててデッキから引く
    async throwAndDrawDeck(throwCards) {
        // 捨てる
        this.discard = throwCards.concat(this.discard)
        this.playerHands = this.playerHands.filter((card) => !throwCards.includes(card))
        // 山札から引く
        this.drawADeck(this.playerHands)
        // ソート
        this.playerHands = this.sortOfNumber(this.playerHands)
        if (this.checkResult(this.playerHands)) {
            this.turn = "finished"
            return "あなたの勝ち！"
        } else {
            // 手番交代
            const enemyTurn = await this.enemyTurn()
            return enemyTurn
        }
    }
    // 手札を捨てて捨て札から引く
    async throwAndDrawDiscard(throwCards) {
        // 手札から抜く
        this.playerHands = this.playerHands.filter((card) => !throwCards.includes(card))
        // 手札に取り入れる
        this.playerHands.push(this.discard[0])
        // ソート
        this.playerHands = this.sortOfNumber(this.playerHands)
        // 捨て札から取る
        this.discard.shift()
        // 捨て札に出す
        this.discard = throwCards.concat(this.discard)
        if (this.checkResult(this.playerHands)) {
            this.turn = "finished"
            return "あなたの勝ち！"
        } else {
            // 手番交代
            const enemyTurn = await this.enemyTurn()
            return enemyTurn
        }
    }
    // 敵が手札を捨ててデッキから引く
    enemyThrowAndDrawDeck(throwCards) {
        // 捨てる
        this.discard = throwCards.concat(this.discard)
        this.enemyHands = this.enemyHands.filter((card) => !throwCards.includes(card))
        // 山札から引く
        this.drawADeck(this.enemyHands)
        // ソート
        this.enemyHands = this.sortOfNumber(this.enemyHands)
    }
    // 敵が手札を捨てて捨て札から引く
    enemyThrowAndDrawDiscard(throwCards) {
        // 手札から抜く
        this.enemyHands = this.enemyHands.filter((card) => !throwCards.includes(card))
        // 手札に取り入れる
        this.enemyHands.push(this.discard[0])
        // ソート
        this.enemyHands = this.sortOfNumber(this.enemyHands)
        // 捨て札から取る
        this.discard.shift()
        // 捨て札に出す
        this.discard = throwCards.concat(this.discard)
    }
    // 勝敗チェック
    checkResult(hands) {
        let sum = 0
        hands.forEach(mark => {
            if (mark[1].match(/^\d$/)) {
                sum += parseInt(mark[1])
            } else if (mark[1] == "x") {
                sum += 10
            } else if (mark[1] == "j") {
                sum += 11
            } else if (mark[1] == "q") {
                sum += 12
            } else if (mark[1] == "k") {
                sum += 13
            }
        })
        return sum <= 7
    }
    // 相手のターン：初級（一番でかい手札を捨て、捨て札が手札に含まれない限り山札から引く）
    async enemyTurn() {
        this.turn = "enemy"
        await waitSecond(1)
        this.enemyHands = this.sortOfNumber(this.enemyHands)
        let selected = []
        numberSort.forEach(number => {
            if (this.enemyHands.some(mark => mark.includes(number))) {
                selected = this.enemyHands.filter(mark => mark.includes(number))
                return
            }
        })
        if (this.enemyHands.some(mark => mark.includes(this.discard[0][1]))) {
            this.enemyThrowAndDrawDiscard(selected)
        } else {
            this.enemyThrowAndDrawDeck(selected)
        }
        if (this.checkResult(this.enemyHands)) {
            this.turn = "finished"
            return "相手の勝ち..."
        } else {
            this.turn = "player"
        }
    }
    constructor() {
        this.deck = shuffle(marks)
        this.playerHands = this.sortOfNumber(this.drawDeck(7))
        this.enemyHands = this.drawDeck(7)
        this.discard = this.drawDeck(1)
        /*
        ターン
        プレーヤーのターン："player"
        相手のターン："enemy"
        */
        this.turn = "player"
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

const waitSecond = (second) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(second);
        }, second * 1000);
    })
}
