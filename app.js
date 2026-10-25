// Fiszki z cytatami: zgadnij autora. Znane nie wracają, stan w localStorage.
(function () {
  'use strict';
  var KEY = 'cytaty-v1';
  var QUOTES = [
    ['Być albo nie być — oto jest pytanie.', 'William Szekspir'],
    ['Wiem, że nic nie wiem.', 'Sokrates'],
    ['Myślę, więc jestem.', 'Kartezjusz'],
    ['Człowiek jest miarą wszechrzeczy.', 'Protagoras'],
    ['Nie ma drogi na skróty do żadnego miejsca, do którego warto pójść.', 'Beverly Sills'],
    ['Cierpliwość jest gorzka, ale jej owoc słodki.', 'Arystoteles'],
    ['Kto nie zna historii, skazany jest na jej powtarzanie.', 'George Santayana'],
    ['Wyobraźnia jest ważniejsza od wiedzy.', 'Albert Einstein'],
    ['Mierz siły na zamiary, nie zamiar podług sił.', 'Adam Mickiewicz'],
    ['Trzeba z żywymi naprzód iść, po życie sięgać nowe.', 'Adam Asnyk']
  ];
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (Array.isArray(s)) return s;
    } catch (e) {}
    return [];
  }
  var known = load();
  var cur = -1;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(known)); } catch (e) {} }
  function remaining() {
    return QUOTES.map(function (_, i) { return i; })
      .filter(function (i) { return known.indexOf(i) === -1; });
  }
  function progress() {
    document.getElementById('bar').style.width = (known.length / QUOTES.length * 100) + '%';
    document.getElementById('prog').textContent =
      known.length === QUOTES.length ? 'Znasz wszystkie! 🎉' :
      'Opanowane: ' + known.length + ' / ' + QUOTES.length;
  }
  function next() {
    var rem = remaining();
    var quote = document.getElementById('quote');
    var author = document.getElementById('author');
    if (!rem.length) {
      quote.textContent = 'Koniec talii.';
      author.textContent = 'Znasz wszystkie cytaty. Odśwież, by powtórzyć.';
      document.getElementById('show').hidden = true;
      document.getElementById('grade').hidden = true;
      progress(); return;
    }
    cur = rem[Math.floor(Math.random() * rem.length)];
    quote.textContent = '„' + QUOTES[cur][0] + '”';
    author.textContent = '';
    document.getElementById('show').hidden = false;
    document.getElementById('grade').hidden = true;
    progress();
  }
  document.getElementById('show').addEventListener('click', function () {
    document.getElementById('author').textContent = '— ' + QUOTES[cur][1];
    document.getElementById('show').hidden = true;
    document.getElementById('grade').hidden = false;
  });
  document.getElementById('know').addEventListener('click', function () {
    if (known.indexOf(cur) === -1) known.push(cur);
    save(); next();
  });
  document.getElementById('dont').addEventListener('click', function () { next(); });
  next();
})();
