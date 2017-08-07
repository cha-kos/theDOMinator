# theDOMinator

The DOMinator is an open source lean DOM manipulation library inspired by jQuery. This library enables users to

  * Select single or multiple DOM elements
  * Manipulate and Traverse DOM element's ```innerHTML```, class, etc.
  * Perform AJAX requests


## Getting Started

To use theDOMinator library, simply clone the github repo into your existing project and include ```theDOMinator.js``` file in the head of your Index or Root html file as so:

```html
  <script type="text/javascript" src="lib/theDOMinator.js"></script>
```
Remember to properly navigate from your HTML file to the ```theDOMinator.js``` file for the script to be included.

##theDOMinator API

theDOMinator is built using a custom class called ```DOMNodeCollection```. All functions used within theDOMinator will return an instance of ```DOMNodeCollection```.

### `$l(selector)`

The core function, ```$l(selector)```, receives one argument and returns a array like object otherwise known as a ```NodeList```. Depending on wether your ```(selector)``` argument is a string, HTML element, Array, or function, the ```DOMNodeCollection``` collection will return the correct ```NodeList``` based on the argument passed in as the ```(selector)```.

``` js
  $l = function(argument){
    //if HTML element
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
  ```
### `DOMNodeCollection.prototype methods`


#### ```html(argument)```

  Using the selector and calling the ```html``` method without an argument will return the ```innerHTML ```of the selected DOM. If an argument is provided, the ```innerHTML``` of the selected DOM will be replaced with the provided argument.

#### ```empty()```

  This function clears out the ```innerHTML``` of the selected DOM.

#### ```append(argument)```

  Append accepts an HTML element, theDOMinator wrapped collection, or string. The ```outerHTML``` of each element provided in the argument is then appended to the ```innerHTML``` of each element in the ```DOMNodeCollection```.

#### ```attribute(attributeName, value)```

  For the attribute function you must pass in two arguments. ```attributeName``` to select the attribute of the DOMNodeCollection. Passed in as an argument alone, this will return the ```value``` corresponding to the ```attributeName``` of the first element of the DOMNodeCollection. If a ```value``` is also passed in, The ```attributeName``` is then set equal to the passed in ```value``` for all elements in the DOMNodeCollection.


  ```js

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
