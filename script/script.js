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

        var arrayPubs = parseCSVinArray(localStorage.getItem("arrayPubs"));
        var arrayBeerNames = localStorage.getItem("arrayBeerNames").split(",");

        var beerName = $("#beerNames").val();

        var index = arrayBeerNames.findIndex(x => x === beerName);

        $('#listOfBars li').remove();

        arrayPubs.forEach(element => {
            $("#listOfBars").append('<li>' + element + '</li>');
        });

        return beerName;
          
        event.preventDefault();
    });
}

function loadDataFromCSV() {

    var csv_string = document.getElementById("DB_Bier").innerHTML;
    localStorage.setItem("arrayBeer", csv_string);

    var arrayBeer = parseCSVinArray(csv_string);

    var arrayBeerNames = [];
    for (k = 2; k < arrayBeer.length - 1; k++) {
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
        for (k = 0; k < CSVinArray[i].length; k++) {
            subsubArray = CSVinArray[i][k].split(";");
            CSVinArray[i][k] = subsubArray
        }
    }
    return CSVinArray;
}




