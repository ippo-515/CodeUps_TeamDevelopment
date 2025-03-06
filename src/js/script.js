jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  // ヘッダークラス名付与
  let header = $(".js-header");
  let headerheight = $(".js-header").height();
  let height = $(".js-mv-height").height();
  console.log("ヘッダーの高さ：" + headerheight);
  console.log("メインビューの高さ：" + height);
  console.log(height - headerheight);
  $(window).scroll(function () {
    if ($(this).scrollTop() > height - headerheight) {
      header.addClass("is-color");
    } else {
      header.removeClass("is-color");
    }
  });

  //ドロワーメニュー
  $(".js-hamburger, .js-sp-nav").click(function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      $(".js-hamburger").removeClass("is-active");
      $("body, html").css("overflow", "auto");
      $(".js-header").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
    } else {
      $(".js-hamburger").addClass("is-active");
      $("body, html").css("overflow", "hidden"); // ドロワーを開いたときは後ろがスクロールしないようにする
      $(".js-header").addClass("is-active"); // ロゴとメニューの文字が被らないように背景色を指定
      $(".js-sp-nav").fadeIn(300);
    }
  });

  // 画面幅のサイズが変わったら
  $(window).on("resize", function () {
    // iOSでは縦スクロールすると画面幅が変わったと認識してresizeイベントが作動してしまうので追加
    if (window.matchMedia("(min-width: 768px)").matches) {
      // xマークを三マークにする（.js-hamburgerの要素にクラス名is-activeがあれば削除する）
      // ロゴとメニューの文字が被らないようにした背景色を元に戻す
      $(".js-hamburger, .js-header").removeClass("is-active");

      // .js-sp-navを閉じる（.js-sp-navが表示されていれば非表示にする）
      $(".js-sp-nav").fadeOut(300);
    }
  });

  // スクロールしながらページトップへ戻るボタン
  let topBtn = $(".js-to-top");
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
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
    return false;
  });

  // Contactセクションの右下でボタンが止まる
  $(".js-to-top").hide();
  $(window).on("scroll", function () {
    let documentHeight = $(document).height(); // ドキュメント全体の高さ
    let wHeight = $(window).height(); // ブラウザの表示領域の高さ
    let scrollAmount = $(window).scrollTop(); // スクロールした距離
    let footerHeight = $(".js-footer").innerHeight(); // フッターの高さ(padding含む)
    let browserWidth = window.outerWidth;
    if (documentHeight - (wHeight + scrollAmount) <= footerHeight) {
      // ページトップへ戻るボタンがフッターの直前に来たら、positionプロパティの値をfixedからabsoluteに変更する
      if (browserWidth < 768) {
        $(".js-to-top").css({
          position: "absolute",
          right: 15,
          bottom: footerHeight + 16,
        });
      } else {
        $(".js-to-top").css({
          position: "absolute",
          right: 20,
          bottom: footerHeight + 20,
        });
      }
    } else {
      if (browserWidth < 768) {
        $(".js-to-top").css({
          position: "fixed",
          right: 15,
          bottom: "16px",
        });
      } else {
        $(".js-to-top").css({
          position: "fixed",
          right: 20,
          bottom: "20px",
        });
      }
    }
  });

  // mv用swiper
  const swiper = new Swiper(".js-mv-swiper", {
    slidesPerView: 1, // 1枚ずつ表示
    spaceBetween: 0, // スライド間の隙間をゼロにする
    loop: true, // 無限ループ
    effect: "slide", // スライドエフェクトに変更
    speed: 1000, // スライドの切り替え速度
    autoplay: {
      delay: 3000, // 自動再生の待機時間
      disableOnInteraction: false, // ユーザー操作後も再生を続ける
    },
  });

  // 背景色の後に画像が表示されるエフェクト
  //要素の取得とスピードの設定
  var box = $(".js-colorbox"),
    speed = 700;

  //.js-colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="c-colorbox__color"></div>');
    var color = $(this).find($(".c-colorbox__color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  // アコーディオン
  jQuery(function ($) {
    $(".p-accordion-item__header:nth-child(1)").addClass("is-active-faq");
    $(".p-accordion-item__text:nth-child(2)").css("display", "block");
    $(".p-accordion-item__header").click(function () {
      $(this).next().slideToggle();
      $(this).toggleClass("is-active-faq");
    });

    $(".js-sidebar-open").on("click", function () {
      $(this).next().slideToggle();
      $(this).toggleClass("is-open__a");
    });
  });
  /* --------------------------------------------
   * 　キャンペーンセクション（トップページ）のスライド
   * -------------------------------------------- */
  const swiperCampaignTop = new Swiper(".js-campaign-swiper", {
    loop: true, // ループ
    speed: 3000, // 少しゆっくり(デフォルトは300)
    // centeredSlides: true, // アクティブなスライドを中央にする
    slidesPerView: 1.4, // デフォルトは1枚表示
    spaceBetween: "24px", // スライド間の余白
    autoplay: {
      // 自動再生
      delay: 1000, // 1秒後に次のスライド
      disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    },
    // 前後の矢印
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 3.48, // 768px以上では4枚表示
        spaceBetween: "40px",
      },
    },
  });

  // モーダル
  const open = $(".js-modal-open"),
    modal = $(".js-modal");
  let scrollTop;

  //   スクロールバーの幅を計算する関数
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  //Gallery画像をクリックしたらモーダルを表示する
  open.on("click", function () {
    let imgsrc = $(this).find("img").attr("src");
    $(".c-modal__img").children().attr("src", imgsrc);
    modal.addClass("is-open");

    // スクロールバーの幅を取得
    const scrollbarWidth = getScrollbarWidth();

    // 背景を固定してスクロールさせない
    scrollTop = $(window).scrollTop();

    $("body").css({
      position: "fixed",
      top: -scrollTop,
      left: 0,
      // right: 0,
      width: `calc(100% - ${scrollbarWidth}px)`, // スクロールバーの幅を考慮する
    });
  });

  //モーダルをクリックしたらモーダルを閉じる
  modal.on("click", function () {
    modal.removeClass("is-open");

    // 背景の固定を解除する
    $("body").css({
      position: "",
      top: "",
      left: "",
      // right: '',
      width: "",
    });

    $(window).scrollTop(scrollTop);
  });
  /* --------------------------------------------
   * 　ダイビング情報のタブ切り替え
   * -------------------------------------------- */
  $(document).ready(function () {
    $(".c-diving-information-tab").click(function () {
      // タブのアクティブクラスを切り替え
      $(".c-diving-information-tab").removeClass("active");
      $(this).addClass("active");

      // 画像の切り替え
      $(".p-diving-tab-switching__content").removeClass("active");
      $("#" + $(this).data("target")).addClass("active");
    });
  });

  /* --------------------------------------------
   * 　特定のタブへダイレクトリンクできるようにする
   * -------------------------------------------- */
  // ハッシュからタブを切り替える関数
  // function switchTabFromHash() {
  //   var hash = location.hash;
  //   hash = (hash.match(/^#p-diving-tab-switching__content\d+$/) || [])[0]; // `#p-diving-tab-switching__content+数字` の形式のみ取得

  //   var tabname = hash ? hash.slice(1) : "p-diving-tab-switching__content1"; // デフォルトのタブID

  //   // 対象のタブが存在しない場合はデフォルトタブを表示
  //   if ($(".p-diving-tab-switching__content#" + tabname).length === 0) {
  //       tabname = "p-diving-tab-switching__content1";
  //   }

  //   // タブのアクティブ状態を更新
  //   $(".c-diving-information-tab, .p-diving-tab-switching__content").removeClass("active");

  //   var tabIndex = $(".p-diving-tab-switching__content#" + tabname).index();

  //   $(".p-diving-tab-switching__content").eq(tabIndex).addClass("active");
  //   $(".c-diving-information-tab").eq(tabIndex).addClass("active");

  //   var speed = 500; // スクロールのスピード
  //   var target = $(".p-diving-tab-switching__content").eq(tabIndex); // ターゲットとなる要素を取得
  //   if (target.length) { // ターゲットが存在する場合のみ実行
  //     var position = target.offset().top - 240; // ターゲットの位置を取得
  //     $('html, body').animate({ scrollTop: position }, speed, 'swing'); // スムーズスクロール
  //   }
  // }

  // // 初回ページ読み込み時にハッシュをチェック
  // switchTabFromHash();

  // // ハッシュが変更されたらタブを切り替える
  // $(window).on("hashchange", function () {
  //     switchTabFromHash();
  // });

  // // タブをクリックしたときにハッシュを変更
  // $(".c-diving-information-tab").on("click", function () {
  //     var targetPanelId = $(this).attr("data-target"); // `data-target` からパネルの ID を取得
  //     if (targetPanelId) {
  //         location.hash = targetPanelId; // ハッシュを更新
  //     }
  // });

  // タブを選択する関数を定義
  function selectTab(hash) {
    // すべてのタブコンテンツを非表示に("active"クラスを削除)する
    $('.p-diving-tab-switching__content').removeClass('active');

    // すべてのタブから"active"クラスを削除する
    $('.c-diving-information-tab').removeClass('active');

    // ハッシュに対応するタブに"active"クラスを追加する
    $(hash).addClass('active');

    // ハッシュに対応するタブコンテンツを表示("active"クラスを追加)する
    var tabIndex = $(hash).index();
    $(".p-diving-tab-switching__content").eq(tabIndex).addClass("active");
  }

  // ページがロードされたときにURLのハッシュを取得
  var hash = window.location.hash;

  // ハッシュが存在する場合は、そのタブを選択
  if (hash) {
    selectTab(hash);
  }

  // フッターまたはドロワーメニューのリンクがクリックされたときの処理
  $('.footer-nav__left-detail-link, .sp-nav__left-detail-link').on('click', function (e) {
    // デフォルトのリンク動作をキャンセル
    // e.preventDefault();

    // クリックされたリンクのハッシュを取得
    var targetHash = this.hash;

    // 該当するタブを選択
    selectTab(targetHash);
  });
});
