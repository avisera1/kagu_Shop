function toggleMenu(){
  document.getElementById('menu').classList.toggle('active');
}

// メニュー一覧の項目（横書きで一個ずつ表示）
const menuItems = ['苗', '家具', 'Q&A', '店紹介', 'サービス'];

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('menu');
  if (!menu) return;

  // メニュータブを左半分に表示するためのスタイルを動的に追加
  const style = document.createElement('style');
  style.textContent = `
    #menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 50%;
      height: 100vh;
      background-color: #ffffff;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
      padding: 60px 20px 20px;
      box-sizing: border-box;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      writing-mode: horizontal-tb; /* 横書き */
      z-index: 999;
    }
    #menu.active {
      transform: translateX(0);
    }
    #menu ul.menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    #menu ul.menu-list li {
      display: block;            /* 一個ずつ縦に並べる */
      writing-mode: horizontal-tb; /* 文字は横書き */
      padding: 16px 12px;
      font-size: 18px;
      border-bottom: 1px solid #eeeeee;
      cursor: pointer;
      color: #333333;
      transition: background-color 0.2s ease;
    }
    #menu ul.menu-list li:hover {
      background-color: #f5f5f5;
    }
  `;
  document.head.appendChild(style);

  // 既に同じリストがある場合は重複作成しない
  if (menu.querySelector('ul.menu-list')) return;

  // メニュー一覧を生成
  const list = document.createElement('ul');
  list.className = 'menu-list';

  menuItems.forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', function () {
      // クリック時の処理（必要に応じて遷移先などを追加してください）
      console.log('選択されたメニュー: ' + item);
    });
    list.appendChild(li);
  });

  menu.appendChild(list);
});
