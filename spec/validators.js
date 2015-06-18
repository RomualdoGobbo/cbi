/*eslint no-unused-expressions: 0*/
'use strict';

const validators = require('../lib/validators');
const expect = require('chai').expect;

/*
  those validators do not specify length
 */

describe('the blank validator', function() {

  it('validates blank strings', function() {

    expect(validators.blank('')).to.be.true;
    expect(validators.blank('  ')).to.be.true;
    expect(validators.blank('a  ')).to.be.false;
  });
});


describe('the alphanumeric validator', function() {

  it('validates alphanumeric strings', function() {

    expect(validators.alphanumeric('  ')).to.be.false;
    expect(validators.alphanumeric('as1da')).to.be.true;
    expect(validators.alphanumeric('As1da  ')).to.be.true;

    //allow spaces
    expect(validators.alphanumeric('aD1da  a')).to.be.true;
    expect(validators.alphanumeric('as1da  ')).to.be.true;
    expect(validators.alphanumeric('  asda')).to.be.false;
    expect(validators.alphanumeric('a-sda')).to.be.true;
    expect(validators.alphanumeric('\\')).to.be.false;
  });
});


describe('the date validator', function() {

  it('validates ggmmaa dates', function() {

    expect(validators.date('111212')).to.be.true;
    expect(validators.date('311212')).to.be.true;
    expect(validators.date('000012')).to.be.false;
    expect(validators.date('290215')).to.be.false;
    expect(validators.date('290212')).to.be.true;
  });

});

describe('the numeric validator', function() {

  it('validates numeric strings', function() {

    expect(validators.numeric('as1da')).to.be.false;
    expect(validators.numeric('1122')).to.be.true;
    expect(validators.numeric('00001122')).to.be.true;
  });
});


describe('the enum validator', function() {

  it('validates enums', function() {
    expect(validators.isEnum([1, 2], 1)).to.be.true;
    expect(validators.isEnum([1, 2], 3)).to.be.false;
  });
});
