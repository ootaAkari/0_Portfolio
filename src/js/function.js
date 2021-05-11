'use strict';

//---ここから実行 関数呼び出し---------------------------------------

export function onload() {
    window.onload = () => {
        //CSSアニメーション
        openingAnimation();
        //フェードイン
        fadeInBase('.e-item', 'fade-in');
        fadeInBase('.e-ttl', 'fade-in-ttl');
        slideInBase();
        //モーダルウィンドウ
        clickModalWindow();
        //スムーススクロール
        clickSmoothScroll();
        //レスポンシブ対応
        checkBreakPoint(mql);
    };
}


//ブレークポイントで処理を切り替えてレスポンシブ対応
export function change() {
    mql.addEventListener('change', (e) => {
        e.stopPropagation();
        checkBreakPoint(mql);
    }, false);

}
// --------------------------------------------------------------------------------------

// 変数定義・初期化
let body;
let myOffset;
const button = document.getElementById('btn');
const headerWrap = document.getElementById('header__wrap');
const header = document.getElementById('header')
const buttonLines = button.children;
const gnavLink = header.getElementsByClassName('gnav__link');

// レスポンシブ対応(BreakPoint = 1025px)
const mql = window.matchMedia('screen and (max-width: 1025px)');


//matchMediaを使用したレスポンシブ対応の処理振り分け------------------
function checkBreakPoint(mql) {

    // ここからIntersectionObserver(ヘッダー内文字色変更)------------
    //1025px以上：対象を監視する
    //1025px未満：監視を停止する

    const options = {
        root: null,
        rootMargin: '0px 0px -40%',
        threshold: 0.1
    };

    const changeCObserver = new IntersectionObserver(changeC, options);
    const resetCObserver = new IntersectionObserver(resetC, options);

    const targets = document.querySelectorAll('section, #top');

    function IntersectionObserverStart() {
        targets.forEach(target => changeCObserver.observe(target));
    }

    function IntersectionObserverReset() {
        targets.forEach(target => {
            resetCObserver.observe(target);
        });
    }

    function changeC(entries, observer) {
        entries.forEach(entry => {
            let element = entry.target;
            if (!mql.matches) {
                if (entry.isIntersecting) {
                    addClassChangeColor(entry.target);
                }
            } else {
                observer.unobserve(element);
            }
        });
    };

    function resetC(entries, observer) {
        entries.forEach(entry => {
            let element = entry.target;
            if (mql.matches) {
                baseChangeColor(entry.target);
                observer.unobserve(element);
            }
        });
    };

    let header = document.querySelector('#header');
    let footer = document.querySelector('#smalls');
    let navLink = document.querySelectorAll('.gnav__link');

    function addClassChangeColor(element) {

        let elementBg = element.classList.contains('bg-b');

        if (elementBg === true) {
            header.classList.add('change-b');
            footer.classList.add('change-c');
            navLink.forEach(NV => {
                NV.classList.add('change-c');
            });
        } else {
            header.classList.remove('change-b');
            footer.classList.remove('change-c');
            navLink.forEach(NV => {
                NV.classList.remove('change-c');
            });
        }
    };

    function baseChangeColor() {
        header.classList.remove('change-b');
        footer.classList.remove('change-c');
        navLink.forEach(NV => {
            NV.classList.remove('change-c');
        });
    }
    //IntersectionObserver記述終わり-------------------------------------------------

    //1025px以上の処理
    //1025px未満時の処理をすべて削除し、新たにイベントを充てる
    if (!mql.matches) {

        IntersectionObserverStart();

        button.removeEventListener('click', buttonClickEventMb, false);

        //ナビゲーションリンククリックイベント
        for (let i = 0; i < gnavLink.length; i++) {
            $(gnavLink[i]).off('click');
            $(gnavLink[i]).on('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let targetHref = gnavLink[i].getAttribute('href');

                let targetElement = document.getElementById(targetHref.replace('#', ''));

                let targetRect = targetElement.getBoundingClientRect().top;

                myOffset = window.pageYOffset;

                let target = targetRect + myOffset;

                if (!mql.matches) {
                    window.scrollTo({
                        top: target,
                        behavior: 'smooth',
                    });
                }
            });
        }

        //1025px未満の処理
        //1025px以上の処理を全て削除・停止し、新たにイベントを充てる
    } else {
        IntersectionObserverReset();
        for (let i = 0; i < gnavLink.length; i++) {
            $(gnavLink[i]).off('click');
        }
        button.addEventListener('click', buttonClickEventMb, false);
    }
    return false;
}
// matchMediaを使用したレスポンシブ対応処理の記述終了----------------

//以下レスポンシブ対応処理の中で使用する関数-------------------------

