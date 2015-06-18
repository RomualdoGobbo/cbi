///<reference path="../typings/tsd.d.ts"/>
var assert = require('assert');
var fs = require('fs');
var bl = require('byline');
var r = require('./record');
var Record = r.Record;
var d = require('./disposal');
var Disposal = d.Disposal;
var Flow = (function () {
    function Flow(records, flowtype, firstRecordId) {
        assert(typeof records === 'object');
        assert(typeof flowtype === 'string');
        assert(typeof firstRecordId === 'string');
        this.flowtype = flowtype;
        if (records === null) {
            return;
        }
        if (records.length < 3) {
            throw new Error('Insufficent record length');
        }
        this._header = records.shift();
        this._footer = records.pop();
        this._disposals = records.reduce(function (dps, rec) {
            var currentDsp = dps[dps.length - 1];
            if (rec.getField('tipo_record') === firstRecordId) {
                currentDsp = new Disposal();
                dps.push(currentDsp);
            }
            assert(currentDsp instanceof Disposal, 'Wrong file format - first record did not have correct tipo_record ' +
                firstRecordId);
            currentDsp.appendRecord(rec);
            return dps;
        }, []);
    }
    Flow.fromFile = function (filepath, flowtype, disposalFirstRecordId, onready) {
        var stream = bl.createStream(fs.createReadStream(filepath));
        var records = [];
        stream.on('readable', function () {
            var line;
            while (null !== (line = stream.read())) {
                records.push(new Record(line.toString(), flowtype));
            }
        });
        stream.on('error', function (err) { onready(err, null); });
        stream.on('end', function () {
            onready(null, new Flow(records, flowtype, disposalFirstRecordId));
        });
    };
    ;
    Flow.prototype.toFile = function (filepath, done) {
        var writeStream = fs.createWriteStream(filepath);
        writeStream.write(this._header.toString() + '\r\n');
        this._disposals.forEach(function (disposal) {
            writeStream.write(disposal.toString());
        });
        writeStream.write(this._footer.toString() + '\r\n');
        writeStream.end();
        writeStream.on('error', function (err) {
            return done(err);
        });
        writeStream.on('finish', function () {
            return done(null);
        });
    };
    ;
    return Flow;
})();
exports.Flow = Flow;
