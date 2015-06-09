/* global before */
/* global describe */
/* global it */

'use strict';

var expect = require('chai').expect;
var Flow = require('../lib/record').CBI.Flow;
//var string = require('underscore.string');
//var AssertionError = require('assertion-error');
var path = require('path');
var fs = require('fs');
var testFileMavR = path.resolve(__dirname, 'MAV.txt');
var testFileMavW = path.resolve(__dirname, 'MAV2.txt');

var testFileBonR = path.resolve(__dirname, 'BONIFICI.txt');
var testFileBonW = path.resolve(__dirname, 'BONIFICI2.txt');
//var jsdiff = require('diff');

describe('The flow class', function(){

    xit('is instantiable from a CBI file with a MAV', function(done){

        Flow.fromFile(testFileMavR, 'MAV', function(err, flow){

            expect(err).to.be.null; /*jslint ignore:line*/

            expect(flow).to.be.instanceof(Flow);

            flow.toFile(testFileMavW, function(err){

                   expect(err).to.be.null; /*jslint ignore:line*/

                   var before = fs.readFileSync(testFileMavR).toString();
                   var after = fs.readFileSync(testFileMavW).toString();

                   expect(after).to.equal(before);
                   done();
            });

        });
    });

    it('is instantiable from a CBI file with a BONIFICO', function(done){

      Flow.fromFile(testFileBonR, 'BONIFICI', function(err, flow){

          expect(err).to.be.null; /*jslint ignore:line*/

          expect(flow).to.be.instanceof(Flow);

          flow.toFile(testFileBonW, function(err){

                 expect(err).to.be.null; /*jslint ignore:line*/

                 var before = fs.readFileSync(testFileBonR).toString();
                 var after = fs.readFileSync(testFileBonW).toString();

                 expect(after).to.equal(before);
                 done();
          });

      });
  });
});
