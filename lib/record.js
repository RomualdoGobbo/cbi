///<reference path="../typings/tsd.d.ts"/>
var assert = require('assert');
var CBIStructs = require('./record_mapping');
var R = require('ramda');
var Record = (function () {
    function Record(recordType, flowType) {
        var _this = this;
        var code;
        switch (recordType.length) {
            case 2:
                this._code = recordType;
                break;
            case Record.RAW_RECORD_LENGTH:
                this._code = recordType.substring(1, 3);
                break;
            default:
                throw new Error('Invalid record length ' + recordType.length + ' - ' + recordType);
                break;
        }
        var flowStruct = CBIStructs.MAPPINGS[flowType];
        if (flowStruct === undefined)
            throw new Error('Unknown flow type ' + flowType);
        this.recordStruct = flowStruct[this.code];
        if (this.recordStruct === undefined)
            throw new Error('Unknown record type ' + this.code);
        var fieldLength = 0;
        this._fields =
            this.recordStruct.map(function (struct) {
                var content = undefined;
                var length = struct[1] - struct[0] + 1;
                var field = {
                    name: struct[2],
                    value: ''
                };
                field[struct[2]] = '';
                if (recordType.length === Record.RAW_RECORD_LENGTH) {
                    content = recordType.substring(struct[0] - 1, struct[1]);
                    var isValid = struct[3];
                    assert(isValid(content), 'Error in record ' + _this._code +
                        ', Field ' + struct[2] + ' has invalid value "' + content + '" ');
                    field.value = content;
                }
                fieldLength += length;
                return field;
            });
        assert(fieldLength === Record.RAW_RECORD_LENGTH, 'Unexpected record length: ' + fieldLength + '\n' +
            'Raw record: ' + this + '\n' +
            'Definition: ' + this.recordStruct);
    }
    Object.defineProperty(Record.prototype, "fields", {
        get: function () { return this._fields; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "code", {
        get: function () { return this._code; },
        enumerable: true,
        configurable: true
    });
    Record.prototype.getField = function (name) {
        return this._getField(name).value;
    };
    Record.prototype._getField = function (name) {
        var field = R.find(R.propEq('name', name))(this.fields);
        if (!field) {
            throw new Error('This record cannot contain a field with name ' + name);
        }
        return field;
    };
    Record.prototype.setField = function (name, value) {
        var field = this._getField(name);
        var struct = R.find(R.propEq(2, name))(this.recordStruct);
        var isValid = struct[3];
        var length = struct[1] - struct[0] + 1;
        assert(value.length === length, 'Invalid content length for ' + name);
        assert(isValid(value), 'Error in record ' + this._code +
            ', Field ' + name + ' has invalid value "' + value + '" ');
        field.value = value;
    };
    Record.prototype.toString = function () {
        var string = this._fields.reduce(function (out, field) {
            return out += field.value;
        }, '');
        return string;
    };
    Record.RAW_RECORD_LENGTH = 120;
    return Record;
})();
exports.Record = Record;
