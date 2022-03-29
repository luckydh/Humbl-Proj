#!/usr/bin/env node

var fs = require("fs");

// Read project.pbxproj.xml
fs.readFile("./ios/App/App.xcodeproj/project.pbxproj", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log("Reading project.pbxproj file");

  // Get extract CURRENT_PROJECT_VERSION from project.pbxproj filE
  var res = data.match(/CURRENT_PROJECT_VERSION\s=\s\d/g);

  function getProject(obj) {
    // Seperate Number from string
    var currentProjectVersionString = obj[0].match(/CURRENT_PROJECT_VERSION\s=/g);
    var currentProjectVersionNumber = parseInt(obj[0].match(/([^\d]|^)\d{1}([^\d]|$)/g));

    // Increment number and combine string with new incremented number
    var incrementProjectNumber = currentProjectVersionNumber + 1;
    var fullversion1 = currentProjectVersionString + " " + incrementProjectNumber;

    // Replace old version number with new version number.
    var newVersion = data.replace(data.match(/CURRENT_PROJECT_VERSION\s=\s\d/), [
      fullversion1,
    ]);
    return newVersion;
  }

  var versionNumber = getProject(res);

  fs.writeFile(
    "./ios/App/App.xcodeproj/project.pbxproj",
    versionNumber,
    "utf8",
    function (err) {
      if (err) return console.log(err);
    }
  );

  console.log("Build number successfully incremented!");
});
