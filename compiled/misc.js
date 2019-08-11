"use strict";
exports.__esModule = true;
/*
  Shuffle array in place
*/
exports.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * array.length);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};
