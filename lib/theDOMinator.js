/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elArray) {
    this.elArray = elArray;
  }

  html(string){
    if (string !== undefined){
      this.elArray.forEach (el => {
        el.innerHTML = string;
      });
    } else {
      return this.elArray[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

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

  attr(attributeName, value) {
    if (value === undefined) {
      let firstEl = this.elArray[0];
      return firstEl.getAttribute(attributeName);
    } else {
      this.elArray.forEach( (el) => {
        el.setAttribute(attributeName, value);
      });
    }
  }

  toggleClass(className) {
    this.elArray.forEach( (el) => {
      el.className = className;
    });
  }

  addClass(className) {
    this.elArray.forEach( (el) => {
      el.classList.add(className);
    });
  }


  removeClass(className) {
    this.elArray.forEach ( (el) => {
      el.classList.remove(className);
    });
  }

  children() {
    let childrenarr = [];
    this.elArray.forEach( (el) => {
      childrenarr = childrenarr.concat(Array.prototype.slice.call(el.children));
    });
    if (childrenarr.length === 0) {
      return null;
    } else {
      return new DOMNodeCollection(childrenarr);
    }
  }

  parent() {
    let parentarr = [];
    this.elArray.forEach( (el) => {
      parentarr.push(el.parentElement);
    });
    return new DOMNodeCollection(parentarr);
  }

  find(selector) {
    let findArr = [];
    this.elArray.forEach ( (el) => {
      const nodeList = el.querySelectorAll(selector);
      findArr = findArr.concat([].slice.call(nodeList));
    });
    return new DOMNodeCollection(findArr);
  }

  remove(){
    this.elArray.forEach(el => {
      el.remove();
    });
    this.elArray = [];
  }

  on(eve, callback){
    this.elArray.forEach(el => {
      el.addEventListener(eve, callback);
      el[eve] = callback;
    });
  }

  off(eve){
    this.elArray.forEach(el => {
      el.removeEventListener(eve, el[eve]);
    });
  }
}


module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

const funcQueue = [];

document.addEventListener("DOMContentLoaded", () => {
  funcQueue.forEach ((func) => {
    func();
  });
  console.log('You have initiated theDOMinator');
});

$l = function(argument){
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


$l.extend = function(...objects) {
  let mergedObj = {};
  objects.forEach( (obj)  => {
    for (var key in obj) {
      mergedObj[key] = obj[key];
    }
  });
  return mergedObj;
};



$l.ajax = function(options){
  return new Promise((resolve, reject) => {

  const xhr = new XMLHttpRequest();

  let defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: ``,
    dataType: "JSON",
    success: (s) => console.log("No success Callback"),
    error: (e) => console.log("No Error Callback"),
  };

  options = $l.extend(defaults, options);

  xhr.open( options.method, options.url);
  xhr.onload = () => {
    if(xhr.status === 200){
       options.success(xhr.response);
       resolve(xhr.response);
    } else {
      options.error(xhr.response);
      reject(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data));
});
};


/***/ })
/******/ ]);