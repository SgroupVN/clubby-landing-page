let passHeader = false
let passIntroduction = false
// Start at the top
$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});
// Check when you start scrolling
$(document).on('scroll', function() {
  checkIntroductionScroll();
})
function checkIntroductionScroll() {
  let offset = 0;
  if(screen.width >= 576 && screen.width <= 767.98) {
    offset = 400
  }
  if(screen.width >= 768 && screen.width <= 991.98) {
    offset = 600
  }
  if(screen.width >= 992 && screen.width <= 1199.98) {
    offset = 100
  }
  if(screen.width >= 1200 && screen.width <= 1399.98) {
    offset = 300
  }
  if(screen.width >= 1400 && screen.width <= 1999.98) {
    offset = 500
  }
  if(screen.width >= 2000) {
    offset = 1500
  }
  if ($(this).scrollTop() >= $('#phone').position().top + offset && !passIntroduction) {
    passIntroduction = true
    $("#phone-piece-1").addClass("start-slide-1");
    $("#phone-piece-2").addClass("start-slide-2");
  }
}
$('#back-to-top-button').on('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
})