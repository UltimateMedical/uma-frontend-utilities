module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var o=function(){function t(){this.extensions=[],this.parse=this.parse.bind(this),this.extend=this.extend.bind(this)}return t.prototype.parse=function(t){var e,n,o,r,i=this;return t?(n=RegExp(/{{\s*(.*?)\s*}}/g),(o=t.match(n))&&o.length&&o.length>0&&o.forEach((function(n){r=n,n=(n="{"+n+"}").replace(/&#8216;|&#8217;/g,"'").replace(/&#8220;|&#8221;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/{{/,"").replace(/}}/,"");try{e=JSON.parse(n)}catch(e){return t}void 0!==e.function&&i.extensions.forEach((function(o){t=o.parse(t,e,n,r)}))})),t):t},t.prototype.extend=function(t){this.extensions.push(t)},t}(),r=function(){function t(){this.bag={}}return t.prototype.get=function(t){return void 0!==typeof this.bag[t]?this.bag[t]:null},t.prototype.set=function(t,e){this.bag[t]=e},t}(),i=new(function(){function t(){this.gaTargetCollections=[],this.DEBUG=!1,this.gaTargetConfigurations=[],this.observeForMutations=null,this.gaTargetCollections=[],this.init=this.init.bind(this),this.observeParentWrapper=this.observeParentWrapper.bind(this),this.parentWrapperObserver=this.parentWrapperObserver.bind(this),this.onParentWrapperUpdate=this.onParentWrapperUpdate.bind(this),this.createGaTargetCollection=this.createGaTargetCollection.bind(this),this.createGaTargetInstance=this.createGaTargetInstance.bind(this),this.addEventListeners=this.addEventListeners.bind(this),this.getNodeGaLabel=this.getNodeGaLabel.bind(this)}return t.prototype.init=function(t){var e=this;t&&Object.keys(t).forEach((function(n){e[n]=t[n]})),console.log("init: ",this),this.gaTargetCollections=this.gaTargetConfigurations.map((function(t){return e.createGaTargetCollection(t)})),this.observeForMutations&&this.observeParentWrapper()},t.prototype.observeParentWrapper=function(){this.parentWrapperObserver().observe(this.observeForMutations,{childList:!0})},t.prototype.parentWrapperObserver=function(){return new MutationObserver(this.onParentWrapperUpdate)},t.prototype.onParentWrapperUpdate=function(t,e){console.log("mutation: ",t)},t.prototype.createGaTargetCollection=function(t){var e,n,o=this;return e=Array.prototype.slice.call(document.querySelectorAll(t.selector)),{selector:t.selector,firingEvents:t.firingEvents,argsForGa:t.argsForGa,reselectOnMutation:t.reselectOnMutation||!1,gaTargets:e.map((function(e){return n=o.createGaTargetInstance(e,t),o.addEventListeners(n),n}))}},t.prototype.createGaTargetInstance=function(t,e){console.log("createGaTargetInstance: ",e);var n={node:t,firingEvents:e.firingEvents,gaCommand:e.argsForGa[0],gaType:e.argsForGa[1],gaCategory:e.argsForGa[2],gaAction:e.argsForGa[3],gaLabel:e.argsForGa[4],getArgsForGa:function(){return[n.gaCommand,n.gaType,n.gaCategory,n.gaAction,n.gaLabel]}};return n.gaLabel=this.getNodeGaLabel(n),this.addEventListeners(n),n},t.prototype.addEventListeners=function(t){var e=this,n=function(){e.DEBUG?console.log("gaTarget: ",t):window.ga.apply(window,t.getArgsForGa())};t.firingEvents.forEach((function(e){t.node.addEventListener(e,n)}))},t.prototype.getNodeGaLabel=function(t){var e,n=t.node.getAttribute("ga-label");return n&&(e=t.gaLabel.replace(/{{\s*label\s*}}/gi,n)),e},t}()),a=function(){function t(){this.footnotes=[],this.globalFootnotesStorage={},this.count=this.count.bind(this),this.add=this.add.bind(this),this.addGlobal=this.addGlobal.bind(this),this.setGlobalFootnotes=this.setGlobalFootnotes.bind(this),this.getFootnotes=this.getFootnotes.bind(this)}return t.prototype.count=function(){return this.footnotes.length},t.prototype.add=function(t){var e=this.count()+1;this.footnotes.push({id:e,text:t})},t.prototype.setGlobalFootnotes=function(t){this.globalFootnotesStorage=t},t.prototype.addGlobal=function(t){t=t.toLowerCase(),this.globalFootnotesStorage.hasOwnProperty(t)&&this.add(this.globalFootnotesStorage[t])},t.prototype.getFootnotes=function(){return this.footnotes.length>0?this.footnotes:null},t}();n.d(e,"ShortcodeParser",(function(){return o})),n.d(e,"Container",(function(){return r})),n.d(e,"gaTracker",(function(){return i})),n.d(e,"Footnotes",(function(){return a}))}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nob3J0Y29kZS1wYXJzZXIvU2hvcnRjb2RlUGFyc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXIvQ29udGFpbmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nYS10cmFja2VyL0dhVHJhY2tlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9vdG5vdGVzL0Zvb3Rub3Rlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOlsiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJpIiwibCIsIm1vZHVsZXMiLCJjYWxsIiwibSIsImMiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ2YWx1ZSIsInQiLCJtb2RlIiwiX19lc01vZHVsZSIsIm5zIiwiY3JlYXRlIiwia2V5IiwiYmluZCIsIm4iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJ0aGlzIiwiZXh0ZW5zaW9ucyIsInBhcnNlIiwiZXh0ZW5kIiwiY29udGVudCIsInNob3J0Y29kZU9iamVjdCIsInJlZ2V4IiwibWF0Y2hlcyIsIm9yaWdpbmFsTWF0Y2giLCJSZWdFeHAiLCJtYXRjaCIsImxlbmd0aCIsImZvckVhY2giLCJyZXBsYWNlIiwiSlNPTiIsImVyciIsImZ1bmN0aW9uIiwiZXh0ZW5zaW9uIiwicHVzaCIsImJhZyIsInVuZGVmaW5lZCIsInNldCIsImdhVHJhY2tlciIsImdhVGFyZ2V0Q29sbGVjdGlvbnMiLCJERUJVRyIsImdhVGFyZ2V0Q29uZmlndXJhdGlvbnMiLCJvYnNlcnZlRm9yTXV0YXRpb25zIiwiaW5pdCIsIm9ic2VydmVQYXJlbnRXcmFwcGVyIiwicGFyZW50V3JhcHBlck9ic2VydmVyIiwib25QYXJlbnRXcmFwcGVyVXBkYXRlIiwiY3JlYXRlR2FUYXJnZXRDb2xsZWN0aW9uIiwiY3JlYXRlR2FUYXJnZXRJbnN0YW5jZSIsImFkZEV2ZW50TGlzdGVuZXJzIiwiZ2V0Tm9kZUdhTGFiZWwiLCJjb25maWciLCJrZXlzIiwiY29uc29sZSIsImxvZyIsIm1hcCIsImdhVGFyZ2V0Q29uZmlnIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlciIsImdhVGFyZ2V0Q29uZmlndXJhdGlvbiIsIm5vZGVzIiwiZ2FUYXJnZXQiLCJBcnJheSIsInNsaWNlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2VsZWN0b3IiLCJmaXJpbmdFdmVudHMiLCJhcmdzRm9yR2EiLCJyZXNlbGVjdE9uTXV0YXRpb24iLCJnYVRhcmdldHMiLCJub2RlIiwiZ2FDb21tYW5kIiwiZ2FUeXBlIiwiZ2FDYXRlZ29yeSIsImdhQWN0aW9uIiwiZ2FMYWJlbCIsImdldEFyZ3NGb3JHYSIsImhhbmRsZSIsIndpbmRvdyIsImdhIiwiZmlyaW5nRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUxhYmVsIiwiZ2V0QXR0cmlidXRlIiwiZm9vdG5vdGVzIiwiZ2xvYmFsRm9vdG5vdGVzU3RvcmFnZSIsImNvdW50IiwiYWRkIiwiYWRkR2xvYmFsIiwic2V0R2xvYmFsRm9vdG5vdGVzIiwiZ2V0Rm9vdG5vdGVzIiwiZm9vdG5vdGVUZXh0IiwiaWQiLCJ0ZXh0IiwiZ2xvYmFsRm9vdG5vdGVzIiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiIyQkFDRSxJQUFJQSxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVQyxRQUduQyxJQUFJQyxFQUFTSixFQUFpQkUsR0FBWSxDQUN6Q0csRUFBR0gsRUFD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InNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlxuXG5pbnRlcmZhY2UgU2hvcnRjb2RlUGFyc2VyRXh0ZW5zaW9uIHtcbiAgcGFyc2UoIGNvbnRlbnQ6IHN0cmluZywgc2hvcnRjb2RlT2JqZWN0IDogb2JqZWN0LCBtYXRjaDogc3RyaW5nLCBvcmlnaW5hbE1hdGNoOiBzdHJpbmcgKSA6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2Ugc2hvcnRjb2RlT2JqZWN0IHtcbiAgZnVuY3Rpb246IHN0cmluZ1xuICB0ZXh0OiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIFNob3J0Y29kZVBhcnNlciB7XG5cbiAgZXh0ZW5zaW9uczogQXJyYXk8U2hvcnRjb2RlUGFyc2VyRXh0ZW5zaW9uPjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZXh0ZW5zaW9ucyA9IFtdO1xuICAgIHRoaXMucGFyc2UgPSB0aGlzLnBhcnNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5leHRlbmQgPSB0aGlzLmV4dGVuZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcGFyc2UoIGNvbnRlbnQ6c3RyaW5nICkge1xuICAgIGlmICggISBjb250ZW50ICkge1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuICBcbiAgICBsZXQgc2hvcnRjb2RlT2JqZWN0OiBzaG9ydGNvZGVPYmplY3QsXG4gICAgICAgIHJlZ2V4OiBSZWdFeHAsXG4gICAgICAgIG1hdGNoZXM6IEFycmF5PHN0cmluZz4sXG4gICAgICAgIG9yaWdpbmFsTWF0Y2g6IHN0cmluZztcbiAgXG4gICAgLy8gZ2V0IHJlZ2V4IG1hdGNoZXNcbiAgICByZWdleCA9IFJlZ0V4cCgve3tcXHMqKC4qPylcXHMqfX0vZyk7XG4gICAgbWF0Y2hlcyA9IGNvbnRlbnQubWF0Y2gocmVnZXgpO1xuICBcbiAgICBpZiAoIG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggJiYgbWF0Y2hlcy5sZW5ndGggPiAwICkge1xuICAgICAgbWF0Y2hlcy5mb3JFYWNoKG1hdGNoID0+IHtcbiAgXG4gICAgICAgIC8vIHNhdmUgdGhlIG9yaWdpbmFsIG1hdGNoOyB3ZSdsbCBuZWVkIGl0IGxhdGVyXG4gICAgICAgIG9yaWdpbmFsTWF0Y2ggPSBtYXRjaDtcbiAgICAgIFxuICAgICAgICAvLyB0dXJuIHRoZSBmdWxsIG1hdGNoIGludG8gYSBKU09OIHN0cmluZ1xuICAgICAgICBtYXRjaCA9IGB7JHttYXRjaH19YDtcbiAgICAgICAgbWF0Y2ggPSBtYXRjaFxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyYjODIxNjt8JiM4MjE3Oy9nLCBcIidcIilcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mIzgyMjA7fCYjODIyMTsvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mbHQ7L2csICc8JylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97ey8sICcnKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL319LywgJycpO1xuICBcbiAgICAgICAgLy8gYXR0ZW1wdCB0byBwYXJzZSBKU09OIGludG8gYSB2YWxpZCBKU09OIG9iamVjdFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHNob3J0Y29kZU9iamVjdCA9IEpTT04ucGFyc2UoIG1hdGNoICk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIC8vIGhhbmRsZSB0aGUgZGF0YVxuICAgICAgICBpZiAoIHR5cGVvZiBzaG9ydGNvZGVPYmplY3QuZnVuY3Rpb24gIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9ucy5mb3JFYWNoKGV4dGVuc2lvbiA9PiB7XG4gICAgICAgICAgICBjb250ZW50ID0gZXh0ZW5zaW9uLnBhcnNlKGNvbnRlbnQsIHNob3J0Y29kZU9iamVjdCwgbWF0Y2gsIG9yaWdpbmFsTWF0Y2gpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gIFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBleHRlbmQoZXh0ZW5zaW9uOiBTaG9ydGNvZGVQYXJzZXJFeHRlbnNpb24pIHtcbiAgICB0aGlzLmV4dGVuc2lvbnMucHVzaChleHRlbnNpb24pO1xuICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgQ29udGFpbmVyIHtcblxuICBiYWc6IG9iamVjdFxuIFxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJhZyA9IHt9O1xuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5iYWdba2V5XSAhPT0gdW5kZWZpbmVkID8gdGhpcy5iYWdba2V5XSA6IG51bGw7XG4gIH1cblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5iYWdba2V5XSA9IHZhbHVlO1xuICB9XG4gXG59IiwiaW50ZXJmYWNlIEdhVGFyZ2V0Q29uZmlndXJhdGlvbiB7XG4gIHNlbGVjdG9yOiBzdHJpbmdcbiAgZmlyaW5nRXZlbnRzOiBBcnJheTxzdHJpbmc+XG4gIGFyZ3NGb3JHYTogQXJyYXk8c3RyaW5nPlxuICByZXNlbGVjdE9uTXV0YXRpb24/OiBCb29sZWFuXG59XG5cbmludGVyZmFjZSBHYVRhcmdldENvbGxlY3Rpb24ge1xuICBzZWxlY3Rvcjogc3RyaW5nXG4gIGdhVGFyZ2V0czogQXJyYXk8R2FUYXJnZXQ+XG4gIGFyZ3NGb3JHYTogQXJyYXk8c3RyaW5nPlxuICBmaXJpbmdFdmVudHM6IEFycmF5PHN0cmluZz5cbiAgcmVzZWxlY3RPbk11dGF0aW9uOiBCb29sZWFuXG59XG5cbmludGVyZmFjZSBHYVRhcmdldCB7XG4gIG5vZGU6IEVsZW1lbnRcbiAgZ2FDb21tYW5kOiBzdHJpbmdcbiAgZ2FUeXBlOiBzdHJpbmdcbiAgZ2FDYXRlZ29yeTogc3RyaW5nXG4gIGdhQWN0aW9uOiBzdHJpbmdcbiAgZ2FMYWJlbDogc3RyaW5nIFxuICBmaXJpbmdFdmVudHM6IEFycmF5PHN0cmluZz5cbn1cblxuY2xhc3MgR2FUcmFja2VyICB7XG5cbiAgREVCVUc6IEJvb2xlYW47XG4gIGdhVGFyZ2V0Q29uZmlndXJhdGlvbnM6IEFycmF5PEdhVGFyZ2V0Q29uZmlndXJhdGlvbj5cbiAgb2JzZXJ2ZUZvck11dGF0aW9uczogRWxlbWVudFxuICBnYVRhcmdldENvbGxlY3Rpb25zOiBBcnJheTxHYVRhcmdldENvbGxlY3Rpb24+ID0gW107XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIFxuICAgKiBAcGFyYW0ge3ZvaWR9XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIGZsYWcgaWYgeW91IHdhbnQgdG8gY29uc29sZS5sb2cgc3R1ZmYgYW5kXG4gICAgICogbm90IHNlbmQgdG8gR0EuXG4gICAgICogXG4gICAgICovXG4gICAgdGhpcy5ERUJVRyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgRE9NIGVsZW1lbnRzIHlvdSdkIGxpa2UgdG8gYXR0YWNoIGV2ZW50IFxuICAgICAqIGxpc3RlbmVycyB0byBpbiB0aGlzIGFycmF5LlxuICAgICAqIFxuICAgICAqL1xuICAgIHRoaXMuZ2FUYXJnZXRDb25maWd1cmF0aW9ucyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgcGFyZW50IHRvIG9ic2VydmUgZm9yIERPTSBjaGFuZ2VzLlxuICAgICAqIFxuICAgICAqL1xuICAgIHRoaXMub2JzZXJ2ZUZvck11dGF0aW9ucyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZWxlbWVudHMgd2UgYXJlIHRyYWNraW5nLlxuICAgICAqIFxuICAgICAqL1xuICAgIHRoaXMuZ2FUYXJnZXRDb2xsZWN0aW9ucyA9IFtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBCaW5kIG1ldGhvZHNcbiAgICAgKi9cbiAgICB0aGlzLmluaXQgPSB0aGlzLmluaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9ic2VydmVQYXJlbnRXcmFwcGVyID0gdGhpcy5vYnNlcnZlUGFyZW50V3JhcHBlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGFyZW50V3JhcHBlck9ic2VydmVyID0gdGhpcy5wYXJlbnRXcmFwcGVyT2JzZXJ2ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uUGFyZW50V3JhcHBlclVwZGF0ZSA9IHRoaXMub25QYXJlbnRXcmFwcGVyVXBkYXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVHYVRhcmdldENvbGxlY3Rpb24gPSB0aGlzLmNyZWF0ZUdhVGFyZ2V0Q29sbGVjdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlR2FUYXJnZXRJbnN0YW5jZSA9IHRoaXMuY3JlYXRlR2FUYXJnZXRJbnN0YW5jZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5nZXROb2RlR2FMYWJlbCA9IHRoaXMuZ2V0Tm9kZUdhTGFiZWwuYmluZCh0aGlzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGluaXRcbiAgICogXG4gICAqIFN0YXJ0IHVwIHRoZSB0cmFja2VyLiBTZXQgY29uZmlndXJhdGlvbiBzZXR0aW5ncyBcbiAgICogYW5kIHJlZ2lzdGVyIHJlYWN0aXZlIGVsZW1lbnRzLlxuICAgKiBcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZ1xuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgaW5pdChjb25maWc6IHtERUJVRzogZmFsc2UsIG9ic2VydmVGb3JNdXRhdGlvbnM6IG51bGwsIGdhVGFyZ2V0Q29uZmlndXJhdGlvbnM6IEFycmF5PEdhVGFyZ2V0Q29uZmlndXJhdGlvbj59KSB7XG5cbiAgICAvLyB0YWtlIGNhcmUgb2YgY29uZmlndXJhdGlvbiBzZXR0aW5nc1xuICAgIGlmICggY29uZmlnICkge1xuICAgICAgT2JqZWN0LmtleXMoY29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpc1trZXldID0gY29uZmlnW2tleV07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnaW5pdDogJywgdGhpcyk7XG5cbiAgICAvLyBjcmVhdGUgYW4gYXJyYXkgb2YgR2FUYXJnZXRDb2xsZWN0aW9uc1xuICAgIHRoaXMuZ2FUYXJnZXRDb2xsZWN0aW9ucyA9IHRoaXMuZ2FUYXJnZXRDb25maWd1cmF0aW9ucy5tYXAoZ2FUYXJnZXRDb25maWcgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlR2FUYXJnZXRDb2xsZWN0aW9uKGdhVGFyZ2V0Q29uZmlnKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9ic2VydmVGb3JNdXRhdGlvbnMpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZVBhcmVudFdyYXBwZXIoKTtcbiAgICB9XG4gIH1cblxuICAvLyBvYnNlcnZlIHRoZSBzcGVjaWZpZWQgcGFyZW50IHdyYXBwZXIgZm9yIERPTSBjaGFuZ2VzXG4gIG9ic2VydmVQYXJlbnRXcmFwcGVyKCkge1xuICAgIHRoaXMucGFyZW50V3JhcHBlck9ic2VydmVyKCkub2JzZXJ2ZSh0aGlzLm9ic2VydmVGb3JNdXRhdGlvbnMsIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gcmV0dXJuIHRoZSBpbnN0YW5jZSBvZiB0aGUgbXV0YXRpb24gb2JzZXJ2ZXJcbiAgcGFyZW50V3JhcHBlck9ic2VydmVyKCkge1xuICAgIHJldHVybiBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLm9uUGFyZW50V3JhcHBlclVwZGF0ZSk7XG4gIH1cblxuICAvLyB3aGVuIERPTSBjaGFuZ2VzIGFyZSBkZXRlY3RlZCB3aXRoaW4gdGhlIHNwZWNpZmllZFxuICAvLyBwYXJlbnQgd3JhcHBlclxuICBvblBhcmVudFdyYXBwZXJVcGRhdGUobXV0YXRpb25zOiBBcnJheTxNdXRhdGlvblJlY29yZD4sIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgY29uc29sZS5sb2coJ211dGF0aW9uOiAnLCBtdXRhdGlvbnMpO1xuICB9XG5cbiAgLy8gaGFuZGxlIHRoZSBnYUV2ZW50Q29uZmlnIGNvbmZpZ3VyYXRpb25cbiAgY3JlYXRlR2FUYXJnZXRDb2xsZWN0aW9uKGdhVGFyZ2V0Q29uZmlndXJhdGlvbjogR2FUYXJnZXRDb25maWd1cmF0aW9uKSB7XG5cbiAgICBsZXQgbm9kZXM6IEFycmF5PEVsZW1lbnQ+LFxuICAgICAgICBnYVRhcmdldDogR2FUYXJnZXQsXG4gICAgICAgIGdhVGFyZ2V0Q29sbGVjdGlvbjogR2FUYXJnZXRDb2xsZWN0aW9uO1xuXG4gICAgbm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGdhVGFyZ2V0Q29uZmlndXJhdGlvbi5zZWxlY3RvcikpO1xuXG4gICAgZ2FUYXJnZXRDb2xsZWN0aW9uID0ge1xuXG4gICAgICAvLyBzZXQgdGhlc2UgZ3JvdXAgcHJvcGVydGllc1xuICAgICAgc2VsZWN0b3I6IGdhVGFyZ2V0Q29uZmlndXJhdGlvbi5zZWxlY3RvcixcbiAgICAgIGZpcmluZ0V2ZW50czogZ2FUYXJnZXRDb25maWd1cmF0aW9uLmZpcmluZ0V2ZW50cyxcbiAgICAgIGFyZ3NGb3JHYTogZ2FUYXJnZXRDb25maWd1cmF0aW9uLmFyZ3NGb3JHYSxcbiAgICAgIHJlc2VsZWN0T25NdXRhdGlvbjogZ2FUYXJnZXRDb25maWd1cmF0aW9uLnJlc2VsZWN0T25NdXRhdGlvbiB8fCBmYWxzZSxcblxuICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IG9mIGdhVGFyZ2V0c1xuICAgICAgZ2FUYXJnZXRzOiBub2Rlcy5tYXAobm9kZSA9PiB7XG4gICAgICAgIGdhVGFyZ2V0ID0gdGhpcy5jcmVhdGVHYVRhcmdldEluc3RhbmNlKG5vZGUsIGdhVGFyZ2V0Q29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoZ2FUYXJnZXQpO1xuICAgICAgICByZXR1cm4gZ2FUYXJnZXQ7XG4gICAgICB9KVxuICAgIH07XG5cbiAgICByZXR1cm4gZ2FUYXJnZXRDb2xsZWN0aW9uO1xuICB9XG5cbiAgY3JlYXRlR2FUYXJnZXRJbnN0YW5jZShub2RlOiBFbGVtZW50LCBjb25maWc6IEdhVGFyZ2V0Q29uZmlndXJhdGlvbikge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVHYVRhcmdldEluc3RhbmNlOiAnLCBjb25maWcpO1xuICAgIGxldCBnYVRhcmdldCA9IHtcbiAgICAgIG5vZGU6IG5vZGUsXG4gICAgICBmaXJpbmdFdmVudHM6IGNvbmZpZy5maXJpbmdFdmVudHMsXG4gICAgICBnYUNvbW1hbmQ6IGNvbmZpZy5hcmdzRm9yR2FbMF0sXG4gICAgICBnYVR5cGU6IGNvbmZpZy5hcmdzRm9yR2FbMV0sXG4gICAgICBnYUNhdGVnb3J5OiBjb25maWcuYXJnc0ZvckdhWzJdLFxuICAgICAgZ2FBY3Rpb246IGNvbmZpZy5hcmdzRm9yR2FbM10sXG4gICAgICBnYUxhYmVsOiBjb25maWcuYXJnc0ZvckdhWzRdLFxuICAgICAgZ2V0QXJnc0ZvckdhOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBbZ2FUYXJnZXQuZ2FDb21tYW5kLCBnYVRhcmdldC5nYVR5cGUsIGdhVGFyZ2V0LmdhQ2F0ZWdvcnksIGdhVGFyZ2V0LmdhQWN0aW9uLCBnYVRhcmdldC5nYUxhYmVsXTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGdhVGFyZ2V0LmdhTGFiZWwgPSB0aGlzLmdldE5vZGVHYUxhYmVsKGdhVGFyZ2V0KTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKGdhVGFyZ2V0KTtcbiAgICByZXR1cm4gZ2FUYXJnZXQ7XG4gIH1cblxuXG4gIC8vIEhhbmRsZSBlYWNoIERPTSBlbGVtZW50XG4gIGFkZEV2ZW50TGlzdGVuZXJzKCBnYVRhcmdldDogR2FUYXJnZXQgKSB7XG5cbiAgICBsZXQgaGFuZGxlID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuREVCVUcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dhVGFyZ2V0OiAnLCBnYVRhcmdldCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cuZ2EoLi4uZ2FUYXJnZXQuZ2V0QXJnc0ZvckdhKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdhVGFyZ2V0LmZpcmluZ0V2ZW50cy5mb3JFYWNoKGZpcmluZ0V2ZW50ID0+IHtcbiAgICAgIGdhVGFyZ2V0Lm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihmaXJpbmdFdmVudCwgaGFuZGxlKTtcbiAgICB9KTtcblxuICB9XG5cblxuICBnZXROb2RlR2FMYWJlbChnYVRhcmdldDogR2FUYXJnZXQpIHtcblxuICAgIGxldCBnYUxhYmVsLFxuICAgICAgICBub2RlTGFiZWwgPSBnYVRhcmdldC5ub2RlLmdldEF0dHJpYnV0ZSgnZ2EtbGFiZWwnKTtcblxuICAgIGlmIChub2RlTGFiZWwpIHtcbiAgICAgIGdhTGFiZWwgPSBnYVRhcmdldC5nYUxhYmVsLnJlcGxhY2UoL3t7XFxzKmxhYmVsXFxzKn19L2dpLCBub2RlTGFiZWwpO1xuICAgIH1cblxuICAgIHJldHVybiBnYUxhYmVsO1xuICB9XG5cbn1cblxuY29uc3QgZ2FUcmFja2VyID0gbmV3IEdhVHJhY2tlcigpO1xuZXhwb3J0IHsgZ2FUcmFja2VyIH07IiwiaW50ZXJmYWNlIEZvb3Rub3RlIHtcbiAgaWQ6IG51bWJlclxuICB0ZXh0Pzogc3RyaW5nXG4gIGdsb2JhbEtleT8gOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIEZvb3Rub3RlcyB7XG5cbiAgZm9vdG5vdGVzOiBBcnJheTxGb290bm90ZT5cbiAgZ2xvYmFsRm9vdG5vdGVzU3RvcmFnZTogb2JqZWN0XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mb290bm90ZXMgPSBbXTtcbiAgICB0aGlzLmdsb2JhbEZvb3Rub3Rlc1N0b3JhZ2UgPSB7fTtcbiAgICB0aGlzLmNvdW50ID0gdGhpcy5jb3VudC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWRkID0gdGhpcy5hZGQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFkZEdsb2JhbCA9IHRoaXMuYWRkR2xvYmFsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRHbG9iYWxGb290bm90ZXMgPSB0aGlzLnNldEdsb2JhbEZvb3Rub3Rlcy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZ2V0Rm9vdG5vdGVzID0gdGhpcy5nZXRGb290bm90ZXMuYmluZCh0aGlzKTtcbiAgfVxuICBcbiAgY291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9vdG5vdGVzLmxlbmd0aDtcbiAgfVxuICBcbiAgYWRkKGZvb3Rub3RlVGV4dDogc3RyaW5nKSB7XG4gICAgbGV0IGlkID0gdGhpcy5jb3VudCgpICsgMTtcbiAgICB0aGlzLmZvb3Rub3Rlcy5wdXNoKHtpZDogaWQsIHRleHQ6IGZvb3Rub3RlVGV4dH0pO1xuICB9XG5cbiAgc2V0R2xvYmFsRm9vdG5vdGVzKGdsb2JhbEZvb3Rub3RlczogQXJyYXk8eyBrZXk6IHN0cmluZywgdGV4dDogc3RyaW5nIH0+KSB7XG4gICAgdGhpcy5nbG9iYWxGb290bm90ZXNTdG9yYWdlID0gZ2xvYmFsRm9vdG5vdGVzO1xuICB9XG5cbiAgYWRkR2xvYmFsKGtleTogc3RyaW5nKSB7XG4gICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCB0aGlzLmdsb2JhbEZvb3Rub3Rlc1N0b3JhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSApIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuYWRkKHRoaXMuZ2xvYmFsRm9vdG5vdGVzU3RvcmFnZVtrZXldKTtcbiAgICB9XG4gIH1cblxuICBnZXRGb290bm90ZXMoKSB7XG4gICAgaWYgKCB0aGlzLmZvb3Rub3Rlcy5sZW5ndGggPiAwICkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9vdG5vdGVzO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59IiwiLy9leHBvcnQgKiBmcm9tICcuL2Zvb3Rub3Rlcyc7XG5leHBvcnQgKiBmcm9tICcuL3Nob3J0Y29kZS1wYXJzZXIvU2hvcnRjb2RlUGFyc2VyJztcbmV4cG9ydCAqIGZyb20gJy4vY29udGFpbmVyL0NvbnRhaW5lcic7XG5leHBvcnQgKiBmcm9tICcuL2dhLXRyYWNrZXIvR2FUcmFja2VyJztcbmV4cG9ydCAqIGZyb20gJy4vZm9vdG5vdGVzL0Zvb3Rub3Rlcyc7Il0sInNvdXJjZVJvb3QiOiIifQ==