QUnit.test('selecting all of the radio buttons changes the value of data retrieved from the form', function(assert) {
  var taForm = document.getElementById('ta-form');

  var always = Array.prototype.slice.call(document.getElementsByClassName('always'));

  always.forEach(function(node){
    $(node).trigger('click');
  });

  var event = document.createEvent('Event');
  event.initEvent('submit', true, true);
  taForm.dispatchEvent(event);


  var actual = getAnswers(taForm);

  assert.equal(actual.length, 36, "okay");
});
