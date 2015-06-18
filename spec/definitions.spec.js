'use strict';

/*eslint no-unused-expressions: 0*/

const def = require('../lib/record_mapping').MAPPINGS;
var expect = require('chai').expect;

function isSane(recordDef){

  var prev = ['fake', 0, 0];
  var length = 0;
  for(const field of recordDef){

    expect(field[2]).to.be.a.String;
    expect(field[0]).to.be.at.most(field[1]);
    expect(field[0]).to.equal(prev[1] + 1);
    length += field[1] - field[0] + 1;
    prev = field;
  }

  expect(length).to.equal(120);
  return true;
}

describe('The record definition', function(){

  it('is sane', function() {

    for ( const flow of Object.keys(def)){
      const flowDef = def[flow];

      for ( const record of Object.keys(flowDef)){

          expect(isSane(flowDef[record])).to.be.true;
      }
    }

  });
});
