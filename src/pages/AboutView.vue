<template>
  <div class="about">
    <v-container class="green">
      <v-sheet class="green" dark>
        <h1>セブンの遊び方</h1>
        <p>
          セブンは、手札を引いて捨ててを繰り返し、合計数が「7」以下になるのを目指すゲームです。
        </p>
        <h2>【ディール】</h2>
        <p>
          山札から自分に7枚、相手に7枚配られ、捨て札に1枚配置してスタートとなります。
        </p>
        <v-img src="../assets/about_1.png" />
        <h2>【ターンの流れ】</h2>
        <ul>
          <li>
            1. 手札から好きな札を捨てます。同じ数字のカードが複数枚ある場合、同時にすべて捨てることができます。
          </li>
          <v-img src="../assets/about_2.png" />
          <li>
            2. 山札、もしくは捨て札の一番上から手札に一枚加えます。
            これをプレイヤー間で繰り返します。
          </li>
          <v-img src="../assets/about_2.png" />
        </ul>
        <h2>【勝利条件】</h2>
        <p>
          相手のターンに移る前（1枚手札に加えた時点）で、自分の手札の数字の合計数が7以下になっていれば勝利です。
        </p>
        <v-img src="../assets/about_4.png" />
        <h2>【ゲームのコツ】</h2>
        <ul>
          <li>
            ・なるべく手札に同じ数字が揃っていると、同時に捨てやすくなります。捨て札の一番上のカードと同じ数字が手札の中に入っていたら揃っていないカードから捨て、捨て札をとるようにしましょう。
          </li>
          <li>
            ・数字の小さいカードを持っている方が有利に感じがちですが、終盤まで持っていると逆に不利になることがあります。
          </li>
          <li>
            ・たとえ数字が2でも2枚持って入れば合計は「4」となり、残りの手札を3以下にしなければいけません。こういう場合は2をすべて捨ててしまう方が得策だったりします。
          </li>
          <li>
            ・相手の手札が[2,6]などの場合、5以下のカードを出してしまうと、6を捨て5を取られて負けてしまいます。終盤まで7以下のカードを持っている場合は注意しましょう。
          </li>
          <li>
            ・ジョーカーは[0]扱いです。捨て札に出たら積極的に取り、手元から捨てても意味がないので持っておきましょう。
          </li>
        </ul>
      </v-sheet>
    </v-container>
  </div>
</template>

<style lang="scss">
.v-sheet h2 {
  text-align: left;
}
.v-sheet p {
  padding: 0 24px;
  text-align: left;
  margin: 0;
}

.v-sheet ul li {
  padding: 10px 0;
  list-style-type: none;
  margin-left: 1rem;
  text-indent: -1rem;
  text-align: left;
}
</style>