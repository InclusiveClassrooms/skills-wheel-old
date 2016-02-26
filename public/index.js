var form = document.getElementById('ta-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  getAnswers(e.target);
  sendRequest("http://script.google.com/macros/s/AKfycbxzdgBRvWFf9CDWjZ4M8VyGlYyMwL3ScEFY9ukqw9xntvV2cQI3/exec", $(form).serialize());
  sendRequest("http://localhost:8000/redis", $(form).serializeArray());
});

function sendRequest(url, formData){
  request = $.ajax({
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
