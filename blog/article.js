(function () {
  var analytics = window.IXAnalytics || { trackInteraction: function () {} };
  var progressBar = document.querySelector('.reading-progress span');
  var article = document.querySelector('#article-content');
  var copyButton = document.querySelector('.copy-link');

  function updateReadingProgress() {
    if (!progressBar || !article) return;

    var articleStart = article.getBoundingClientRect().top + window.scrollY;
    var readableDistance = article.offsetHeight - window.innerHeight;
    var progress = readableDistance > 0
      ? (window.scrollY - articleStart) / readableDistance
      : 0;

    progress = Math.min(1, Math.max(0, progress));
    progressBar.style.transform = 'scaleX(' + progress + ')';
  }

  var progressFrame;
  window.addEventListener('scroll', function () {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(function () {
      updateReadingProgress();
      progressFrame = null;
    });
  }, { passive: true });

  window.addEventListener('resize', updateReadingProgress);
  updateReadingProgress();

  if (copyButton) {
    copyButton.addEventListener('click', function () {
      var label = copyButton.querySelector('span');

      if (!navigator.clipboard || !label) return;

      navigator.clipboard.writeText(window.location.href).then(function () {
        var articleName = document.body.getAttribute('data-analytics-content-name') || 'article';
        analytics.trackInteraction('share', 'article_' + articleName + '_copy_link', {
          interaction_label: 'Copy article link',
          interaction_category: 'share',
          interaction_context: articleName,
          interaction_location: 'article_header',
          interaction_action: 'copy',
          method: 'copy_link',
          content_type: 'article',
          item_id: articleName
        });
        label.textContent = 'Link copied';
        window.setTimeout(function () {
          label.textContent = 'Copy article link';
        }, 1800);
      }).catch(function () {
        label.textContent = 'Copy failed';
        window.setTimeout(function () {
          label.textContent = 'Copy article link';
        }, 1800);
      });
    });
  }
})();
