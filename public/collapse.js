var sectionIdArr = ["#section-one", "#section-two", "#section-three", "#section-four", "#section-five", "#section-six"];
var headingIdArr = ["#heading-one", "#heading-two", "#heading-three", "#heading-four", "#heading-five", "#heading-six"];

function hiddenToggle(headingId) {
  var section = "#section" + headingId.slice(8);
  console.log(headingId);
  // console.log(section);
  $(".section").removeClass("active");
  $(".section").addClass("collapsed");
  $(section).addClass('active');
  $(section).removeClass('collapsed');

  $(".glyphicon").addClass("glyphicon-chevron-down");
  $(".glyphicon").removeClass("glyphicon-chevron-up");
  $(section + " .glyphicon").removeClass("glyphicon-chevron-down");
  $(section + " .glyphicon").addClass("glyphicon-chevron-up");

  document.getElementById(headingId).addEventListener('click', function(){
    $(section).removeClass("active");
    $(section).addClass("collapsed");
  });
}

function collapseListener(section){
  // document.querySelector(sectionId);
  var heading = "#heading" + section.slice(8);
  // heading.addEventListener("click", function(){
  //   $(section)
  // });
  console.log(heading);
  console.log(section);
}

(function expandListener(){
  headingIdArr.forEach(function(sectionId) {
    var section = document.querySelector(sectionId);
    section.addEventListener('click', function() {
      hiddenToggle(sectionId);
    });
  });
})();
