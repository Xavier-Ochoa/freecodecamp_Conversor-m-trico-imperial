const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('Function convertHandler.getNum', function() {
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal number input', function(done) {
      let input = '3.1mi';
      assert.equal(convertHandler.getNum(input), 3.1);
      done();
    });

    test('Fractional input', function(done) {
      let input = '1/2km';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Fractional input with decimal', function(done) {
      let input = '4.5/3lbs';
      assert.approximately(convertHandler.getNum(input), 1.5, 0.0001);
      done();
    });

    test('Double fraction input (invalid)', function(done) {
      let input = '3/2/3kg';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('No numerical input defaults to 1', function(done) {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit', function() {
    test('For each valid input unit', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      input.forEach(function(ele) {
        assert.include(['gal','L','mi','km','lbs','kg'], convertHandler.getUnit(ele));
      });
      done();
    });

    test('Unknown unit input returns invalid unit', function(done) {
      let input = '32g';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit', function() {
    test('Return unit for each valid input unit', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit', function() {
    test('Correctly spelled out unit for each valid input unit', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert', function() {
    test('Gal to L', function(done) {
      assert.approximately(convertHandler.convert(1,'gal'),3.78541,0.1);
      done();
    });

    test('L to Gal', function(done) {
      assert.approximately(convertHandler.convert(3.78541,'L'),1,0.1);
      done();
    });

    test('Mi to Km', function(done) {
      assert.approximately(convertHandler.convert(1,'mi'),1.60934,0.1);
      done();
    });

    test('Km to Mi', function(done) {
      assert.approximately(convertHandler.convert(1.60934,'km'),1,0.1);
      done();
    });

    test('Lbs to Kg', function(done) {
      assert.approximately(convertHandler.convert(1,'lbs'),0.453592,0.1);
      done();
    });

    test('Kg to Lbs', function(done) {
      assert.approximately(convertHandler.convert(0.453592,'kg'),1,0.1);
      done();
    });
  });

});
