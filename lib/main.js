const DOMNodeCollection = require("./dom_node_collection.js");

const funcQueue = [];

document.addEventListener("DOMContentLoaded", () => {
  funcQueue.forEach ((func) => {
    func();
  });
});

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


$l.extend = function(...objects) {
  let mergedObj = {};
  objects.forEach( (obj)  => {
    for (var key in obj) {
      mergedObj[key] = obj[key];
    }
  });
  return mergedObj;
};


$l.ajax = function(options) {
  requestObject = {
    method: 'GET',
    url: window.location.origin,
    success: () => console.log('success'),
    error: (err) => console.log(err)
  };

  $l.extend(requestObject, options);

  const xhr = new XMLHttpRequest();
  xhr.open(requestObject[method], requestObject[url]);
  xhr.onload = function () {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };
  xhr.send();
};
