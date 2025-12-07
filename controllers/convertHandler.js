function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const numRegex = /^[\d/.]+/;
    const numStr = input.match(numRegex)?.[0];

    if (!numStr) return 1;

    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';

    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/');
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      result = parseFloat(numStr);
    }

    return result;
  };
  
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const unit = input.match(unitRegex)?.[0];
    if (!unit) return 'invalid unit';

    const validUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    if (unit.toLowerCase() === 'l') return 'L';
    if (validUnits.includes(unit.toLowerCase())) return unit.toLowerCase();
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };
    return map[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const map = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };
    return map[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
  };
  
}

module.exports = ConvertHandler;
