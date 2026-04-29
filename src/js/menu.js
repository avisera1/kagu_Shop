function toggleMenu(){
  document.getElementById('menu').classList.toggle('active');
}

// メニュー一覧の項目（横書きで一個ずつ表示）
const menuItems = ['苗', '家具', 'Q&A', '店紹介', 'サービス'];

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('menu');
  if (!menu) return;


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
