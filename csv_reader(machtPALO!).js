//var DB_BEER_PATH = "database/DB_Bier.csv"
//var DB_PUBS_PATH = "database/DB_Lokale.csv"

function functionTest(){
    
    var csv_string = document.getElementById("DB_Bier").innerHTML;
    alert(csv_string);

    var arrayBeer = parseCSVinArray(csv_string);
    //alert(arrayBeer[0][0]);
    //alert(arrayBeer[1][1]);
    //alert(arrayBeer[2][1]);

    var csv_stringPubs = document.getElementById("DB_Lokale").innerHTML;
    var arrayPubs = parseCSVinArray(csv_stringPubs);
    //alert(arrayPubs[0][2]);
    //alert(arrayPubs[5][2][1]);
    //alert(arrayPubs[5][2][2]);
    //alert(arrayPubs[5][2].length);

    console.log(arrayPubs);

    console.log(arrayBeer);
}

function getBeerList(){

}

function getPubsWithBeer(beer){

}

/*function cvsParser(filePath){

}*/

//TODO: file reader doesn't work
/*function readTextFile(filePath){                                       
    var reader = new FileReader();
    reader.onload = function(event) {
    var contents = event.target.result;
    console.log("File contents: " + contents);
};*/

/*function readFile2(){
    var req = new XMLHttpRequest();
    req.onload = function(){
        process_webgl_data(this.responseText);
    };
    req.open('GET', './database/DB_Bier.csv');
    req.send();
}*/

/*function readFile3(){
    d3.csv("./database/DB_Bier.csv").then(function(data) {
        console.log(data[0]);
        alert(data[0])
      });
}*/

/*function readFile4(){
    alert("funct4");
    const fs = require('fs') 
  
fs.readFile('database/DB_Bier.csv', (err, data) => { 
    if (err) throw err; 
  
    console.log(data.toString());
    alert(data.toString()); 
}) 
}

reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
};

reader.readAsText(filePath);
        //file.close();
           alert(text);
        return text;                                                     
    }*/

function parseCSVinArray(stringCSV){
    
    var CSVinArray = stringCSV.split("\n");
    for (i=0; i<CSVinArray.length; i++){
        subArray = CSVinArray[i].split(",");
        CSVinArray[i] = subArray;
        for (k=0; k<CSVinArray[i].length; k++){
            subsubArray = CSVinArray[i][k].split(";");
            CSVinArray[i][k] = subsubArray
        }
    }
    return CSVinArray;
}
