var form = document.getElementById('ta-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  getAnswers(e.target);
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
