var form = document.getElementById('ta-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  getAnswers(e.target);
  var docData = $(form).serialize();
  request = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxzdgBRvWFf9CDWjZ4M8VyGlYyMwL3ScEFY9ukqw9xntvV2cQI3/exec",
    type: "post",
    data: docData
  });
});

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
