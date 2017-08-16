/* eslint-disable */
if (window.config.ga) {
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

  ga('create', window.config.ga.trackingId, 'auto');

  ga('require', 'cleanUrlTracker');
  ga('require', 'eventTracker');
  ga('require', 'impressionTracker');
  ga('require', 'maxScrollTracker');
  ga('require', 'outboundLinkTracker');
  ga('require', 'pageVisibilityTracker');
  ga('require', 'urlChangeTracker');

  ga('send', 'pageview');
}
