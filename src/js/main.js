require("./lib/social"); //Do not delete

// var len = Object.keys(textData).length;
// var keys = Object.keys(textData);

// fucntion to find minimum
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

// setting up drop-down menus -------------------------------------------------

// cuisines drop-down -----------------
var cuisines = ["American","Chinese","Drink-centric","French","Greek","Hawaiian","Indian","International","Italian","Japanese","Mediterranean","Mexican","Moroccan",  "Northern California","Seafood","Spanish","Thai","Vietnamese"];
var selCuisine = document.getElementById('select-cuisine');
for(var i = 0; i < cuisines.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = cuisines[i];
    opt.value = cuisines[i].toLowerCase().replace(/ /g,'');
    selCuisine.appendChild(opt);
}

// regions drop-down -------------------
var regions = ["East Bay","North Bay","San Francisco","South Bay"];
var selRegion = document.getElementById('select-region');
for(var i = 0; i < regions.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = regions[i];
    opt.value = regions[i].toLowerCase().replace(/ /g,'');
    selRegion.appendChild(opt);
}

// neighborhoods drop-down ------------------
var neighborhoods = ["Berkeley","Burlingame","Castro","Chinatown","Civic Center","Cow Hollow","Daly City",
"Embarcadero","Fairfax","Financial District","Hayes Valley","Healdsburg","Los Gatos","Lower Pacific Heights","Marina","Mid-Market","Mission","Napa","Nob Hill","Noe Valley","NoPa","North Beach","Oakland","Pacific Heights","Port Costa","Presidio","Russian Hill","Sausalito","SoMa","St. Helena","Tenderloin","The Richmond","Union Square","Western Addition","Yountville"];
var selNeighborhoods = document.getElementById('select-neighborhood');
for(var i = 0; i < neighborhoods.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = neighborhoods[i];
    opt.value = neighborhoods[i].toLowerCase().replace(/ /g,'');
    selNeighborhoods.appendChild(opt);
}

// putting event listeners on all the filters ---------------------------------------

var cuisine_flag = 1, region_flag = 1, neighborhood_flag = 1, flag_min = 1;

function check_filters() {

  var count = 0;

  $(".restaurant").filter(function() {

    // check all the classes for the restaurant
    var classes = this.className.toLowerCase().split(" ");

    // check cuisine
    if (selCuisine.value != "all"){
      cuisine_flag = (classes.indexOf(selCuisine.value)>0)
    } else {
      cuisine_flag = 1;
    }

    // check region
    if (selRegion.value != "all"){
      region_flag = (classes.indexOf(selRegion.value)>0)
    } else {
      region_flag = 1;
    }

    // check neighborhood
    if (selNeighborhoods.value != "all"){
      neighborhood_flag = (classes.indexOf(selNeighborhoods.value)>0)
    } else {
      neighborhood_flag = 1;
    }

    flag_min = [cuisine_flag, region_flag, neighborhood_flag].min();

    if (flag_min == 1){
      $(this).addClass("active");
      count += 1;
    } else {
      $(this).removeClass("active");
    }

  });

  // display text for empty search results
  if (count > 0) {
    document.getElementById('search-noresults').classList.add("hide");
  } else {
    document.getElementById('search-noresults').classList.remove("hide");
  }

};

// event listener for cuisine drop down
selCuisine.addEventListener("change",function(){
  check_filters();
});

// event listener for region drop down
selRegion.addEventListener("change",function(){
  check_filters();
});

// event listener for region drop down
selNeighborhoods.addEventListener("change",function(){
  check_filters();
});
