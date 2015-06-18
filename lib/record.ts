///<reference path="../typings/tsd.d.ts"/>
import assert = require('assert');
import CBIStructs = require('./record_mapping');
import s = require('underscore.string');

import lazy = require('lazy.js');
import R = require('ramda');
import fs = require('fs');
import bl = require('byline');

import f = require('./field');

export type Field = { name : string, value: string};

/**
*  Record class - maps to a single line in a cbi file
*/
export class Record {

    //readonly
    private _fields: Array<Field> ;
    get fields(): Array<Field>{ return this._fields; }

    //code è readonly
    private _code : string;
    get code(): string { return this._code;}

    private recordStruct: CBIStructs.RecordStruct;

    public static RAW_RECORD_LENGTH: number = 120;

    /**
     * Create a record istance.
     *
     * @param recordType - can be a two letter record type identifier OR a full raw record line
     * @param flowType -  the file type this record belongs to - used for validation
     */
    constructor(recordType: string, flowType: string) {

        var code: string;

        switch(recordType.length) {

          //only the type was specified
          case 2 :
              this._code = recordType;
          break;

          //we are reading a raw record
          case Record.RAW_RECORD_LENGTH :
              this._code = recordType.substring(1,3);
          break;

          default :
              throw new Error('Invalid record length ' + recordType.length + ' - ' + recordType);
          break;
        }

        //validate flow type
        var flowStruct: CBIStructs.FlowStruct = CBIStructs.MAPPINGS[flowType];

        if( flowStruct === undefined)
            throw new Error('Unknown flow type '+ flowType);

        this.recordStruct  = flowStruct[this.code];
        if( this.recordStruct === undefined )
            throw new Error('Unknown record type '+ this.code);


        //create record
        var fieldLength = 0;
        this._fields =
        this.recordStruct.map( (struct: CBIStructs.FieldStruct)=> {

          var content: string = undefined;

          var length = struct[1] - struct[0] + 1;
          // inizializza a stringa vuota il campo
          var field = {
            name : struct[2],
            value : ''
          };

          field[struct[2]] = '';

          if(recordType.length === Record.RAW_RECORD_LENGTH){

            //per forza la lunghezza è giusta qua
            content = recordType.substring(struct[0]-1, struct[1]);

            var isValid = struct[3];

            assert( isValid(content),
            'Error in record '+ this._code +
            ', Field ' + struct[2]+ ' has invalid value "'+content+'" ');

            field.value = content;
          }

          fieldLength += length;
          return field;
        });

        assert(fieldLength === Record.RAW_RECORD_LENGTH,
          'Unexpected record length: '+ fieldLength + '\n'+
          'Raw record: ' + this + '\n' +
          'Definition: '+this.recordStruct);
    }

    /**
     * Gets a field by name. Two fields with the same name cannot exist in the same record
     *
     * @param name : the field name
     */
    public getField(name: string): string {

      return this._getField(name).value;
    }

    private _getField(name: string): Field {

      var field = R.find(R.propEq('name', name))(this.fields);

      if(!field) {

        throw new Error('This record cannot contain a field with name '+name);
      }
      return field;
    }

    /**
     * Sets and validate a field
     * @param name : the field name
     * @param value : the field value
     */
    public setField(name: string, value : string): void {

      var field = this._getField(name);
      var struct = R.find(R.propEq(2, name))(this.recordStruct);
      var isValid = struct[3];

      //validate string length before everything else
      var length = struct[1] - struct[0] + 1;

      assert(value.length === length, 'Invalid content length for '+ name);

      assert( isValid(value),
        'Error in record '+ this._code +
        ', Field ' + name + ' has invalid value "'+value+'" ')
      //get the validator

      field.value = value;
    }

    /**
     *  Renders a string representation of the record
     */
    public toString(): string{

      var string = this._fields.reduce(
        (out: string, field: Field)=> {

          return out+=field.value;
        },
        ''
      );

      return string;
    }


}
