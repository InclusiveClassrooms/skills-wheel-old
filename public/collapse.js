var sectionIdArr = ["#section-one", "#section-two", "#section-three", "#section-four", "#section-five", "#section-six"];
var headingIdArr = ["#heading-one", "#heading-two", "#heading-three", "#heading-four", "#heading-five", "#heading-six"];

function hiddenToggle(headingId) {
  var section = "#section" + headingId.slice(8);

  if ($(section).hasClass("active")){
    $(".section").removeClass("active");
    $(".section").addClass("collapsed");
    $(".glyphicon").addClass("glyphicon-chevron-down");
    $(".glyphicon").removeClass("glyphicon-chevron-up");
  } else {
    $(section).addClass('active');
    $(section).removeClass('collapsed');
    $(section + " .glyphicon").removeClass("glyphicon-chevron-down");
    $(section + " .glyphicon").addClass("glyphicon-chevron-up");
  }
}

(function expandListener(){
  headingIdArr.forEach(function(sectionId) {
    var section = document.querySelector(sectionId);
    section.addEventListener('click', function() {
      hiddenToggle(sectionId);
    });
  });
})();
