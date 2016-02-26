var form = document.getElementById('ta-form');
var wholeForm = $("#whole-form");
var newFormButton = document.getElementById('new-form');
var pdfButton  = $("#pdf");

form.addEventListener('submit', function(e){
  e.preventDefault();
  getAnswers(e.target);
  // showWheel();
  sendRequest("http://script.google.com/macros/s/AKfycbxzdgBRvWFf9CDWjZ4M8VyGlYyMwL3ScEFY9ukqw9xntvV2cQI3/exec", $(form).serialize());
  sendRequest("http://localhost:8000/redis", $(form).serializeArray());
});

newFormButton.addEventListener("click", function(e){
  wholeForm.removeClass("hidden");
  pdfButton.addClass("hidden");
  $("#new-form").addClass("hidden");
  $("#wheel-svg").remove();
  form.reset();
});

function sendRequest(url, formData){
  var request = $.ajax({
    url: url,
    type: "post",
    data: JSON.stringify(formData)
  });
}

function getAnswers(form, callback) {
  var formAnswers = $(form).serializeArray().reduce(function(array ,element){
    var obj = {
      question:element.name,
      answer:element.value
    };
    array.push(obj);
    return array;
  },[]);
  drawWheel(formAnswers);
  return formAnswers;
}
