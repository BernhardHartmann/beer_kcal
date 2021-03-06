var map;

$(document).ready(function () {
    loadDataFromCSV();
    loadBeerNamesToAutocomplete();
    getAllBarsFromBeerName();
});


function loadBeerNamesToAutocomplete() {

    var arrayBeerNames = localStorage.getItem("arrayBeerNames").split(",");

    $('#beerNames').autocomplete({
        source: arrayBeerNames,
        minLength: 0,
        scroll: true
    }).focus(function () {
        $(this).autocomplete("search", "");
    });
}

function getAllBarsFromBeerName() {
    $("#searchButton").click(function (event) {

        var arrayBeer = parseCSVinArray(localStorage.getItem("arrayBeer"));
        arrayBeer.shift();
        arrayBeer.shift();

        var arrayPubs = parseCSVinArray(localStorage.getItem("arrayPubs"));
        arrayPubs.shift();
        arrayPubs.shift();
        arrayPubs.pop();

        var arrayBeerNames = localStorage.getItem("arrayBeerNames").split(",");

        var beerName = $("#beerNames").val();

        var index = arrayBeerNames.findIndex(x => x === beerName);

        $('#listOfBars li').remove();

        var beerId = arrayBeer[index][0].trim();
        var calories = arrayBeer[index][4] *5; //for 500ml
        var beerName = arrayBeer[index][1];
        localStorage.setItem("cal", calories);
        localStorage.setItem("beerName", beerName)

        //console.log(calories);

        var beerDetailsHtml = document.getElementById("beerDetails");
        var trinktemperatur = arrayBeer[index][2].toString();
        var alkohol = arrayBeer[index][3].toString();
        var stammwuerze = arrayBeer[index][5].toString();
        var details = "Beer-Details: Trinktemperatur: " + trinktemperatur + ", Alkohol: " + alkohol + "%, Stammwuerze: " + stammwuerze;
        beerDetailsHtml.innerHTML = details;


        var destinations = [];
        var specificBars = [];

        arrayPubs.forEach(element => {
            if (element[2].toString().indexOf(beerId) > -1) {

                var dest = new Object();
                dest.lat = parseFloat(element[3]);
                dest.lng = parseFloat(element[4]);

                destinations.push(dest);

                specificBars.push(element[1]);

                $("#listOfBars").append('<li>' + element[1] + '</li>');

            }

            localStorage.setItem("destinations", undefined);
            localStorage.setItem("specificBars", undefined);
            localStorage.setItem("destinations", JSON.stringify(destinations));
            localStorage.setItem("specificBars", JSON.stringify(specificBars));
        });

        reloadMap();
          
        event.preventDefault();
    });
}

function loadDataFromCSV() {

    var csv_string = document.getElementById("DB_Bier").innerHTML;
    localStorage.setItem("arrayBeer", csv_string);

    var arrayBeer = parseCSVinArray(csv_string);
    arrayBeer.shift();
    arrayBeer.shift();

    var arrayBeerNames = [];

    for (k = 0; k < arrayBeer.length - 1; k++) {
        arrayBeerNames.push(arrayBeer[k][1].toString());
    }

    localStorage.setItem("arrayBeerNames", arrayBeerNames.toString());

    var csv_stringPubs = document.getElementById("DB_Lokale").innerHTML;

    localStorage.setItem("arrayPubs", csv_stringPubs);
}

function parseCSVinArray(stringCSV) {

    var CSVinArray = stringCSV.split("\n");
    for (i = 0; i < CSVinArray.length; i++) {
        subArray = CSVinArray[i].split(",");
        CSVinArray[i] = subArray;
        //var subArrayAsString = subArray.toString();
        /*if (subArrayAsString.indexOf(";") > 0) {
            for (k = 0; k < CSVinArray[i].length; k++) {
                if (CSVinArray[i][k].indexOf(";")){
                    subsubArray = CSVinArray[i][k].toString().split(";");
                    CSVinArray[i][k] = subsubArray
                }
            }
        }*/
    }

    return CSVinArray;
}


