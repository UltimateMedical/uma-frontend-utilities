export class Footnotes {

  constructor() {
    this.footnotes = [];
    this.count = this.count.bind(this);
    this.add = this.add.bind(this);
    this.addGlobal = this.addGlobal.bind(this);
    this.getFootnotes = this.getFootnotes.bind(this);
  }
  
  count = function() {
    return this.footnotes.length;
  }
  
  add = function(fn) {
    let id = this.count() + 1;
    this.footnotes.push({id: id, text: fn});
  }

  addGlobal = function(key) {
    key = key.toLowerCase();
    if ( globalFootnotes.hasOwnProperty(key) ) {
      this.add(globalFootnotes[key]);
    }
  }

  getFootnotes = function() {
    if ( this.footnotes.length > 0 ) {
      return this.footnotes;
    }
    return null;
  }

}