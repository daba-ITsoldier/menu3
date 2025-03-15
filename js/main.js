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



// カートの位置　定数    ********************************************
const cartButton = document.querySelector(".cart-btn");
const cartCoordinate = cartButton.getBoundingClientRect();
const cartIn = document.querySelector(".cart-in-animation");
let isAnimating = false;

// カートインアニメーション用
const cartInImg = document.querySelector(".cart-in-animation > img");

// カートの位置補正用
const mainCoodinate = document.querySelector(".main").getBoundingClientRect();


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
    // メニュー全体  li
    const li = document.createElement("li");
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    // メニュー画像  img
    const image = document.createElement("img");
    image.classList.add("image");
    image.src = array.img;
    // メニュー名   span     (ここをクリックしてカートに追加＋カートアニメーション)
    const text = document.createElement("span");
    text.classList.add("text", "shippori-antique-regular");
    text.textContent = `${array.name}`;
    // text.style.userSelect = "none";

    // メニュー値段  span
    const priceBox = document.createElement("div");
    priceBox.classList.add("price-box");
    const price = document.createElement("span");
    price.classList.add("price", "font");
    price.textContent = `${array.price}`;
    const en = document.createElement("span");
    en.classList.add("en", "font");
    en.textContent = "円";
    // カートインアニメーション
    text.addEventListener("click", () => {
        const rect = text.getBoundingClientRect();
        const centerX = Math.round(rect.left + window.pageXOffset) - 25;
        const centerY = Math.round(rect.top + window.pageYOffset) + 75;
        const cartRect = cartButton.getBoundingClientRect();
        const endX = Math.round(cartRect.left + window.pageXOffset);
        const endY = Math.round(cartRect.top + window.pageYOffset) + 16;

        cartInAnimation(cartIn, centerX, centerY, cartButton, endX, endY);
    });
    

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


// カートインアニメーション
async function cartInAnimation(startElement, x, y, endElement, eX, eY) {
    const backX = x - 40; // X方向の逆方向移動位置

    startElement.style.zIndex = 15;
    startElement.classList.add("fade-in");
    // 2つ目の動き: 目的の高さまで移動
    await moveElement(startElement, x, y, x, eY, 400);
    startElement.style.width = "40px";
    startElement.style.height = "40px";
    cartInImg.style.width = "40px";
    cartInImg.style.height = "40px";

    // 3つ目の動き: 逆方向（右へ少し移動）
    await moveElement(startElement, x, eY, backX, eY, 150);

    startElement.classList.remove("fade-in");
    startElement.classList.add("fade-out");
    // 4つ目の動き: 目的のX座標まで移動
    await moveElement(startElement, backX, eY, eX, eY, 300);
    await waitAction(startElement, -10, 150, 300);
    cartInImg.style.width = "150px";
    cartInImg.style.height = "300px";

    startElement.classList.remove("fade-out");

    // カートを揺らす
    await shakeAnimation(endElement, 1000);
}

function waitAction(element, zIndex, width, height) {
    element.style.zIndex = zIndex;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
}

function moveElement(element, startX, startY, endX, endY, duration = 1000) {
    return new Promise((resolve) => {
        let startTime = null;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            let elapsed = currentTime - startTime;
            let progress = Math.min(elapsed / duration, 1);

            let easedProgress = easeInOutQuad(progress);
            let newX = startX + (endX - startX) * easedProgress;
            let newY = startY + (endY - startY) * easedProgress;

            element.style.transform = `translate(${newX}px, ${newY}px)`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve(); // アニメーション終了後に次の処理へ
            }
        }

        requestAnimationFrame(animate);
    });
}


// カートが揺れるアニメーション
function shakeAnimation(element, duration) {
    if (isAnimating) return;
    isAnimating = true;

    let startTime = null;
    let currentMax = 30; // 開始値を30に固定
    let direction = 1;

    function easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    }

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1); // 0 ～ 1 の間

        let easedProgress = easeOutQuad(progress);
        let angle = currentMax * (1 - easedProgress) * direction;
        element.style.transform = `rotate(${angle}deg)`;

        // 100msごとにプラスマイナスを切り替え
        direction = Math.round(elapsed / 100) % 2 === 0 ? 1 : -1;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.transform = `rotate(0deg)`;
            isAnimating = false;
        }
    }

    requestAnimationFrame(animate);
}

// .main は position:relative なので、それの座標を調べるための関数
function getAbsolutePosition(element) {
    let x = 0, y = 0;
    while (element) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return { x, y };
}


// *****************************************************

  


// 下のジャンルボタン
const BG = document.querySelector(".BG");
const no9 = document.getElementById("no9");
const no10 = document.getElementById("no10");
const no11 = document.getElementById("no11");

const buttons = [
    { id: "no1", top: 0, left: -10 },
    // { id: "no2", top: -10, left: 0 },
    // { id: "no3", top: 10, left: 0 },
    { id: "no4", top: 0, left: 10 },
    { id: "no5", top: 0, left: -1 },
    // { id: "no6", top: -1, left: 0 },
    // { id: "no7", top: 1, left: 0 },
    { id: "no8", top: 0, left: 1 }
];

let topValue = 50; // 初期位置を50%に設定
let leftValue = 50;
let scale = 320;


no10.addEventListener("click", () => {
    scale += 10;
    if(scale > 500) { scale = 500; }
    updateBackgroundSize();
});

no11.addEventListener("click", () => {
    scale -= 10;
    if(scale < 330) { scale = 330; }
    updateBackgroundSize();
});

function updateBackgroundSize() {
    BG.style.backgroundSize = `${scale}%`;
    console.log(`scale: ${scale}`);
}

// 各ボタンにイベントリスナーを追加
buttons.forEach(({ id, top, left }) => {
    const element = document.getElementById(id);
    if (element) { // 要素が存在する場合のみ処理
        element.addEventListener("click", () => {
            topValue += top;
            leftValue += left;
            
            // 背景の範囲を超えないように制限
            topValue = Math.max(0, Math.min(100, topValue));
            leftValue = Math.max(0, Math.min(100, leftValue));

            BG.style.backgroundPosition = `${leftValue}% ${topValue}%`;
            console.log(`Moved to: ${leftValue}% ${topValue}%`);
        });
    } else {
        console.error(`Element with ID '${id}' not found.`);
    }
});


no9.addEventListener("click", () => {
    topValue = 50;
    leftValue = 50;
    BG.style.backgroundPosition = `${leftValue}% ${topValue}%`;
});