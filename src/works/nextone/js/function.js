$(function () {
    // ここにjQueryを記述

    // ハンバーガーメニュー
    $('#btn').on('click', function () {
        $('#btn__top').toggleClass('rotate-top');
        $('#btn__bottom').toggleClass('rotate-bottom');
        $('#gnav').toggleClass('nav-active');
    });

    // ナビゲーション内アコーディオン
    $('.open__icon').on('click', function () {
        
        $('#open__txtarea').slideToggle(500);
        
        $(this).toggleClass('plus__open');
    });

    // キャッチコピー途中からfixed停止
    let CT = $('#catch__top');
    let CB = $('#catch__bottom');

    let end = $(CB).offset().top;//fixed止める場所の上からの高さ
    let catchHeight = $(CB).height();//catchの高さ

    $(document).on('scroll', function () {
        let scrollTop = $(this).scrollTop();//スクロールした量
        if ((end - catchHeight) < scrollTop) {//fixed止める場所の高さ-catch自身の高さ
            $(CT).addClass('fixed-none');
            $(CB).addClass('fixed-fadeIn');
        } else {
            $(CT).removeClass('fixed-none');
            $(CB).removeClass('fixed-fadeIn');
        }
    });



    // --------------
});