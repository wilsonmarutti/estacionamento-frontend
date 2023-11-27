
// Add global polyfills here

// Polyfill for Array.prototype.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement: any, fromIndex?: any) {
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    const O = Object(this);
    const len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }

    const n = fromIndex ? parseInt(fromIndex, 10) : 0;
    let k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }

    let currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }

    return false;
  };
}

// Add more polyfills here if needed

