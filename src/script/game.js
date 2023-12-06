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
            this.phase = "finished"
            return "あなたの勝ち！"
        } else {
            // 手番交代
            const enemyTurn = await this.enemyTurn(this.level)
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
            this.phase = "finished"
            return "あなたの勝ち！"
        } else {
            // 手番交代
            const enemyTurn = await this.enemyTurn(this.level)
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
    // 相手のターン
    async enemyTurn(level) {
        this.phase = "enemy"
        await waitSecond(1)
        this.enemyHands = this.sortOfNumber(this.enemyHands)
        let selected = []
        switch (level) {
            // 中級（一番でかい手札を捨て、捨て札が手札に含まれない限り山札から引く）
            // 手札の最大の数字と数字が捨て札と一致していた時、その札は捨てない
            // ジョーカーを優先的に捨てる
            case "2":
                console.log(numberSort
                    .filter(mark => !mark.includes(this.discard[0][1])))
                numberSort
                    .filter(mark => !mark.includes(this.discard[0][1]))
                    .forEach(number => {
                        if (this.enemyHands.some(mark => mark.includes(number))) {
                            selected = this.enemyHands.filter(mark => mark.includes(number))
                            return
                        }
                    })

                break;

            // 初級（一番でかい手札を捨て、捨て札が手札に含まれない限り山札から引く）
            // 手札の最大の数字と数字が捨て札と一致していた時、2ターン同じ数字を捨て続ける
            // ジョーカーを優先的に捨てる
            default:
                numberSort.forEach(number => {
                    if (this.enemyHands.some(mark => mark.includes(number))) {
                        selected = this.enemyHands.filter(mark => mark.includes(number))
                        return
                    }
                })

                break;
        }

        this.enemySelect = selected.map(mark => this.enemyHands.indexOf(mark))
        await waitSecond(1)
        if (this.enemyHands.some(mark => mark.includes(this.discard[0][1]))) {
            this.enemyThrowAndDrawDiscard(selected)
        } else {
            this.enemyThrowAndDrawDeck(selected)
        }
        this.enemySelect = []
        if (this.checkResult(this.enemyHands)) {
            this.phase = "finished"
            return "相手の勝ち..."
        } else {
            this.turn += 1
            this.phase = "player"
        }
    }
    constructor() {
        const levelList = ["1", "2"]
        this.level = levelList[Math.floor(Math.random() * levelList.length)];
        this.deck = shuffle(marks)
        this.deck = marks
        this.playerHands = this.sortOfNumber(this.drawDeck(7))
        this.enemyHands = this.drawDeck(7)
        this.enemySelect = []
        this.discard = this.drawDeck(1)
        // 初期捨て札がジョーカーのとき引き直し
        while ((this.discard[0] == "ji" || this.discard[0] == "jt")) {
            this.deck.push(this.discard[0])
            this.deck = shuffle(this.deck)
            this.discard = this.drawDeck(1)
        }
        this.turn = 1
        /*
        フェーズ
        プレーヤーのフェーズ："player"
        相手のフェーズ："enemy"
        ゲーム終了: "finished"
        */
        this.phase = "player"
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
