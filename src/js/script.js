
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // スクロールしながらページトップへ戻るボタン
  let topBtn = $('.js-to-top');
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  // Contactセクションの右下でボタンが止まる
  $('.js-to-top').hide();
  $(window).on('scroll', function () {
    let documentHeight = $(document).height(); // ドキュメント全体の高さ
    let wHeight = $(window).height(); // ブラウザの表示領域の高さ
    let scrollAmount = $(window).scrollTop(); // スクロールした距離
    let footerHeight = $('.js-footer').innerHeight(); // フッターの高さ(padding含む)
    let browserWidth = window.outerWidth;
    if (documentHeight - (wHeight + scrollAmount) <= footerHeight) {
      // ページトップへ戻るボタンがフッターの直前に来たら、positionプロパティの値をfixedからabsoluteに変更する
      if (browserWidth < 768) {
        $('.js-to-top').css({
          position: 'absolute',
          right: 15,
          bottom: footerHeight + 16
        });
      } else {
        $('.js-to-top').css({
          position: 'absolute',
          right: 20,
          bottom: footerHeight + 20
        });
      }
    } else {
      if (browserWidth < 768) {
        $('.js-to-top').css({
          position: 'fixed',
          right: 15,
          bottom: '16px'
        });
      } else {
        $('.js-to-top').css({
          position: 'fixed',
          right: 20,
          bottom: '20px'
        });
      }
    }
  });

});
