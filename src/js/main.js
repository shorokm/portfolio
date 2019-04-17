jQuery(document).ready(function () {
  jQuery('.icon').click(function() {
    jQuery('.mobile-overlay').toggleClass('mobile-overlay-show');
    // jQuery('.fa-bars').toggleClass('fa-times');
    if (jQuery('.mobile-overlay').hasClass('mobile-overlay-show')) {
      jQuery('.fa-bars').toggleClass('fa-times');
    } else {
      jQuery('.fa-bars').toggleClass('fa-times');
    }
  });
 
  //make hamburger-menu-"page" invicible when clicking on a menu options (mobile version)
  jQuery('.menu-options').click(function() {
    jQuery('.mobile-overlay').toggleClass('mobile-overlay-show');
    jQuery('.fa-bars').toggleClass('fa-times');
  });
});