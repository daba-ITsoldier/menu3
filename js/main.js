"use strict";

const menus = [
    {no:  1, name: "チャーハン", price: 900, img: "img/raimon_resize.png"},
    {no:  2, name: "唐揚げ", price: 900, img: "img/raimon_resize.png"},
    {no:  3, name: "餃子", price: 900, img: "img/raimon_resize.png"},
    {no:  4, name: "焼売", price: 900, img: "img/raimon_resize.png"},
    {no:  5, name: "棒棒鶏", price: 900, img: "img/raimon_resize.png"},
    {no:  6, name: "チャーハンチャーハン チャーハン", price: 900, img: "img/raimon_resize.png"},
    {no:  7, name: "チャーハン　　　　　半チャーハン　　　　　全チャーハン　　　　　サイコチャーハン", price: 900, img: "img/raimon_resize.png"},
    {no:  8, name: "寿限無寿限無五劫のすりきれ海砂利水魚の水行末雲来末風来末食う寝るところに住むところやぶらこうじのぶらこうじパイポパイポパイポのシューリンガンシューリンガンのグーリンダイグーリンダイのポンポコピーのポンポコナの長久命ちょうきゅうめいの長助", price: 900, img: "img/raimon_resize.png"},
    {no:  9, name: "チャーハン", price: 900, img: "img/raimon_resize.png"},
    {no: 10, name: "チャーハン", price: 900, img: "img/raimon_resize.png"},
];


// メニュー作成　定数    ********************************************
const menuUl = document.querySelector(".menu > ul");
const menuDisplay = document.querySelector(".menu");


// 実際にメニュー作成
menus.forEach(menu => {
    createMenu(menu);
});


window.addEventListener("load", function () {
    const menu = document.querySelector(".menu");
    const items = document.querySelectorAll(".menu li");
    const main = document.querySelector(".main");


    widthMenu(menus);
    leftGoButton(main);
    rightGoButton(main);
});


// メニューの土台のwidth
function widthMenu(array) {
    menuDisplay.style.width = `calc((10dvw + 200px) * ${array.length} + 30dvw)`;
}


// スムーズな移動用
function smoothScrollTo(element, targetPosition, duration) {
    let startPosition = element.scrollLeft;
    let distance = targetPosition - startPosition;
    let startTime = performance.now();

    function step(currentTime) {
        let elapsedTime = currentTime - startTime;
        let progress = Math.min(elapsedTime / duration, 1); // 進行度を計算（0 〜 1）

        element.scrollLeft = startPosition + distance * easeOutCubic(progress);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3); // イージング（後半減速）
    }

    requestAnimationFrame(step);
}

function rightGoButton(array) {
    const rightGoBtn = document.querySelector(".main > .rightGoBtn");
    rightGoBtn.addEventListener("click", () => {
        let targetPosition = array.scrollWidth - array.clientWidth; // 右端まで
        smoothScrollTo(array, targetPosition, 1000); // 1秒でスクロール
    });
}

function leftGoButton(array) {
    const leftGoBtn = document.querySelector(".main > .leftGoBtn");
    leftGoBtn.addEventListener("click", () => {
        smoothScrollTo(array, 0, 1000); // **左端までスクロール**
    });
}


// メニュー作成関数
function createMenu(array) {
    // メニュー全体
    const li = document.createElement("li");
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    // メニュー画像
    const image = document.createElement("img");
    image.classList.add("image");
    image.src = array.img;
    // メニュー名
    const text = document.createElement("span");
    text.classList.add("text", "rampart-one-regular");
    text.textContent = `${array.name}`;
    // メニュー値段
    const priceBox = document.createElement("div");
    priceBox.classList.add("price-box");
    const price = document.createElement("span");
    price.classList.add("price", "font");
    price.textContent = `${array.price}`;
    const en = document.createElement("span");
    en.classList.add("en", "rampart-one-regular");
    en.textContent = "円";

    wrapper.appendChild(image);
    wrapper.appendChild(text);
    wrapper.appendChild(priceBox);
    priceBox.appendChild(price);
    priceBox.appendChild(en);
    li.appendChild(wrapper);
    menuUl.appendChild(li);

    adjustFontSize(text, 5, 28, 52);
}

