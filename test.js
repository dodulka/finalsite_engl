document.addEventListener('DOMContentLoaded', () => {
  const user = getUsers().find(u => u.username === getCurrentUser());
  if (!user) {
    location.href = 'login.html';
    return;
  }

  const learned = user.learned || [];
  if (learned.length === 0) {
    alert('Немає вивчених слів');
    location.href = 'learn.html';
    return;
  }

  const wordEn = learned[Math.floor(Math.random() * learned.length)];
  const correct = words.find(w => w.en === wordEn);

  document.getElementById('question').innerText = 'Перекладіть слово: ' + correct.en;
  document.getElementById('testImage').src = correct.img;

  const options = shuffle([
    correct.ua,
    ...getOtherVariants(correct.ua, 3)
  ]);

  const block = document.getElementById('options');
  block.innerHTML = ''; // очистити перед додаванням

  options.forEach(opt => {
    const id = 'id' + Math.random().toString(36).substr(2, 9);
    block.innerHTML += `
      <div>
        <input type="radio" id="${id}" name="answer" value="${opt}" required>
        <label for="${id}">${opt}</label>
      </div>
    `;
  });

  document.getElementById('testForm').addEventListener('submit', e => {
    e.preventDefault();
    const checked = document.querySelector('input[name="answer"]:checked');
    if (!checked) return;
    location.href = 'result.html?correct=' + encodeURIComponent(correct.ua) + '&selected=' + encodeURIComponent(checked.value);
  });
});

function getOtherVariants(correct, n) {
  return shuffle(words.map(w => w.ua).filter(u => u !== correct)).slice(0, n);
}

function shuffle(a) {
  return a.sort(() => Math.random() - 0.5);
}
