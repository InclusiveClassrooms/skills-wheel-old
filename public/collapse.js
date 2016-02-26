var sectionIdArr = ["#section-one", "#section-two", "#section-three", "#section-four", "#section-five", "#section-six"];

function hiddenToggle(sectionId) {
  $(".section").removeClass("active");
  $(".section").addClass("collapsed");
  $(sectionId).addClass('active');
  $(sectionId).removeClass('collapsed');

  $(".glyphicon").addClass("glyphicon-chevron-down");
  $(".glyphicon").removeClass("glyphicon-chevron-up");
  $("#"+sectionId.slice(1)+" .glyphicon").removeClass("glyphicon-chevron-down");
  $("#"+sectionId.slice(1)+" .glyphicon").addClass("glyphicon-chevron-up");
}

sectionIdArr.forEach(function(sectionId) {
  var section = document.querySelector(sectionId);
  section.addEventListener('click', function() {
    hiddenToggle(sectionId);
  });
});
