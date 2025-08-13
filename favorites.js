function loadFavorites() {
  const list = document.getElementById('favoritesList');
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  list.innerHTML = '';
  favs.forEach(item => {
    const div = document.createElement('div');
    div.className = 'word';
    div.innerHTML = `<span>${item.eng}</span><span>${item.kor}</span><span class="star">❌</span>`;
    div.querySelector('.star').addEventListener('click', () => {
      removeFavorite(item);
      loadFavorites();
    });
    list.appendChild(div);
  });
}

function removeFavorite(word) {
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  favs = favs.filter(w => !(w.eng === word.eng && w.kor === word.kor));
  localStorage.setItem('favorites', JSON.stringify(favs));
}

loadFavorites();
