module.exports = function(self, grunt){
  //var path  = require('path'),
  //    fs    = require('fs');

  self.files.forEach(function(set) {
    var single = grunt.file.read(set.dest);
    console.log(set.dest);

    set.src.filter(function(filepath) {
      var current = grunt.file.read(filepath);
      //grunt.log.writeln(filepath + " \t\t\t " + set.dest);
    });
  });





  // get single

  // for each in folder

    // attach single to file
}