require("./lib/social"); //Do not delete

// var len = Object.keys(textData).length;
// var keys = Object.keys(textData);

// function to find minimum
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

console.log(mapData);

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

// noise drop-down ---------------------------
var selNoise = document.getElementById('select-noise');

// cost drop-down ---------------------------
var selPrice = document.getElementById('select-price');

// putting event listeners on all the filters ---------------------------------------

var cuisine_flag = 1, region_flag = 1, neighborhood_flag = 1, new_flag = 1, brunch_flag = 1, alcohol_flag = 1, noise_flag = 1, price_flag = 1, flag_min = 1;

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

    // check noise
    if (selNoise.value != "all"){
      noise_flag = (classes.indexOf(selNoise.value)>0)
    } else {
      noise_flag = 1;
    }

    // check price
    if (selPrice.value != "all"){
      price_flag = (classes.indexOf(selPrice.value)>0)
    } else {
      price_flag = 1;
    }

    // check for new restaurants
    if (new_button.value != "all"){
      new_flag = (classes.indexOf(new_button.value)>0)
    } else {
      new_flag = 1;
    }

    // check for restaurants serving brunch
    if (brunch_button.value != "all"){
      brunch_flag = (classes.indexOf(brunch_button.value)>0)
    } else {
      brunch_flag = 1;
    }

    flag_min = [cuisine_flag, region_flag, neighborhood_flag, new_flag, brunch_flag, noise_flag, price_flag, alcohol_flag].min();

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

// event listener for neighborhoods drop down
selNeighborhoods.addEventListener("change",function(){
  check_filters();
});

// event listener for noise drop down
selNoise.addEventListener("change",function(){
  check_filters();
});

// event listener for prices drop down
selPrice.addEventListener("change",function(){
  check_filters();
});

// event listener for "New" button
function toggle_new(b){b.value=(b.value=="new")?"all":"new";}
var new_button = document.getElementById('new');
new_button.value = "all";
new_button.addEventListener("click",function() {
  toggle_new(this);
  $(this).toggleClass("selected");
  check_filters();
});

// event listener for "Brunch" button
function toggle_brunch(b){b.value=(b.value=="brunch")?"all":"brunch";}
var brunch_button = document.getElementById('brunch');
brunch_button.value = "all";
brunch_button.addEventListener("click",function() {
  toggle_brunch(this);
  $(this).toggleClass("selected");
  check_filters();
});

// saving restaurants as favorites ------------------------------------------------

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
qsa(".save-restaurant").forEach(function(restaurant,index) {
  restaurant.addEventListener("click", function(e) {
    console.log(restaurant.id);
    $("i", this).toggleClass("fa-star-o fa-star");
  });
});
