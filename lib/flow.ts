///<reference path="../typings/tsd.d.ts"/>
import assert = require('assert');
import CBIStructs = require('./record_mapping');
import s = require('underscore.string');

//IDEA ramda è un pò più amichevole e fa più cose- magari sostituirlo?
import lazy = require('lazy.js');
import fs = require('fs');
import bl = require('byline');

import r = require('./record');
import Record = r.Record;


import d = require('./disposal');
import Disposal = d.Disposal;
/*
 * Flow class
 * -------------------------------------
 *
 * Maps to a whole CBI file
 *
 */


export class Flow {

  private _header: Record;
  private _disposals: Array<Disposal>;
  private _footer: Record;
  public flowtype: string;

  /**
   * It's possibile to create a new empty instance and then fill in the fields,
   * or to specify a record array, usually from a parsed file
   *
   * @param records array of records, including header and footer, or null
   * @param flowtype the flow type
   * @param firstRecordId string
   *
   **/

  constructor( records: Array<Record>, flowtype: string, firstRecordId: string){

    assert(typeof records === 'object');
    assert(typeof flowtype === 'string');
    assert(typeof firstRecordId === 'string');

    this.flowtype = flowtype;

    if(records === null){ return; }

    if(records.length < 3){

        throw new Error('Insufficent record length');
    }

    this._header = records.shift();
    this._footer = records.pop();

    this._disposals = records.reduce(

      (dps: Array<Disposal>, rec: Record)=> {

        var currentDsp = dps[dps.length-1];

        // New disp starting
        if(rec.getField('tipo_record') === firstRecordId ){

            currentDsp = new Disposal();
            dps.push(currentDsp);
        }

        //questo si verifica se il primo record non è un tipo_record
        assert(currentDsp instanceof Disposal,
          'Wrong file format - first record did not have correct tipo_record ' +
           firstRecordId);

        currentDsp.appendRecord(rec);

        return dps;
      },

      []
    )
  }

  /**
   *  Convenience static method to create an instance from a file
   *
   *  @param filepath path to a cbi file
   *  @param flowtype the flow type
   *  @param disposalFirstRecordId A string containing the id of the first
   *  record of a disposal. It is used to identify multiple disposals inside
   *  a flow
   *  @param onready nodeback style completion callback
   *
   * */

  public static fromFile(

    filepath: string,
    flowtype: string,
    disposalFirstRecordId: string,
    onready: (err: Error, flow: Flow)=> void
    )
    : void {


    var stream: bl.LineStream = bl.createStream(

        fs.createReadStream(filepath)
    );

    var records: Array<Record> = [];

    stream.on('readable', function() {

        var line: Buffer;

        while (null !== (line = stream.read())) {

            records.push( new Record(line.toString(), flowtype));
        }
    });

    stream.on('error', (err: Error)=> {onready( err, null); } );

    stream.on('end', ()=>{
      onready(null, new Flow(records, flowtype, disposalFirstRecordId))
    });
  };

  /**
  * Convenience method to create a file from an instance
  *
  * @param filepath path to a cbi file
  *
  */

  public toFile(filepath: string, done: (err: Error)=>void){

      var writeStream = fs.createWriteStream(filepath);
      writeStream.write(this._header.toString()+'\r\n');

      this._disposals.forEach((disposal : Disposal)=>{

          writeStream.write(disposal.toString());
      });

      writeStream.write(this._footer.toString()+'\r\n');
      writeStream.end();

      writeStream.on('error', function(err: Error){
          return done(err);
      });
      writeStream.on('finish', function(){
          return done(null);
      });
  };
}
