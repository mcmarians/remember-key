var lists = [];
var fs = require("fs");
function loadLists(callback) {
    if (lists.length == 0) {
        //Load the lists
        fs.readdir(__dirname + "/word-lists/", function (err, files) {
            if (err) throw err;
            for (var i = 0; i < files.length; i++) {
                lists.push(fs.readFileSync(__dirname + "/word-lists/" + files[i]).toString().split("\n"));
            }
            callback();
        });
    } else {
        callback();
    }
}


module.exports.generate = function (callback) {
    loadLists(function () {
        var password = "";
        //Loop through the lists and randomly choose a word
        for (var i = 0; i < lists.length; i++) {
            if (password == "") {
                password = lists[i][randomIntInc(0, lists[i].length - 1)];
            } else {
                password = password + "_" + lists[i][randomIntInc(0, lists[i].length - 1)];
            }
        }
        callback(password);
    });
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
