$(document).ready(function () {
    loadBeerNamesToAutocomplete();
    getAllBarsFromBeerName();
});


function loadBeerNamesToAutocomplete() {
    var beerNames = ['ARGENTINA',
        'AUSTRALIA',
        'BRAZIL',
        'BELARUS',
        'BHUTAN',
        'CHILE',
        'CAMBODIA',
        'CANADA',
        'DENMARK',
        'DOMINICA',
        'INDIA'];

    $('#beerNames').autocomplete({
        source: beerNames,
        minLength: 0,
        scroll: true
    }).focus(function () {
        $(this).autocomplete("search", "");
    });
}

function getAllBarsFromBeerName() {
    $("#searchButton").click(function (event) {
        var beerName = $("#beerNames").val();

        var barsArray = ['ARGENTINA',
            'AUSTRALIA',
            'BRAZIL',
            'BELARUS',
            'BHUTAN',
            'CHILE',
            'CAMBODIA',
            'CANADA',
            'DENMARK',
            'DOMINICA',
            'INDIA'];

        var foundBars;

        $('#listOfBars li').remove();
        
        barsArray.forEach(element => {
            $("#listOfBars").append('<li>' + element + '</li>');
        });

        return beerName;
          
        event.preventDefault();
    });
}



