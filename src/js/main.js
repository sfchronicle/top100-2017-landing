require("./lib/social"); //Do not delete


// function to find minimum
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

//

// search bar code -------------------------------------------------------------

// searchbar code
$("#searchrestaurants").bind("input propertychange", function () {
  var filter = $(this).val().toLowerCase().replace(/ /g,'');
  console.log(filter);
  var class_match = 0;
  var count = 0;

  var button_list = document.getElementsByClassName("button");
  for (var i=0; i<button_list.length; i++) {
    button_list[i].classList.remove("selected");
  };
  if (filter == "") {
    document.getElementById("showall").classList.add("selected");
  }

  selCuisine.selectedIndex = 0;
  selNeighborhoods.selectedIndex = 0;
  selNoise.selectedIndex = 0;
  selPrice.selectedIndex = 0;

  $(".restaurant").filter(function() {

    var classes = this.className.split(" ");
    for (var i=0; i< classes.length; i++) {

      var current_class = classes[i].toLowerCase();
      if ( current_class.match(filter)) {
        class_match = class_match + 1;
      }
    }
    if (class_match > 0) {
      $(this).addClass("active");
      count+=1;
    } else {
      $(this).removeClass("active");
    }
    class_match = 0;

  });

  // display text for empty search results
  if (count > 0) {
    document.getElementById('search-noresults').classList.add("hide");
  } else {
    document.getElementById('search-noresults').classList.remove("hide");
  }

});

// check for log on information ------------------------------------------------
var edbId;
function setCheckUser(delay, repetitions, success, error) {
  var x = 0;
  var intervalID = window.setInterval(function () {
    // loop while waiting for syncPaymeterSdk to load
    if ( window.syncPaymeterSdk ) {
      window.clearInterval( intervalID );
      var a = window.syncPaymeterSdk;
      a.events.registerHandler( a.events.onAuthorizeSuccess, function () {
       // set callback for completion of authorization
        if ( treg.identity.edbId ) {
          if ( success && typeof(success) === "function" ) {
            success(treg.identity);
          }
        } else {
          if ( error && typeof(error) === "function" ) {
            error();
          }
        }
      });
    } else if ( ++x === repetitions ) {
      window.clearInterval( intervalID );
      if ( error && typeof(error) === "function" ) {
        error();
      }
    }
  }, delay );
}
function errorCallBack() {
  console.log("error");
  $("#nouser").removeClass("hidden");
}
function successCallBack(identity) {
  console.log("success");
  edbId = identity.edbId;
  console.log(edbId);
  // $("#userwelcome").html("Welcome " + identity.displayName);
  // $("#founduser").removeClass("hidden");
  getData();
//  console.log(savedData);
}

var result = setCheckUser( 500, 5, successCallBack, errorCallBack );

// retreive data
var savedData;
function getData() {
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "https://hcyqzeoa9b.execute-api.us-west-1.amazonaws.com/v1/top100/2017/checklist/" + edbId,
    error: function(msg) { console.log("fail"); },
    success: function(data) { console.log("success"); savedData = data; console.log(savedData);}
  });
}



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
$('#select-cuisine').on('change', function(){
    $('body,html').animate({ scrollTop: $('#restaurants').position().top },500);
});

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

// function to show all restaurants ------------------------------------------------------------------

function showall_function() {

  var button_list = document.getElementsByClassName("button");
  for (var i=0; i<button_list.length; i++) {
    button_list[i].classList.remove("selected");
  };

  document.getElementById("showall").classList.add("selected");

  document.getElementById('searchrestaurants').value = "";

  selCuisine.selectedIndex = 0;
  selNeighborhoods.selectedIndex = 0;
  selNoise.selectedIndex = 0;
  selPrice.selectedIndex = 0;

  $(".restaurant").filter(function() {
    $(this).addClass("active");
  });

}

// function to assess all the filters when user picks a new one ---------------------------------------

var cuisine_flag = 1, neighborhood_flag = 1, new_flag = 1, brunch_flag = 1, alcohol_flag = 1, noise_flag = 1, price_flag = 1, flag_min = 1;

function check_filters() {

  document.getElementById('searchrestaurants').value = "";

  var count = 0;
  showall_button.classList.remove("selected");

  $(".restaurant").filter(function() {

    // check all the classes for the restaurant
    var classes = this.className.toLowerCase().split(" ");

    // check cuisine
    if (selCuisine.value != "all"){
      cuisine_flag = (classes.indexOf(selCuisine.value)>0)
    } else {
      cuisine_flag = 1;
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

    // see if the restaurant satisfies all conditions set by user
    flag_min = [cuisine_flag, neighborhood_flag, new_flag, brunch_flag, noise_flag, price_flag, alcohol_flag].min();

    // show it if yes
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

// event listeners for all the filters -------------------------------------------------

// event listener for cuisine drop down
selCuisine.addEventListener("change",function(){
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

// event listener for "New" button
var showall_button = document.getElementById('showall');
showall_button.addEventListener("click",function() {
  $(this).toggleClass("selected");
  showall_function();
  // check_filters();
});

// saving restaurants as favorites ------------------------------------------------

if (savedData) {
  var restaurantList = savedData;
} else {
  var restaurantList = [];
}

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
qsa(".save-restaurant").forEach(function(restaurant,index) {
  restaurant.addEventListener("click", function(e) {
    console.log(restaurant.id);
    $("i", this).toggleClass("fa-star-o fa-star");


    // save new data
    restaurantList.push(restaurant.id);
    var newSavedData = {edbId:edbId,restaurants:restaurantList};
    console.log("SENDING DATA ");
    // savedData.push()
    console.log(JSON.stringify(newSavedData));
    $.ajax({
      method: "POST",
      data: JSON.stringify(newSavedData),
      contentType: "application/json",
      success: function(msg) { console.log("success"); },
      error: function(msg) { console.log("fail"); },
      url: "https://hcyqzeoa9b.execute-api.us-west-1.amazonaws.com/v1/top100/2017/checklist"
    });
    return false;


  });

});

// filter button on mobile scrolls to top
$('#filter-btn').on('click', function(){
    $('body,html').animate({ scrollTop: $('#search').position().top },150);
});

// show the bottom nav only on small screens and after certain scroll height
$(document).scroll(function() {
  var y = $(this).scrollTop();
  var topDiv = $('#header').outerHeight( true )-10;
  var x = $(this).width();
  if (y > topDiv && x < 650){
    $('#bottom-nav').show();
  } else {
    $('#bottom-nav').hide();
  }
});
