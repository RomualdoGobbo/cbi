///<reference path="../typings/tsd.d.ts"/>
var R = require('ramda');
function blank(string) {
    return string.trim() === '';
}
exports.blank = blank;
var doesMatch = R.curry(function (regex, string) {
    return !!string.match(regex);
});
var _alpha = doesMatch(/^[^\s][a-zA-Z0-9\s"\$%&'\(\)\*\+,-\.\/']+$/);
exports.alphanumeric = _alpha;
var _sia = doesMatch(/^[A-Z][0-9]{4}$/);
exports.SIA = _sia;
var _numeric = doesMatch(/^[0-9]+$/);
exports.numeric = _numeric;
var _abi = doesMatch(/^[0-9]{5}$/);
exports.ABI = _abi;
var hasLength = R.propEq('length');
exports.length = hasLength;
var _date = doesMatch();
exports.date = function (string) {
    var components = string.match(/^([0-3][1-9])([0,1][0-9])([0-9]{2})$/);
    if (components === null || components.length !== 4) {
        console.log(components, string);
        return false;
    }
    var day = parseInt(components[1]);
    try {
        var d = new Date(parseInt('20' + components[3], 10), parseInt(components[2]) - 1, day);
    }
    catch (err) {
        return false;
    }
    return (d.getDate() === day);
};
var _enum = R.curry(function (arr, str) {
    return arr.indexOf(str) !== -1;
});
exports.isEnum = _enum;
