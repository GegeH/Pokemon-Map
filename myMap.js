var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'Ahx-pu4sUrSfP72S4B7gtzvf_FB6JV5OTgJazEna5ZQ7QFm67ATaqUI3K-KSLtxz'
    });
    add_pokemon_layer();
}

// 1. Define pokemon data format, create mock pokemon data
map_items = [
    {
        "pokemon_id" : 12,
        "expire" : 1479710709,
        "longitude" : -83.0455278,
        "latitude" : 40.0483715
    }
]

function get_counter_down_time_from_expire_epoch(epoch) {
    var now_time = new Date().getTime() / 1000;
    var time_left = epoch - now_time; // unit: second
    var second = Math.floor(time_left % 60);
    var minute = Math.floor(time_left / 60);
    return minute + ":" + second;
}

// 2. Create pokemon image on map
function get_pokemon_layer_from_map_itmes(map_items) {
    var pushpins = []
    var layer = new Microsoft.Maps.Layer();
    for (var i in map_items) {
        var map_item = map_items[i];
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                                 { icon: 'images/pushpin_images/pokemon/' + map_item['pokemon_id'] + '.png',
                                                   title: get_counter_down_time_from_expire_epoch(map_item["expire"]) });
        pushpins.push(pushpin)
    }
    layer.add(pushpins);
    return layer;
}
    
function add_pokemon_layer() {
    var pokemon_layer = get_pokemon_layer_from_map_itmes(map_items)
    map.layers.insert(pokemon_layer);
}
    
    
// 3. Add pokemon counter down refresh

// 4. Connect with REST API
