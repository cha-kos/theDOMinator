const DOMNodeCollection = require("./methods.js");

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
