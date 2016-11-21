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
        "expire" : 1234567,
        "longitude" : -73.9828028,
        "latitude" : 40.7575988
    }
]

// 2. Create pokemon image on map
function get_pokemon_layer_from_map_itmes(map_items) {
    var pushpins = []
    var layer = new Microsoft.Maps.Layer();
    for (var i in map_items) {
        var map_item = map_items[i];
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                                 { icon: '/images/pushpin_images/pokemon/' + map_item['pokemon_id'] + '.png' });
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
