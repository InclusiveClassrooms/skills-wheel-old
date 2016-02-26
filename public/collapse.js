var currentSectionClass = "#section-one";
var sectionIdArr = ["#section-one", "#section-two", "#section-three", "#section-four", "#section-five", "#section-six"];

function hiddenToggle(sectionId) {
  var sections = document.querySelectorAll(".section");
  console.log("im collapsing");
  for (var i = 0; i < sections.length; i++) {
    console.log(sections[i]);
    sections[i].classList.remove('active');
    sections[i].classList.add('collapsed');
  }
  document.querySelector(sectionId).classList.add('active');
  document.querySelector(sectionId).classList.remove('collapsed');
}

sectionIdArr.forEach(function(sectionId) {
  var section = document.querySelector(sectionId);
  section.addEventListener('click', function() {
    hiddenToggle(sectionId);
    currentSectionClass = sectionId;
  });
});

// $("#all-questions").accordion();
