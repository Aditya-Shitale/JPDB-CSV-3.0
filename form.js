const reader = new FileReader();
var conntoken=localStorage.getItem("token_no");
// console.log(conntoken)
var url ="http://api.login2explore.com:5577"
var endpoint="/jpdb/etl/csv/v01/import"




function Submit(){
    var dbName,relName,colSep,rowSep,startEnc,endEnc,firstRowCol,forceImport,file;
    dbName=$("#dbName").val();
    relName=$("#relName").val();
    colSep=$("#colSep").val();
    if($("#rowSep").val()==="\\n"){
        rowSep="\n";
    }
    if($("#rowSep").val()==="\n"){
        rowSep="\n";
    }
    if($("#rowSep").val()==="\n\r"){
        rowSep="\n\r";
    }
    if($("#rowSep").val()==="\\n\r"){
        rowSep="\n\r";
    }
    if($("#rowSep").val()==="\\r"){
        rowSep="\r";
    }
    if($("#rowSep").val()==="\r"){
        rowSep="\r";
    }

    
    startEnc=$("#startEnc").val();
    endEnc=$("#endEnc").val();
    if($("#firstRowCol").val()==="true"){
        firstRowCol=true;
    }
    if($("#firstRowCol").val()==="false"){
        forceImport= false;
    }
    if($("#forceImport").val()==="true"){
        forceImport=true;
    }
    if($("#forceImport").val()==="false"){
        forceImport=false;
    }


  var jsonObjStr=null;
    file=document.getElementById("choseFile");
    // console.log(file)
    const input = file.files[0];
    // console.log(input)
    let text,best;
    reader.onload = function (e) { 
        // console.log("array")
        text = e.target.result;
        // best=JSON.stringify(text)
        // console.log(best)
        jsonObjStr={
            token: conntoken,
            dbName:dbName,
            rel: relName,
            jsonStr:{
                firstRowColName : firstRowCol,
                colSeparator : colSep,
                rowSeparator : rowSep,
                startEncloser : startEnc,
                endEncloser   : endEnc,
                fileStr : text ,
                forceImport : forceImport
            }
        }
        req=JSON.stringify(jsonObjStr)
        // console.log(req)
        send(req)
    };
    reader.readAsText(input);

    
}

function executeCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

function send(req){

   jQuery.ajaxSetup({async:false})
    var result=executeCommand(req,endpoint);
    console.log(result);
    
    if((result.status)===200){
        alert("Data inserted success. "+(result.message));
    }
    else{
        alert("Data not inserted "+(result.message))
    }
    jQuery.ajaxSetup({async:true})
}





// getData();

// const CSVToJSON = csv => {
//     const lines = csv.split('\n');
//     const keys = lines[0].split(',');
//     return lines.slice(1).map(line => {
//         return line.split(',').reduce((acc, cur, i) => {
//             const toAdd = {};
//             toAdd[keys[i]] = cur;
//             return { ...acc, ...toAdd };
//         }, {});
//     });
// };

// document.querySelector('.custom-file-input').addEventListener('change',function(e){
//     var fileName = document.getElementById("myInput").files[0].name;
//     var nextSibling = e.target.nextElementSibling
//     nextSibling.innerText = fileName
//   })

// console.log(CSVToJSON($("chosefile").val()))