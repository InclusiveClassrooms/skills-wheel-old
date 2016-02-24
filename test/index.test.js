QUnit.begin(function( details ) {
  var taForm = document.getElementById('ta-form');
  var alwaysAppearanceOthers = document.getElementsByName('appearance-others');
  var node = Array.prototype.slice.call(alwaysAppearanceOthers).filter(function(el){
    return el.className === 'always';
  });

  $(node).trigger('click');
  
  var event = document.createEvent('Event');
  event.initEvent('submit', true, true);
  taForm.dispatchEvent(event);

});

QUnit.test('selecting one of the radio buttons changes the value of data retrieved from the form', function(assert) {
  var taForm = document.getElementById('ta-form');

  var actual = getAnswers(taForm);
  var expected = [{
    question:'appearance-others',
    answer:'3'
  }];

  assert.deepEqual(actual, expected, "okay");
});

QUnit.test('submitting the form creates the wheel', function(assert) {
  assert.ok($('svg')[0].nodeName);
});
