//-----variables definition
var locationLatitude = 0;
var locationLongitude = 0;
var myPlaces = [];

var LatLng = {
    lat: 49.41506712302851,
    lng: 18.54945785673615
};

function initMap() {

    var styledMapType = new google.maps.StyledMapType(
        [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#e1ffd9"
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#000000"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{
                "color": "#a815d7"
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#bdbdbd"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#007040"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#fcfcfc"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#1b1b1b"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#2c2c2c"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#8a8a8a"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#373737"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#3c3c3c"
            }]
        }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{
                "color": "#4e4e4e"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        }, {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#0fe5ff"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#3d3d3d"
            }]
        }], {
            name: 'Styled Map'
        });

    var icons = {
        slovakia: {
            icon: './Resources/images/markers/slovakia.png'
        },
        czechia: {
            icon: './Resources/images/markers/czechia.png'
        },
        done: {
            icon: './Resources/images/markers/done.png'
        },
        want: {
            icon: './Resources/images/markers/want.png'
        }
    };

    myPlaces = [{
        position: new google.maps.LatLng(49.41506712302851, 18.54945785673615),
        type: 'slovakia',
        title: 'Domov na Slovensku',
        //link: 'https://www.google.cz/maps/@49.4146935,18.5494914,3a,75y,354.29h,87.79t/data=!3m6!1e1!3m4!1sgWlwIz0z1wwJWI6BchfkNQ!2e0!7i13312!8i6656'
    }, {
        position: new google.maps.LatLng(49.83619644616949, 18.158731736026542),
        type: 'czechia',
        title: 'Koleje Ostrava Poruba',
        ///link: 'https://www.google.cz/maps/@49.1889401,16.5990265,3a,60y,135.98h,87.14t/data=!3m6!1e1!3m4!1sH3EGNFAaeMZb6IQBrTiAmA!2e0!7i16384!8i8192'
    }, ];

    fillPointsArray();

    var map = new google.maps.Map(document.getElementById('map'), {
        center: LatLng,
        zoom: 10,
        disableDefaultUI: true,
        scaleControl: true,
        zoomControl: true,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });

    var infowindow = new google.maps.InfoWindow();
    let infoWindowLocation = new google.maps.InfoWindow();

    infoWindowLocation.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        infowindow.close();
        infoWindowLocation.close();

        infoWindowLocation = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        var obj = mapsMouseEvent.latLng.toJSON();

        locationLatitude = obj.lat;
        locationLongitude = obj.lng;

        let CustomWindowNewPoint = `<div class="map__info-window_add">
                                    <h4>NOVÝ BOD</h4>
                                    <h5>Latitude: ${locationLatitude}</h5>
                                    <h5>Longtitude: ${locationLongitude}</h5>
                                            
                                            <form action="" onsubmit="savePointToStorage(${locationLatitude}, ${locationLongitude})">
                                                            <label for="nazov">Zadajte názov destinácie:</label>
                                                            <br>
                                                            <input type="text" id="nazov" required>
                                                                <input class="checkmark" type="radio" id="done" name="type" value="done" required>
                                                                <label for="done">Navštívíl som</label><br>
                                                                <input class="checkmark" type="radio" id="want" name="type" value="want">
                                                                <label for="want">Chcem navštíviť</label><br>
                                            <input class="map__info-window_button_add" type="submit" value="Pridať Destináciu" />  
                                            
                                    </div>`;

        infoWindowLocation.setContent(CustomWindowNewPoint);
        infoWindowLocation.open(map);
    });

    //<button onclick="savePointToStorage(${locationLatitude}, ${locationLongitude})"></button>

    myPlaces.forEach(function(place) {
        var marker = new google.maps.Marker({
            position: place.position,
            icon: icons[place.type].icon,
            map: map
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.close(); // Close previously opened infowindow
            infoWindowLocation.close();

            getWeatherResult(place.position.lat(), place.position.lng());

            let CustomWindow = `<div class="map__info-window_destination">
                                            <h4 class="title" id="title">${place.title}</h4>
                                            <h4>Aktuálne počasie: </h4>
                                            <p id="temp"></p>
                                            <p id="weather"></p>
                                            <div id="red_button"><button id="red_button" class="map__info-window__button_delete" onclick="deletePoint()">Odstrániť destináciu z mapy</button></div>
                                        </div>`;

            if (place.type == 'czechia' || place.type == 'slovakia') {

                CustomWindow = `<div class="map__info-window_destination">
                                 <h4 class="title" id="title">${place.title}</h4>
                                <h4>Aktuálne počasie: </h4>
                                <p id="temp"></p>
                                <p id="weather"></p>
                            </div>`;
            }

            infowindow.setContent(CustomWindow);
            infowindow.open(map, marker);

        });
    });


    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');


}

function addPoint(locationLatitude, locationLongitude) {
    var title = document.getElementById('nazov').value;
    console.log("názov = " + title);
    myPlaces.push({
        position: new google.maps.LatLng(locationLatitude, locationLongitude),
        type: 'czechia',
        title: title,
    })
}


function savePointToStorage(lat, lng) {

    console.log("Funkcia sa predsa len zavolala :D");

    var ele = document.getElementsByName('type');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            var type = ele[i].value;
    }
    var title = document.getElementById('nazov').value;
    var obj = { 'positionLat': lat, 'positionLng': lng, 'type': type, 'title': title }
    localStorage.setItem(title, JSON.stringify(obj));
    initMap();
}

function fillPointsArray() {
    for (var i = 0; i < localStorage.length; i++) {
        var objekt = JSON.parse(window.localStorage.getItem(localStorage.key(i)));
        myPlaces.push({
            position: new google.maps.LatLng(objekt.positionLat, objekt.positionLng),
            type: objekt.type,
            title: objekt.title,
            link: objekt.link
        });
    }
}

function deletePoint() {
    var nazov = document.getElementById("title").textContent;
    localStorage.removeItem(nazov);
    myPlaces = []
    fillPointsArray();
    initMap();
}

function getWeatherResult(lat, lng) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&units=metric&appid=b5ae16ccc8d4cca0efcb0a528ebb8965')
        .then(weather => {
            return weather.json();
        }).then(displayWeatherResult);
}

function displayWeatherResult(weather) {
    console.log(weather);
    document.getElementById("temp").innerHTML = Math.round(weather.main.temp) + '&#8451';
    document.getElementById("weather").innerHTML = weather.weather[0].main;
}


function getWeatherResultByCity() {
    var mesto = document.getElementById("mesto").value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + mesto + '&appid=b5ae16ccc8d4cca0efcb0a528ebb8965')
        .then(weather => {
            return weather.json();
        }).then(setOnMap);
}

function setOnMap(weather) {

    console.log(typeof weather.coord.lat);

    LatLng = {
        lat: weather.coord.lat,
        lng: weather.coord.lon
    };

    initMap();
}


//////////WEATHER API BASE: https://api.openweathermap.org/data/2.5/
//////////WEATHER API KEY: b5ae16ccc8d4cca0efcb0a528ebb8965