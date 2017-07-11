# theDOMinator

A lean DOM manipulation software inspired by jQuery.

## Implementation

- Uses Vanilla JavaScript to create simplified and convenient methods for quick and easy DOM manipulation. Check out the live version for a
demo of appending to DOM objects along with toggling classes to instantly change DOM attributes.

``` js

  window.$l = function(argument){
    //if HTMLElement
    if (argument instanceof HTMLElement) {
      return new DOMNodeCollection([argument]);
    // if String
    }else if (typeof argument === 'string'){
      let nodeList = document.querySelectorAll(argument);
      return new DOMNodeCollection(Array.prototype.slice.call(nodeList));
    // if Array of HTMLElements
    } else if (Array.isArray(argument)){
      return new DOMNodeCollection(argument);
    //if Function
    } else if (typeof argument === 'function'){

      if (document.readyState === 'complete') {
        return func();
      } else {
        funcQueue.push(argument);
      }
    } else {
      console.log("error");
    }
  };

  append(argument) {
    if (argument instanceof HTMLElement){
      argument = $l(argument);
    }

    if (typeof argument === 'string') {
      this.elArray.forEach( (outerEl) => {
          outerEl.innerHTML += argument;
      });
    } else {
      this.elArray.forEach( (outerEl) => {
        argument.elArray.forEach( (innerEl) => {
          outerEl.innerHTML += innerEl.outerHTML;
        });
      });
    }
  }
  
    toggleClass(className) {
    this.elArray.forEach( (el) => {
      el.className = className;
    });
  }

```

