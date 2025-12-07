'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    // Obtener número y unidad
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Manejo de errores
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');
    }
    if (initNum === 'invalid number') return res.send('invalid number');
    if (initUnit === 'invalid unit') return res.send('invalid unit');

    // Convertir y obtener unidad de retorno
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    // Crear string descriptivo
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Responder en formato JSON
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};
