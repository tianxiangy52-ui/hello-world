/* Hello World · MasterD — minimal runtime checks */

(function () {
  'use strict';

  // live clock
  var clock = document.getElementById('clock');
  function tick() {
    var d = new Date();
    var p = function (n) { return String(n).padStart(2, '0'); };
    clock.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }
  tick();
  setInterval(tick, 1000);

  // ping check — verifies the page is served and JS runs
  var btn = document.getElementById('pingBtn');
  var stat = document.getElementById('stat');

  btn.addEventListener('click', function () {
    var t0 = performance.now();
    stat.classList.remove('ok');
    stat.textContent = '检查中…';

    fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
      .then(function (res) {
        var ms = Math.round(performance.now() - t0);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        stat.classList.add('ok');
        stat.textContent = '● 站点运行中 · HTTP ' + res.status + ' · ' + ms + 'ms · ' + window.location.host;
      })
      .catch(function (err) {
        stat.textContent = '× 检查失败：' + err.message;
      });
  });

  // subtle parallax on the glow
  var glow = document.querySelector('.glow');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (glow && !reduce) {
    window.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 30;
      var y = (e.clientY / window.innerHeight - 0.5) * 20;
      glow.style.transform = 'translateX(-50%) translate(' + x + 'px,' + y + 'px)';
    }, { passive: true });
  }
})();
