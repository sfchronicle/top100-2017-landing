require("./lib/social"); //Do not delete


console.log(textData);
console.log(mapData);
console.log(photoData);

var len = Object.keys(textData).length;
var keys = Object.keys(textData);

for (var idx=0; idx<len; idx++){
  console.log(keys[idx]);
  console.log(textData[keys[idx]]);
  photoData.forEach(function(photo) {
    if (photo.id == keys[idx]) {

  });

}
