// メニュー設定
const menuConfig = {
  items: [
    { label: 'Q&A', id: 'faq' },
    { label: '店紹介', id: 'shop' },
    { label: 'サービス', id: 'services' }
  ]
};

// ハンバーガーボタンクリック時のメニュー切り替え
function toggleHamburgerMenu() {
  const menu = document.getElementById('hamburger-menu');
  const btn = document.querySelector('.hamburger-btn');
  if (menu) {
    menu.classList.toggle('active');
    if (btn) {
      btn.setAttribute('aria-expanded', menu.classList.contains('active'));
    }
  }
}

// メニュー項目クリック時の処理
function handleMenuClick(itemId, itemLabel) {
  console.log('選択されたメニュー:', itemLabel);

  // メニューを自動で閉じる
  const menu = document.getElementById('hamburger-menu');
  if (menu) {
    menu.classList.remove('active');
    const btn = document.querySelector('.hamburger-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', false);
    }
  }

  // メニューアニメーション完了後にスクロール
  setTimeout(function () {
    const target = document.getElementById(itemId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, 300);
}

// DOM 読み込み時の初期化
document.addEventListener('DOMContentLoaded', function () {
  // スタイルの注入
  const style = document.createElement('style');
  style.textContent = `
    /* ハンバーガーボタン */
    .hamburger-btn {
      position: fixed;
      top: 16px;
      left: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      font-size: 20px;
      color: #f4efe6;
      z-index: 1001;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .hamburger-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(212, 175, 55, 0.5);
    }

    /* メニュー */
    #hamburger-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 20%;
      height: 100vh;
      background: linear-gradient(135deg, rgba(18, 16, 14, 0.98) 0%, rgba(30, 26, 20, 0.95) 100%);
      backdrop-filter: blur(8px);
      box-shadow: 2px 0 16px rgba(0, 0, 0, 0.4);
      padding: 80px 0 20px;
      box-sizing: border-box;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1000;
      overflow-y: auto;
      border-right: 1px solid rgba(212, 175, 55, 0.2);
    }

    #hamburger-menu.active {
      transform: translateX(0);
    }

    .menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu-list li {
      display: block;
      padding: 16px 24px;
      font-size: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      cursor: pointer;
      color: #c5b9a8;
      transition: all 0.2s ease;
      font-family: "Noto Serif JP", serif;
      letter-spacing: 0.5px;
    }

    .menu-list li:hover {
      background-color: rgba(212, 175, 55, 0.1);
      color: #d4af37;
      padding-left: 32px;
      border-left: 3px solid #d4af37;
    }

    /* メニューが開いている時にオーバーレイを表示（オプション） */
    .menu-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    .menu-overlay.active {
      display: block;
    }
  `;
  document.head.appendChild(style);

  // ハンバーガーボタンを作成
  const btn = document.createElement('button');
  btn.className = 'hamburger-btn';
  btn.setAttribute('aria-label', 'メニューを開閉');
  btn.setAttribute('aria-controls', 'hamburger-menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '☰';
  btn.onclick = toggleHamburgerMenu;

  // メニューコンテナを作成
  const menu = document.createElement('nav');
  menu.id = 'hamburger-menu';

  // メニュー一覧を生成
  const list = document.createElement('ul');
  list.className = 'menu-list';

  menuConfig.items.forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item.label;
    li.onclick = function (e) {
      e.stopPropagation();
      handleMenuClick(item.id, item.label);
    };
    list.appendChild(li);
  });

  menu.appendChild(list);

  // オーバーレイを作成（メニュー外をクリックで閉じる用）
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.onclick = function () {
    const m = document.getElementById('hamburger-menu');
    if (m) {
      m.classList.remove('active');
      overlay.classList.remove('active');
      const b = document.querySelector('.hamburger-btn');
      if (b) {
        b.setAttribute('aria-expanded', false);
      }
    }
  };

  // ボタンとメニューを body に追加
  document.body.insertBefore(btn, document.body.firstChild);
  document.body.appendChild(menu);
  document.body.appendChild(overlay);

  // メニューが開いたときにオーバーレイも表示
  const observer = new MutationObserver(function () {
    const m = document.getElementById('hamburger-menu');
    const o = document.querySelector('.menu-overlay');
    if (m && o) {
      if (m.classList.contains('active')) {
        o.classList.add('active');
      } else {
        o.classList.remove('active');
      }
    }
  });

  const m = document.getElementById('hamburger-menu');
  if (m) {
    observer.observe(m, { attributes: true, attributeFilter: ['class'] });
  }
});
