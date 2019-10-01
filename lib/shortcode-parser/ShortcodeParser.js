export class ShortcodeParser {

  constructor() {
    this.hooks = [];
    this.parse = this.parse.bind(this);
    this.extend = this.extend.bind(this);
  }

  parse(content) {
    if ( ! content ) {
      return content;
    }
  
    let shortcodeObject,
        regex,
        matches,
        originalMatch;
  
    // get regex matches
    regex = RegExp(/{{\s*(.*?)\s*}}/g);
    matches = content.match(regex);
  
    if ( matches && matches.length && matches.length > 0 ) {
      matches.forEach(match => {
  
        // save the original match; we'll need it later
        originalMatch = match;
      
        // turn the full match into a JSON string
        match = `{${match}}`;
        match = match
                  .replace(/&#8216;|&#8217;/g, "'")
                  .replace(/&#8220;|&#8221;/g, '"')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/{{/, '')
                  .replace(/}}/, '');
  
        // attempt to parse JSON into a valid JSON object
        try {
          shortcodeObject = JSON.parse( match );
        }
        catch(err) {
          return content;
        }
  
        // handle the data
        if ( typeof shortcodeObject.function !== 'undefined' ) {
          this.hooks.forEach(hook => {
            hook.parse(shortcodeObject, match, originalMatch);
          });
        }
  
      });
    }
  }

  extend(hook) {
    this.hooks.push(hook);
  }

}