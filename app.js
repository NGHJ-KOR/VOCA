let wordsData = {};
let currentDay = null;

async function loadData() {
  const res = await fetch('words.json');
  wordsData = await res.json();
  initDays();
  showDay(Object.keys(wordsData)[0]);
}

function initDays() {
  const daySelect = document.getElementById('daySelect');
  Object.keys(wordsData).forEach(day => {
    const opt = document.createElement('option');
    opt.value = day; opt.textContent = day;
    daySelect.appendChild(opt);
  });
  daySelect.addEventListener('change', e => showDay(e.target.value));
}

function showDay(day) {
  currentDay = day;
  const list = document.getElementById('wordList');
  list.innerHTML = '';
  wordsData[day].forEach(item => {
    const div = document.createElement('div');
    div.className = 'word';
    div.innerHTML = `<span>${item.eng}</span><span>${item.kor}</span><span class="star">⭐</span>`;
    div.querySelector('.star').addEventListener('click', () => toggleFavorite(item));
    list.appendChild(div);
  });
}

function toggleFavorite(word) {
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favs.find(w => w.eng === word.eng && w.kor === word.kor)) {
    favs = favs.filter(w => !(w.eng === word.eng && w.kor === word.kor));
  } else {
    favs.push(word);
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
}

document.getElementById('search').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  const list = document.getElementById('wordList');
  list.innerHTML = '';
  Object.keys(wordsData).forEach(day => {
    wordsData[day].forEach(item => {
      if (item.eng.toLowerCase().includes(q) || item.kor.includes(q)) {
        const div = document.createElement('div');
        div.className = 'word';
        div.innerHTML = `<span>${item.eng}</span><span>${item.kor}</span><span class="star">⭐</span>`;
        div.querySelector('.star').addEventListener('click', () => toggleFavorite(item));
        list.appendChild(div);
      }
    });
  });
});

loadData();
