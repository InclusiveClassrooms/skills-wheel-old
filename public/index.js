var form = document.getElementById('ta-form');
var wholeForm = $("#whole-form");
var newFormButton = document.getElementById('new-form');
var pdfButton  = $("#pdf");
var questions = ["personal-appearance","appearance-others","likes","dislikes","strengths","identify-emotions-self","identify-emotions-others","bodily-reaction-emotions","identify-response-emotions","plan-respond-emotions","good-eye-contact","good-distance-touch","identify-expressions","body-language-self","body-language-others","good-volume","good-pace","clear-speech","speak-with-relevance","indentify-good-speech","think-before-react","understand-problems-occurred","problems-solved-appropriately","make-a-plan","follow-a-plan","built-one-friendship","built-multiple-friendships","express-thoughts-to-others","disagree-with-others","apologise-appropriately"];

form.addEventListener('submit', function(e){
  e.preventDefault();
  $('.unanswered').removeClass('unanswered');
  if (allFilled()) {
    getAnswers(e.target);
    $(".active").removeClass("active");
    $(".section").addClass("collapsed");
    sendRequest("https://script.google.com/macros/s/AKfycbxzdgBRvWFf9CDWjZ4M8VyGlYyMwL3ScEFY9ukqw9xntvV2cQI3/exec", $(form).serialize());
    sendRequest("https://inclusive-classrooms.herokuapp/redis", $(form).serializeArray());
  }
});

newFormButton.addEventListener("click", function(e){
  wholeForm.removeClass("hidden");
  pdfButton.addClass("hidden inactive");
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

function allFilled(){

  var detailsFilled = Array.prototype.slice.call(document.getElementsByClassName('student-details'));
  var answeredDetails = detailsFilled.filter(function(el){
    return el.value;
  });
  var unansweredDetails = detailsFilled.filter(function(el){
    return !el.value;
  }).map(function(el){
    return el.name;
  });

  var questionsAnswered = questions.map(function(el){
    var answered =  Array.prototype.slice.call(document.getElementsByName(el)).filter(function(el){
      return el.checked;
    });
    return answered.length || el;
  });

  var allQuestions = questionsAnswered.filter(function(el){
    return typeof el !== 'string';
  })

  if(detailsFilled.length === 6 && allQuestions.length === 30){
    return true;
  } else {
    unansweredDetails.forEach(function(el){
      $('input[name=' + el + ']').addClass('unanswered');
    });
    questionsAnswered.forEach(function(el, index){
      if (typeof el === 'string'){
        $(sectionIdArr[(Math.floor(index/5))]).addClass('unanswered');
      }
    });
  }
}
