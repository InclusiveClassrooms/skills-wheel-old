var form = document.getElementById('ta-form');

var formValue = form.addEventListener('submit', function(e){
  e.preventDefault();
  var formAnswers = $(this).serializeArray().reduce(function(object,element){
    object[element.name] = element.value;
    return object;
  },{});
});
