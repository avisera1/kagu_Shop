// コンポーネントの動的読み込み
document.addEventListener('DOMContentLoaded', function () {
  loadComponent('header', 'src/components/header.html');
  loadComponent('footer', 'src/components/footer.html');
});

function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);
  if (!element) return;

  fetch(filePath)
    .then(response => response.text())
    .then(html => {
      element.innerHTML = html;
    })
    .catch(error => console.error(`Failed to load ${filePath}:`, error));
}
