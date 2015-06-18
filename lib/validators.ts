///<reference path="../typings/tsd.d.ts"/>

/*
  this file has the building blocks to build (maybe) algebraic data types
  used in validation of cbi files
  */

import R = require('ramda');

export function blank(string: string): boolean{
  return string.trim() === '';
}

//i will also decompose you but I have no time
var doesMatch = R.curry(function(regex, string) {
  return !! string.match(regex);
});

//begin with not a whitespace, then allow specified characters
var _alpha = doesMatch(/^[^\s][a-zA-Z0-9\s"\$%&'\(\)\*\+,-\.\/']+$/);
export var alphanumeric = _alpha;

var _sia = doesMatch(/^[A-Z][0-9]{4}$/);
export var SIA = _sia;

var _numeric = doesMatch(/^[0-9]+$/);
export var numeric = _numeric;

var _abi = doesMatch(/^[0-9]{5}$/);
export var ABI = _abi;

//export var
var hasLength = R.propEq('length');
export var length = hasLength;

var _date = doesMatch();

export var date = function(string){
  var components = string.match(/^([0-3][1-9])([0,1][0-9])([0-9]{2})$/);
  if(components === null || components.length !== 4){

    console.log(components, string);
    return false;
  }

  var day = parseInt(components[1]);
  try{
    var d = new Date(
      parseInt('20'+components[3], 10),
      parseInt(components[2]) - 1,
      day
    );
  }
  catch(err){
    return false;
  }

  //questo fallisce per il 29 feb in anni non bisestile..
  //le date js sono orribili

  return (d.getDate() === day)
}

var _enum = R.curry(function(arr, str){
  return arr.indexOf(str) !== -1;
});



export var isEnum = _enum;
