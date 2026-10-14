// Coin flip light rays
(function () {
  var g = document.getElementById('rays');
  if (!g) return;
  var ns = 'http://www.w3.org/2000/svg';
  for (var i = 0; i < 12; i++) {
    var p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M0 0 L-24 -330 L24 -330 Z');
    p.setAttribute('fill', '#FFE9A8');
    p.setAttribute('transform', 'rotate(' + i * 30 + ')');
    g.appendChild(p);
  }
})();

// VIP ring fills in on load
window.addEventListener('load', function () {
  var bar = document.querySelector('.ring-bar');
  if (bar) setTimeout(function () { bar.setAttribute('stroke-dasharray', '179 352'); }, 300);
});

// Claim rakeback
(function () {
  var btn = document.getElementById('claim');
  if (!btn) return;
  btn.addEventListener('click', function () {
    if (btn.classList.contains('done')) return;
    btn.classList.add('done');
    btn.textContent = 'Claimed';
    document.getElementById('rb-amount').textContent = '$0.00';
    document.getElementById('rb-i').textContent = '$0.00';
    document.getElementById('rb-d').textContent = '$0.00';
    document.getElementById('rb-ready').textContent = 'All claimed';
    var bal = document.getElementById('balance');
    bal.textContent = '1,300.21';
  });
})();

// Race countdown
(function () {
  var el = document.getElementById('race-timer');
  if (!el) return;
  var left = ((3 * 24 + 14) * 60 + 22) * 60;
  function tick() {
    left = Math.max(0, left - 1);
    var d = Math.floor(left / 86400), h = Math.floor(left % 86400 / 3600), m = Math.floor(left % 3600 / 60), s = left % 60;
    el.textContent = d + 'd ' + h + 'h ' + m + 'm ' + String(s).padStart(2, '0') + 's';
  }
  tick(); setInterval(tick, 1000);
})();

// Players counter wiggles
(function () {
  var el = document.getElementById('cf-players');
  if (!el) return;
  var n = 1204;
  setInterval(function () {
    n = Math.max(1100, n + Math.round((Math.random() - 0.45) * 12));
    el.textContent = n.toLocaleString('en-US');
  }, 2500);
})();

// Live wins feed
(function () {
  var feed = document.getElementById('feed');
  if (!feed) return;
  var games = [
    ['slot-lebandit.jpg', 'Le Bandit'], ['dice.jpg', 'Dice'], ['slot-wanteddeadorawild.jpg', 'Wanted Dead or a Wild'],
    ['mines.jpg', 'Mines'], ['slot-handofanubis.jpg', 'Hand of Anubis'], ['crash.jpg', 'Crash'],
    ['slot-densho.jpg', 'Densho'], ['slot-chaoscrew.jpg', 'Chaos Crew'], ['slot-ripcity.jpg', 'RIP City'], ['slot-zezeus.jpg', 'Ze Zeus']
  ];
  var users = ['gla', 'drb', 'haz', 'har', 'pet', 'xen', 'oli', 'ree', 'luc', 'tig', 'zen', 'kir', 'mar', 'jov', 'uro'];
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function row(initial) {
    var g = pick(games);
    var bet = [0.5, 1, 2, 5, 10, 20, 25, 50][Math.floor(Math.random() * 8)];
    var big = Math.random() < 0.18;
    var mult = big ? (40 + Math.random() * 460) : (1.1 + Math.random() * 6);
    var win = bet * mult;
    var el = document.createElement('div');
    el.className = 'feed-row';
    if (initial) el.style.animation = 'none';
    el.innerHTML =
      '<img src="assets/' + g[0] + '" alt="">' +
      '<div class="g"><div></div><div></div></div>' +
      '<span class="amt"></span>';
    el.querySelector('.g div:first-child').textContent = g[1];
    el.querySelector('.g div:last-child').textContent = pick(users) + '*** · ' + mult.toFixed(2) + '×';
    var amt = el.querySelector('.amt');
    amt.textContent = '+$' + win.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    amt.style.color = big ? '#F5C451' : '#2BD67B';
    return el;
  }
  for (var i = 0; i < 4; i++) feed.appendChild(row(true));
  setInterval(function () {
    feed.insertBefore(row(false), feed.firstChild);
    while (feed.children.length > 4) feed.removeChild(feed.lastChild);
  }, 2800);
})();
