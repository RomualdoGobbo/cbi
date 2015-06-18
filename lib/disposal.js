///<reference path="../typings/tsd.d.ts"/>
var assert = require('assert');
var r = require('./record');
var R = require('ramda');
var Record = r.Record;
var Disposal = (function () {
    function Disposal() {
        this.records = [];
    }
    Disposal.prototype.getRecord = function (code) {
        assert(typeof code === 'string', 'Record type must be a string');
        return R.find(R.propEq('code', code), this.records);
    };
    Disposal.prototype.appendRecord = function (record) {
        assert(record instanceof Record, 'This is not a Record');
        this.records.push(record);
    };
    Disposal.prototype.toString = function () {
        return this.records.reduce(function (out, record) { return out += record.toString() + '\r\n'; }, '');
    };
    return Disposal;
})();
exports.Disposal = Disposal;
