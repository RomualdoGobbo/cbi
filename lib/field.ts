//TODO questa classe è inutile, è una stringa

///<reference path="../typings/tsd.d.ts"/>
import assert = require('assert');
import CBIStructs = require('./record_mapping');
import s = require('underscore.string');
import fs = require('fs');
import bl = require('byline');


/**
 * This class represents a field in a single record.
 * If content is provided, it is eagerly validated
 */
export class Field{

  /**
   * Gets the length of this field
   * @return {number} the length of this field
   */
  get length(): number {
    return this.to - this.from + 1;
  }

  private _content: string;

  /**
   * Sets and eagerly validate the field's content
   * @param  {string} content
   */
  set content(content: string) {

    this._content = content;
    assert(this.content.length === this.length, 'Invalid content length for '+this.name);
  }

  get content() { return this._content; }

  /**
   * Creates a CBI Field
   * @param  {number} from Start offset of the field
   * @param  {number} to End offset of this field
   * @param  {string} name  The field name. It must be an existing CBI field type,
   * otherwise it won't validate
   * See validators.td
   * @param  {string} content  Optional field payload
   */
  constructor(

    private from : number,
    private to : number,
    public name : string,

    content? : string) {

    assert(this.validatePosition(from),'Invalid from param');
    assert(this.validatePosition(to), 'Invalid to param');

    if(this.length <= 0){

      throw new Error('Invalid from/to params');
    }

    if(content){
      this.content = content;
    }
  }


  /**
   * Checks that the provided number is a positive integer
   * @param  {number}  val value to check
   * @return {Boolean}
   */
  private validatePosition(val : number):Boolean{

    return (typeof val === 'number') && (val % 1 === 0) && ( val>0 );
  }

  /**
   * Returns the field content
   * @return {string}
   */
  public toString():string {

    return this.content;
  }
}
