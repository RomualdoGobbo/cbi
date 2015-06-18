///<reference path="../typings/tsd.d.ts"/>
import assert = require('assert');
import CBIStructs = require('./record_mapping');
import s = require('underscore.string');

import fs = require('fs');
import bl = require('byline');
import r = require('./record');
import R = require('ramda');
import Record = r.Record;

export class Disposal {

  private records: Array<Record>;

  constructor(){

   this.records = [];
  }

  //TODO può esserci solo un record con un dato codice all'interno di un disposal (distinta?)
  public getRecord(code: string): Record {

    assert(typeof code === 'string', 'Record type must be a string');

    return R.find( R.propEq('code', code), this.records);
   }

   public appendRecord(record: Record){

        assert(record instanceof Record, 'This is not a Record');
        this.records.push(record);
   }

   public toString(): string{

        return this.records.reduce(
            (out: string, record: Record)=> { return out+=record.toString()+'\r\n' },
            ''
        );
    }
}
