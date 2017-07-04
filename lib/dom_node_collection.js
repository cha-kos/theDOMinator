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
      debugger
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


// let lis = $l('li');
// let testli = lis.elArray[0];
// let testliDOM = $l(testli);
// let theUl = $l('ul');
module.exports = DOMNodeCollection;
