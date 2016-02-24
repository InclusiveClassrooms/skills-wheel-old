QUnit.test('selecting one of the radio buttons changes the value of data retrieved from the form', function(assert) {
  var some_element = document.getElementById('ta-form');
  var alwaysAppearanceOthers = document.getElementsByName('appearance-others');
  var node = Array.prototype.slice.call(alwaysAppearanceOthers).filter(function(el){
    return el.className === 'always';
  });

  var event = document.createEvent('Event');
  event.initEvent('submit', true, true);
  some_element.dispatchEvent(event);

  $(node).trigger('click');
  var actual = getAnswers(some_element);
  var expected = [{
    question:'appearance-others',
    answer:'always'
  }];

  assert.deepEqual(actual, expected);
});
