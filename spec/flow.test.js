/* global before */
/* global describe */
/* global it */

'use strict';

var expect = require('chai').expect;
var Flow = require('../index').Flow;
//var string = require('underscore.string');
//var AssertionError = require('assertion-error');
var path = require('path');
var fs = require('fs');
var testFileMavR = path.resolve(__dirname, 'cases/MAV.txt');
var testFileMavW = path.resolve(__dirname, 'cases/MAV2.txt');

var testFileBonR = path.resolve(__dirname, 'cases/BONIFICI.txt');
var testFileBonW = path.resolve(__dirname, 'cases/BONIFICI2.txt');

const MAV_DISPOSAL_RECORD_ID = '14';
const BONIFICO_DISPOSAL_RECORD_ID = '10';

describe('The flow class', function(){

  //il file mav è insensato
  xit('is instantiable from a CBI file with a MAV', function(done){

    Flow.fromFile(testFileMavR, 'MAV', MAV_DISPOSAL_RECORD_ID,

     function(err, flow){

      expect(err).to.be.null;
      expect(flow).to.be.instanceof(Flow);

      flow.toFile(testFileMavW, function(err){

       expect(err).to.be.null;

       var before = fs.readFileSync(testFileMavR).toString();
       var after = fs.readFileSync(testFileMavW).toString();

       expect(after).to.equal(before);
       done();
      });
    });
  });


  it('is instantiable from a CBI file with a BONIFICO', function(done){

    Flow.fromFile(testFileBonR, 'BONIFICI', BONIFICO_DISPOSAL_RECORD_ID,

      function(err, flow){

        expect(err).to.be.null;

        expect(flow).to.be.instanceof(Flow);

        flow.toFile(testFileBonW, function(err){

           expect(err).to.be.null;

           var before = fs.readFileSync(testFileBonR).toString();
           var after = fs.readFileSync(testFileBonW).toString();

           expect(after).to.equal(before);
           done();
        });
    });
  });
});