// 文字の大きさ調整     (対象要素, 最大文字数, 最小サイズ, 最大サイズ)
function adjustFontSize(element, maxChars, minFontSize, maxFontSize) {
    const textLength = element.textContent.length;
    const calculatedFontSize = (maxFontSize * maxChars) / textLength;
    const newFontSize = Math.min(Math.max(minFontSize, calculatedFontSize), maxFontSize) + "px";
    element.style.fontSize = newFontSize;

    // 🔽 基本は1行にする
    element.style.whiteSpace = "nowrap"; 
    element.style.overflow = "hidden";   
    // element.style.textOverflow = "ellipsis"; 

    // 🔽 文字数が最大を超えたら改行を許可
    if (textLength > maxChars) {
        element.style.whiteSpace = "normal"; // 改行を許可
        // element.style.overflow = "visible"; // 全体を表示
        // element.style.textOverflow = "clip"; // 省略せず表示
    }
}


// カートの位置　定数    ********************************************
const cartButton = document.querySelector(".cart-btn");
const cartCoordinate = cartButton.getBoundingClientRect();


// カートインアニメーション
function cartInAnimation(targetElement, startX, startY) {
    const dvw = window.innerWidth * 0.2;
    const dvh = window.innerHeight * 0.2;
    const wayX = startX + dvw;
    const wayY = startY + dvh;
    const controlFirstX = (startX + dvw) / 2;
    const controlFirstY = startY - dvh;
    const endX = 500;
    const endY = 500;
    const duration = 800;
    animateToPosition(startX, startY, wayX, wayY, controlFirstX, controlFirstY, targetElement, duration);
    const controlSecondX = (wayX + dvw) / 2;
    const controlSecondY = wayY - dvh;
    animateToPosition(wayX, wayY, endX, endY, controlSecondX, controlSecondY, targetElement, duration);
}


// ベジェ曲線を使ってアニメーションを行う関数
function animateToPosition(startX, startY, endX, endY, controlX, controlY, targetElement, duration) {
    const startTime = Date.now();
  
    // アニメーションの更新関数
    function animate() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
  
      // アニメーションが終了したら停止
      if (elapsed >= duration) {
        targetElement.style.left = `${endX}px`;
        targetElement.style.top = `${endY}px`;
        return;
      }
  
      // 進行度t（0〜1）
      const t = elapsed / duration;
  
      // ベジェ曲線で座標を補間
      const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
      const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
  
      // アニメーション対象の位置を更新
      targetElement.style.left = `${x}px`;
      targetElement.style.top = `${y}px`;
  
      // 次のフレームで再帰的に呼び出し
      requestAnimationFrame(animate);
    }
  
    // 初期位置を設定
    targetElement.style.left = `${startX}px`;
    targetElement.style.top = `${startY}px`;
  
    // アニメーション開始
    animate();
}


// // 使用例: #myDivを (100, 100) から (500, 300) へ、(300, 150) を経由して移動
// const myDiv = document.getElementById('myDiv');
// cartInAnimation(myDiv, 150, 600);
  


// 下のジャンルボタン
const no1 = document.getElementById("no1");
const no2 = document.getElementById("no2");
const no3 = document.getElementById("no3");
const no4 = document.getElementById("no4");

no1.addEventListener("click", () => {
    const texts = document.querySelectorAll(".menu .text");
    texts.forEach(text => {
        text.classList.remove(
            "rampart-one-regular", 
            "dotgothic16-regular", 
            "shippori-antique-regular",
        );
        text.classList.add("rampart-one-regular");
    });
});

no2.addEventListener("click", () => {
    const texts = document.querySelectorAll(".menu .text");
    texts.forEach(text => {
        text.classList.remove(
            "rampart-one-regular", 
            "dotgothic16-regular", 
            "shippori-antique-regular",
        );
        text.classList.add("dotgothic16-regular");
    });
});

no3.addEventListener("click", () => {
    const texts = document.querySelectorAll(".menu .text");
    texts.forEach(text => {
        text.classList.remove(
            "rampart-one-regular", 
            "dotgothic16-regular", 
            "shippori-antique-regular",
        );
        text.classList.add("shippori-antique-regular");
    });
});

