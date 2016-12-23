var query_type = "pokemon"

var map_manager = {
    "map" : null,
    "map_items" : []
}

map_manager.map_items = [
    {
        "pokemon_id" : 4,
        "expire" : 1482153861000,
        "longitude" : -83.0435675,
        "latitude" : 40.0435522,
    }
]

function set_user_current_location() {
    // Change initial view if possible
    if (navigator.geolocation) {
      function set_initial_view(position) {
        map_manager.map.setView({
            center: new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude),
        });
      }
      navigator.geolocation.getCurrentPosition(set_initial_view);
    }
}


function loadMapScenario() {
    map_manager.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AjHg4poymQ-3nnoVKmwS7U3gSkfZLFWu8pah1HIa0N8tv2gzaJoZvqHBAcWNADb7',
        enableClickableLogo: false,
        enableSearchLogo: false,
        showDashboard: false,
        tileBuffer: 4,
        useInertia: false,
        showMapTypeSelector: false,
    });
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        map_manager.map.setView({
            // Use time square as starting point.
            center: new Microsoft.Maps.Location(40.7553085,-73.9844294),
            zoom: 17
        });
    }
    else {
        map_manager.map.setView({
            // Use time square as starting point.
            center: new Microsoft.Maps.Location(40.7553085,-73.9844294),
            zoom: 15
        });
    }
    
    set_user_current_location();
    
    // Every time user view changed, update the map
    Microsoft.Maps.Events.addHandler(map_manager.map, 'viewchangeend', refresh_pokemon_data);
    
//  add_pokemon_layer();
}

// 1. Define pokemon data format, create mock pokemon data
function get_counter_down_time_from_expire_epoch(epoch) {
  var now_time = new Date().getTime() / 1000;
  var time_left = epoch / 1000 - now_time;   // unit: second
  var second = Math.floor(time_left % 60);
  var minute = Math.floor(time_left / 60);
  return minute + ":" + second;
}


// 2. Create pokemon image on map
function get_pokemon_layer_from_map_items(map_items) {
    var layer = new Microsoft.Maps.Layer();
    var pushpins = []
    for (var i in map_items) {
      var map_item = map_items[i];
      var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                               { icon: 'images/pushpin_images/pokemon/' + map_item['pokemon_id'] + '.png' ,
                                                 title: get_counter_down_time_from_expire_epoch(map_item['expire']) });
      pushpins.push(pushpin)
    }
    layer.add(pushpins);
    return layer;
}

function add_pokemon_layer() {
    var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items)
    map_manager.map.layers.insert(pokemon_layer);
}


// 3. Add pokemon counter down refresh
function refresh_pokemon_layer() {
  // Prepare new layer
  var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items)
  // Remove old layer
  map_manager.map.layers.clear()
  // Add new layer
  map_manager.map.layers.insert(pokemon_layer);
}


// 4. Connect with REST API
function refresh_pokemon_data() {
  // Get boundary of current map view
  var bounds = map_manager.map.getBounds();
  
  // Request pokemons in current map view
  var apigClient = apigClientFactory.newClient();
  var params = {
    north: bounds.getNorth(),
    south: bounds.getSouth(),
    west: bounds.getWest(),
    east: bounds.getEast(),
  };
  var body = { };
  var additionalParams = { };
    
  if (query_type = "pokemon") {
      apigClient.mapPokemonsGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            map_manager.map_items = result.data;
        }).catch( function(result){
            //This is where you would put an error callback
            console.log(result)
        });
  } 
  if (query_type = "pokeshop") {
      apigClient.mapPokemonsGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            map_manager.map_items = result.data;
        }).catch( function(result){
            //This is where you would put an error callback
            console.log(result)
        });
  }
  if (query_type = "gym") {
      apigClient.mapPokemonsGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            map_manager.map_items = result.data;
        }).catch( function(result){
            //This is where you would put an error callback
            console.log(result)
        });
  }
    

}


function close_drawer_if_open() {
    if (document.querySelector('.mdl-layout__obfuscator').classList.contains('is-visible')) {
        var layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
    }
}

function query_type_changed() {
    map_manager.map_items =[];
    refresh_pokemon_data();
    refresh_pokemon_layer();
    close_drawer_if_open();
}


function query_pokemon() {
    query_type = "pokemon";
    document.getElementById('home_title').innerHTML="Pokemon Map"
    console.log("Switch to query pokemon");
    query_type_changed();
}

function query_pokeshop() {
    query_type= "pokeshop"
    document.getElementById('home_title').innerHTML="Pokestop Map"
    console.log("Switch to query pokestop");
    query_type_changed();
}

function query_gym() {
    query_type= "gym"
    document.getElementById('home_title').innerHTML="Pokemon Gym Map"
    console.log("Switch to query gym");
    query_type_changed();
}


function toggle_faq_list() {
    for( var i = 1; i <= 6; i++) {
        var faq_card = document.getElementById('faq' + i);
        if (faq_card.style.display == "") {
            faq_card.style.display = "inline"
        }
        else {
            faq_card.style.display = ""
        }
    }
    close_drawer_if_open();
}



window.setInterval(refresh_pokemon_data, 1000);
window.setInterval(refresh_pokemon_layer, 1000);
