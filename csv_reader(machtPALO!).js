function getBeerList(){

}

function getPubsWithBeer(beer){

}

function cvsParser(filePath){

}

function readTextFile(filePath){                                        
        var fso = new ActiveXObject("Scripting.FileSystemObject");      
        var ForReading = 1;
        var file = fso.OpenTextFile(filePath, ForReading);               
        var text = file.ReadAll();                                      
        file.close();
       return text;                                                     
    }

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