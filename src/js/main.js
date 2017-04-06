require("./lib/social"); //Do not delete

// var len = Object.keys(textData).length;
// var keys = Object.keys(textData);

var cuisines = ["American","Chinese","Drink-centric","French","Greek","Hawaiian","Indian","International","Italian","Japanese","Mediterranean","Mexican","Moroccan",  "Northern California","Seafood","Spanish","Thai","Vietnamese"];

var selCuisine = document.getElementById('select-cuisine');
for(var i = 0; i < cuisines.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = cuisines[i];
    opt.value = cuisines[i].toLowerCase().replace(/ /g,'');
    selCuisine.appendChild(opt);
}

var regions = ["North Bay","East Bay","South Bay","San Francisco"];
var selRegion = document.getElementById('select-region');
for(var i = 0; i < regions.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = regions[i];
    opt.value = regions[i].toLowerCase().replace(/ /g,'');
    selRegion.appendChild(opt);
}

var neighborhoods = ["Berkeley","Burlingame","Castro","Chinatown","Civic Center","Cow Hollow","Daly City",
"Embarcadero","Fairfax","Financial District","Hayes Valley","Healdsburg","Los Gatos","Lower Pacific Heights","Marina","Mid-Market","Mission","Napa","Nob Hill","Noe Valley","NoPa","North Beach","Oakland","Pacific Heights","Port Costa","Presidio","Russian Hill","Sausalito","SoMa","St. Helena","Tenderloin","The Richmond","Union Square","Western Addition","Yountville"];
var selNeighborhoods = document.getElementById('select-neighborhood');
for(var i = 0; i < neighborhoods.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = neighborhoods[i];
    opt.value = neighborhoods[i].toLowerCase().replace(/ /g,'');
    selNeighborhoods.appendChild(opt);
}
