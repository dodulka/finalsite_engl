const words = [
  { en: 'apple', ua: 'яблуко', img: 'images/apple_img.jpg' },
  { en: 'book', ua: 'книга', img: 'images/book_img.jpg' },
  { en: 'car', ua: 'автомобіль', img: 'images/car_img.jpg' },
  { en: 'dog', ua: 'собака', img: 'images/dog_img.jpg' },
  { en: 'fire', ua: 'вогонь', img: 'images/fire_img.jpg' },
  { en: 'home', ua: 'дім', img: 'images/house_img.jpg' },
  { en: 'milk', ua: 'молоко', img: 'images/milk_img.jpg' },
  { en: 'sky', ua: 'небо', img: 'images/sky_img.jpg' },
  { en: 'sun', ua: 'сонце', img: 'images/sun_img.jpg' },
  { en: 'water', ua: 'вода', img: 'images/water_img.jpg' }
];

function getRandomWord() {
  const user = getUsers().find(u => u.username === getCurrentUser());
  const learned = user.learned || [];
  const left = words.filter(w => !learned.includes(w.en));
  if (left.length === 0) {
    alert('Усі слова вивчені');
    return { en: '-', ua: '-', img: '' };
  }
  return left[Math.floor(Math.random() * left.length)];
}

function markLearned(word) {
  const users = getUsers();
  const user = users.find(u => u.username === getCurrentUser());
  if (!user.learned.includes(word.en)) {
    user.learned.push(word.en);
  }
  saveUsers(users);
}
