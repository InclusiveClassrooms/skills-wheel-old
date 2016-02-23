var form = document.getElementById('ta-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  getAnswers(e.target);
});

function getAnswers(form) {
  var formAnswersObj = $(form).serializeArray().reduce(function(object,element){
    object[element.name] = element.value;
    return object;
  },{});
  console.log(formAnswersObj);
  return formAnswersObj;
}