function setPriceForCart() {
    //document.getElementById("beer").value
    //alert(localStorage.getItem("cal"));
    abcd = document.getElementById("data_price").setAttribute("data-price", localStorage.getItem("cal"));

}

function calc_calories_on_distance(person, durationSecs) {
    //alert(person.age)
    durationHours = durationSecs / 60 / 60;
    //alert(durationHours);
    Met = 3.3;

    var obj = JSON.parse(person);
    //alert(obj.age)


    if (obj.gender == "Male") {
        BMR = 66 + (6.23 * obj.lbs) + (12.7 * obj.inches) - (6.8 * obj.age);
        return Number.parseFloat(BMR * Met / 24 * durationHours).toFixed(2);

        //  alert("calories male"+BMR*Met/24 * 1);
    } else if (obj.gender == "Female") {
        BMR = 655 + (4.35 * obj.lbs) + (4.7 * obj.inches) - (4.7 * obj.age);
        return Number.parseFloat(BMR * Met / 24 * durationHours).toFixed(2);
        //alert("calories "+BMR*Met/24 * durationHours);  
    }
}


function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?' + 'key=AIzaSyAcAekU8Hu2OByMSG3kwrF1dDN9AkteWRk&callback=initMap';
    document.body.appendChild(script);
}

function reloadMap() {
    var scriptTags = document.body.getElementsByTagName('script');
    console.log(scriptTags);

    for (var i = 0; i < scriptTags.length; i++) {
        if (scriptTags[i].src.indexOf('maps.googleapis.com') > -1) {
            console.log(scriptTags[i]);
            document.body.removeChild(scriptTags[i]);
        }
    }

    loadScript();
}


function initMap() {
    var person = localStorage.getItem('person');

    var bounds = new google.maps.LatLngBounds;
    var markersArray = [];

    //var origin1 = {lat: 48.158190, lng: 16.382078};
    var origin2 = 'FH campous Wien, Austria';
    //var destinationA = 'Reumannplatz, Wien, Austria';
    //var destinationB = {lat: 48.2080194, lng: 16.3720473};

    var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.2080194, lng: 16.3720473 },
        zoom: 10
    });
    var geocoder = new google.maps.Geocoder;

    if (localStorage.getItem("destinations")) {
        var destinations = JSON.parse(localStorage.getItem("destinations"));
    }
    
    var specificBars = JSON.parse(localStorage.getItem("specificBars"));

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [origin2],
        destinations: destinations,
        travelMode: 'WALKING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function (asDestination) {
                var icon = asDestination ? destinationIcon : originIcon;
                return function (results, status) {
                    if (status === 'OK') {
                        map.fitBounds(bounds.extend(results[0].geometry.location));
                        markersArray.push(new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            icon: icon
                        }));
                    } else {
                        alert('Geocode was not successful due to: ' + status);
                    }
                };
            };

            outputDiv.innerHTML += '<button type="button" class="btn btn-warning" style="width:100%;"><b>Current location:</b> ' + '<br>' + originList[0] + '</button><br>';
            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                console.log(results);
                geocoder.geocode({ 'address': originList[i] }, showGeocodedAddressOnMap(false));

                for (var j = 0; j < results.length; j++) {
                    //results.length
                    geocoder.geocode({ 'address': destinationList[j] },
                        showGeocodedAddressOnMap(true));
                    outputDiv.innerHTML += '</br><b>Destination' + (j + 1) + '</b> <button type="button" class="btn btn-secondary" style="width:100%;">'+
                    '<span class="glyphicon glyphicon-glass"></span> Bar: <b> ' + specificBars[j] +'</b></br>'+
                    '<span class="glyphicon glyphicon-cog"></span> Distance: <b>' + results[j].distance.text +'</b></br>'+ 
                    '<span class="glyphicon glyphicon-fire"></span> Calories: <b>' +  calc_calories_on_distance(person, parseInt(results[j].duration.value)) + '</b></button><br>';  
                    }
            }
        }
    });
}


function deleteMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}