//clickイベントに渡す関数（1025px未満)
//ハンバーガーメニュー開閉+ナビゲーションリンククリック
function buttonClickEventMb(e) {

    e.stopPropagation();
    body = document.body;

    //ハンバーガーメニュー開閉
    if (!body.classList.contains('fixed-b')) {

        myOffset = window.pageYOffset;

        $('body').addClass('fixed-b').css({
            'top': myOffset * -1
        });

        headerWrap.classList.add('btn-slide');
        header.classList.add('gnv-bg');
        buttonLines[0].classList.add('btn-top');
        buttonLines[1].classList.add('btn-bottom');

    } else if (body.classList.contains('fixed-b')) {

        $('body').removeClass('fixed-b');
        headerWrap.classList.remove('btn-slide');
        header.classList.remove('gnv-bg');
        buttonLines[0].classList.remove('btn-top');
        buttonLines[1].classList.remove('btn-bottom');

        window.scrollTo(0, myOffset);

    }
    //ナビゲーションリンククリック
    for (let i = 0; i < gnavLink.length; i++) {

        $(gnavLink[i]).off('click');
        $(gnavLink[i]).on('click', function () {

            e.preventDefault();

            let targetHref = gnavLink[i].getAttribute('href');
            let targetElement = document.getElementById(targetHref.replace('#', ''));
            let targetRect = targetElement.getBoundingClientRect().top;
            let target = targetRect + myOffset;
            let headerHight = header.clientHeight;

            $('body').removeClass('fixed-b');

            headerWrap.classList.remove('btn-slide');
            header.classList.remove('gnv-bg');
            buttonLines[0].classList.remove('btn-top');
            buttonLines[1].classList.remove('btn-bottom');

            window.scrollTo({
                top: target - headerHight,
            });

            return false;
        });
    }
    return false;
}
// レスポンシブ対応処理の中で呼び出す関数記述終了----------------------

// 以下読み込み時に呼び出す関数--------------------------------------

//全サイズ共通 : フェードイン
function fadeInBase(items, action) {
    
    const options = {
        root: null,
        rootMargin: '-20% 0%',
        threshold: null
    };

    const fadeInObserver = new IntersectionObserver(fadeIn, options);

    const targets = document.querySelectorAll(items);
    targets.forEach(target => fadeInObserver.observe(target));

    function fadeIn(entries, observer) {
        entries.forEach(entry => {
            let element = entry.target;
            if (entry.isIntersecting) {
                element.classList.add(action);
                observer.unobserve(element);
            };
        });
    };
}


//全サイズ共通 : Worksのスライドイン
function slideInBase() {

    const options = {
        root: null,
        rootMargin: '-20% 0%',
        threshold: null
    };

    const slideInObserverAhead = new IntersectionObserver(slideInAhead, options);
    const slideInObserverRear = new IntersectionObserver(slideInRear, options);

    const targetsWrap = document.getElementById('modal');

    let targets = [...targetsWrap.children];
    let targetsOdd = [];
    let targetsEven = [];

    for (let i = 0; i < targets.length; i++) {

        // 子要素奇数個目(インデックスが偶数or0)
        if (i % 2 == 0 || i == 0) {
            targetsOdd.push(targets[i]);

            // 子要素偶数個目
        } else {
            targetsEven.push(targets[i]);
        }
    };

    // 奇数個目のターゲットを監視開始
    targetsOdd.forEach(targetOdd => slideInObserverAhead.observe(targetOdd));
    //偶数個目のターゲットを監視開始
    targetsEven.forEach(targetEven => slideInObserverRear.observe(targetEven));

    //第１引数(先にスライドイン)
    function slideInAhead(entries, observer) {
        entries.forEach(entry => {
            let element = entry.target;

            if (entry.isIntersecting) {
                element.classList.add('slide-in');
                observer.unobserve(element);
            };
        });
    };

    //第１引数(後からスライドイン)
    function slideInRear(entries, observer) {
        entries.forEach(entry => {
            let element = entry.target;

            if (entry.isIntersecting) {
                setTimeout(function () {
                    element.classList.add('slide-in');
                    observer.unobserve(element);
                }, 200);

            };
        });
    };
    return false;
};



// ここからjQueryのみの記述
//変数
const BD = $('body');
const HTBD = $('html, body');
const LG = $('#logo');

//全サイズ共通：オープニングアニメーション終了後
function openingAnimation() {
    BD.delay(1200).queue(function () {
        $(this).addClass('op-static');
    });
    LG.delay(2650).queue(function () {
        $(this).addClass('op-logo-op');
    });
    $('#opening').delay(2900).queue(function () {
        $(this).addClass('op-none');
    });
    $('.opening__wrap').delay(2900).queue(function () {
        $(this).addClass('op-none');
    });
};

//全サイズ共通 : トップに戻るスムーススクロール
function clickSmoothScroll() {
    let speed = 1000;
    LG.on('click', '.header__link', function (e) {
        HTBD.animate({
            scrollTop: 0
        }, speed, 'swing');
        e.stopPropagation();
    });
};

// 全サイズ共通 : モーダルウィンドウクリック+背景固定
function clickModalWindow() {
    $('#modal').on('click', '.works__pic', function (e) {

        let modal = $(this).data('modal');
        let scrollPos = $(window).scrollTop();
        let modalPos;

        BD.addClass('fixed-b').css({
            top: -scrollPos
        });

        $(modal).fadeIn(400, function () {
            $(this).off('click');
            $(this).on('click', function (e) {
                $(this).fadeOut(400);

                modalPos = $(modal).scrollTop();
                if (modalPos > 0) {
                    setTimeout(function () {
                        $(modal).scrollTop(0);
                        console.log('初期化!')
                    }, 400);
                }
                BD.removeClass('fixed-b');
                $(window).scrollTop(scrollPos);
                e.stopPropagation();
            });
        });
    });
};
