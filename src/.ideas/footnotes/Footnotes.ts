interface Footnote {
  id: number
  text?: string
  globalKey? : string
}

export class Footnotes {

  footnotes: Array<Footnote>
  globalFootnotesStorage: object

  constructor() {
    this.footnotes = [];
    this.globalFootnotesStorage = {};
    this.count = this.count.bind(this);
    this.add = this.add.bind(this);
    this.addGlobal = this.addGlobal.bind(this);
    this.setGlobalFootnotes = this.setGlobalFootnotes.bind(this);
    this.getFootnotes = this.getFootnotes.bind(this);
  }
  
  count() {
    return this.footnotes.length;
  }
  
  add(footnoteText: string) {
    let id = this.count() + 1;
    this.footnotes.push({id: id, text: footnoteText});
  }

  setGlobalFootnotes(globalFootnotes: Array<{ key: string, text: string }>) {
    this.globalFootnotesStorage = globalFootnotes;
  }

  addGlobal(key: string) {
    key = key.toLowerCase();
    if ( this.globalFootnotesStorage.hasOwnProperty(key) ) {
      // @ts-ignore
      this.add(this.globalFootnotesStorage[key]);
    }
  }

  getFootnotes() {
    if ( this.footnotes.length > 0 ) {
      return this.footnotes;
    }
    return null;
  }

}