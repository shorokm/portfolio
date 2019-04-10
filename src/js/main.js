jQuery(document).ready(function () {
  jQuery('.icon').click(function() {
    jQuery('.mobile-overlay').toggleClass('mobile-overlay-show');
    jQuery('.fa-bars').toggleClass('fa-times');
    if (jQuery('.mobile-overlay').hasClass('mobile-overlay-show')) {
      jQuery('.fa-bars').addClass('openclass')
    } else {
      jQuery('.fa-bars').removeClass('openclass');
    }
  });
});