// カードの「飛ぶ」アニメーション用ユーティリティ
// transition-group の JS フック（@enter / @leave）から呼び出す。
// getBoundingClientRect でソース/ターゲットの位置を取得し、FLIP 技法で移動させる。

const DURATION = 450; // ms。CSS の .card-move と揃える

// transitionend もしくはフォールバックのタイマーで一度だけ done() を呼ぶ
function once(el, done) {
  let called = false;
  const finish = () => {
    if (called) return;
    called = true;
    el.removeEventListener("transitionend", finish);
    clearTimeout(timer);
    done();
  };
  const timer = setTimeout(finish, DURATION + 80);
  el.addEventListener("transitionend", finish);
}

// 引いたカードが sourceSelector（山札/捨て札）の位置から自分のスロットへ飛んでくる
export function flyEnter(el, done, sourceSelector) {
  const src = document.querySelector(sourceSelector);
  if (!src) {
    done();
    return;
  }
  const elRect = el.getBoundingClientRect();
  const srcRect = src.getBoundingClientRect();
  const dx = srcRect.left - elRect.left;
  const dy = srcRect.top - elRect.top;

  el.style.transition = "none";
  el.style.transform = `translate(${dx}px, ${dy}px) scale(0.8)`;
  el.style.opacity = "0";
  // リフロー強制でスタート位置を確定
  void el.offsetWidth;

  el.style.transition = `transform ${DURATION}ms ease, opacity ${DURATION}ms ease`;
  el.style.transform = "none";
  el.style.opacity = "1";

  once(el, () => {
    el.style.transition = "";
    el.style.transform = "";
    el.style.opacity = "";
    done();
  });
}

// 捨てたカードが自分のスロットから targetSelector（捨て札）へ飛んでいく
export function flyLeave(el, done, targetSelector) {
  const elRect = el.getBoundingClientRect();
  // 流れから外して残りのカードを詰めさせる（fixed で viewport 座標に固定）
  el.style.position = "fixed";
  el.style.left = `${elRect.left}px`;
  el.style.top = `${elRect.top}px`;
  el.style.width = `${elRect.width}px`;
  el.style.margin = "0";
  el.style.zIndex = "10";

  const tgt = document.querySelector(targetSelector);
  if (!tgt) {
    done();
    return;
  }
  const tgtRect = tgt.getBoundingClientRect();
  const dx = tgtRect.left - elRect.left;
  const dy = tgtRect.top - elRect.top;
  void el.offsetWidth;

  el.style.transition = `transform ${DURATION}ms ease, opacity ${DURATION}ms ease`;
  el.style.transform = `translate(${dx}px, ${dy}px) scale(0.8)`;
  el.style.opacity = "0";

  once(el, done);
}
