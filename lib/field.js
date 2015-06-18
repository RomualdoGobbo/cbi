//TODO questa classe è inutile, è una stringa
///<reference path="../typings/tsd.d.ts"/>
var assert = require('assert');
var Field = (function () {
    function Field(from, to, name, content) {
        this.from = from;
        this.to = to;
        this.name = name;
        assert(this.validatePosition(from), 'Invalid from param');
        assert(this.validatePosition(to), 'Invalid to param');
        if (this.length <= 0) {
            throw new Error('Invalid from/to params');
        }
        if (content) {
            this.content = content;
        }
    }
    Object.defineProperty(Field.prototype, "length", {
        get: function () {
            return this.to - this.from + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "content", {
        get: function () { return this._content; },
        set: function (content) {
            this._content = content;
            assert(this.content.length === this.length, 'Invalid content length for ' + this.name);
        },
        enumerable: true,
        configurable: true
    });
    Field.prototype.validatePosition = function (val) {
        return (typeof val === 'number') && (val % 1 === 0) && (val > 0);
    };
    Field.prototype.toString = function () {
        return this.content;
    };
    return Field;
})();
exports.Field = Field;
