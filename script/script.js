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
        var calories = arrayBeer[index][4];
        //console.log(calories);

        var beerDetailsHtml = document.getElementById("beerDetails");
        var trinktemperatur = arrayBeer[index][2].toString();
        var alkohol = arrayBeer[index][3].toString();
        var stammwuerze = arrayBeer[index][5].toString();
        var details = "Beer-Details: Trinktemperatur: " + trinktemperatur + ", Alkohol: " + alkohol + "%, Stammwuerze: " + stammwuerze;
        beerDetailsHtml.innerHTML = details;


        var destinations = [];

        arrayPubs.forEach(element => {
            if (element[2].toString().indexOf(beerId) > -1) {

                var dest = new Object();
                dest.lat = parseFloat(element[3]);
                dest.lng = parseFloat(element[4]);

                destinations.push(dest);

                $("#listOfBars").append('<li>' + element[1] + '</li>');

            }

            localStorage.setItem("destinations", undefined);
            localStorage.setItem("destinations", JSON.stringify(destinations));
        });

        return beerName;
          
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




