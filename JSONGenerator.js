(function(global, factory) {
    (global.js = factory());
}(this, function() {
    'use strict';
    var js = {};

    js.generateJSON = function(aFields) {
        var ID_json = {
            "IDForDelete": true,
            "fieldID": "ID",
            "tableField": false,
            "type": "input",
            "inputType": "string",
            "visible": false,
            "dependecy": "",
            "dependecyID": "",
            "dependecyText": "",
            "formatter": "",
            "columsType": "text",
            "checkStep": [],
            "checkType": [],
            "mandatory": true,
            "editable": true
        };
        var Language_json = {
            "IDForDelete": false,
            "fieldID": "language",
            "tableField": true,
            "type": "input",
            "inputType": "string",
            "visible": true,
            "dependecy": "",
            "dependecyID": "",
            "dependecyText": "",
            "formatter": "",
            "columsType": "text",
            "checkStep": [],
            "checkType": [],
            "mandatory": true,
            "editable": false
        };

        js.defaultStructure.NomeEntity.fields.push(ID_json);
        
        aFields.map(function(oField){
            js.defaultStructure.NomeEntity.fields.push(_generateNewJSONField(oField));
            if(oField["type"] === "select"){
                js.defaultStructure.NomeEntity.dependecies.push(_generateNewJSONDependency(oField));
            }
            if(oField["tableField"]){
                js.defaultStructure.NomeEntity.fieldsFilter.push(_genereateNewFilter(oField));
                js.defaultStructure.NomeEntity.fieldsName.push(oField["fieldID"]);
            }
            js.defaultStructure.NomeEntity.fieldsNew.push(oField["fieldID"]);
        });

        js.defaultStructure.NomeEntity.fields.push(Language_json);
        js.defaultStructure.NomeEntity.fieldsFilter.push(_genereateNewFilter(Language_json));
        js.defaultStructure.NomeEntity.fieldsName.push(Language_json["fieldID"]);
        js.defaultStructure.NomeEntity.fieldsNew.push(Language_json["fieldID"]);

        return JSON.stringify(js.defaultStructure);
        
    }

    function _generateNewJSONField(oField){
        const newObject = Object.assign({}, js.oGenericJSON);
        Object.keys(oField).map(function(sKey){
            newObject[sKey] = oField[sKey];
        });
        
        if(oField["type"] !== "select"){
            newObject["dependecy"] = "";
            newObject["dependecyID"] = "";
            newObject["dependecyText"] = "";
        }

        return newObject;
    }

    function _generateNewJSONDependency(oField){
        return {
            "name": oField["dependecy"],
            "filters":[],
            "fieldToTranslate":[]
        };
    }

    function _genereateNewFilter(oField){
        return {
            "filterName": oField["fieldID"],
            "type": "string",
            "isFilter": true,
            "excelType": "String"
        };
    }

    function _generateNewStructure(sFileName){
        return {
            sFileName: {
                "fields": [],
                "associable": false,
                "dependecies": [],
                "EntityDescription": "descriptionDaSettare",
                "EntityNameForNavigation": "",
                "fieldsFilter": [],
                "fieldsName": [],
                "fieldsNew": [],
                "translableFields": []
            }
        }
    }

    function _generateGenericJSON(){
        return js.oGenericJSON;
    }

    js.oGenericJSON = {
        "IDForDelete": false,
        "fieldID": "",
        "tableField": "",
        "type": "",
        "fieldForIDselect": "",
        "visible": "",
        "dependecy": "",
        "dependecyID": "",
        "dependecyText": "",
        "formatter": "",
        "formatterColor": "",
        "columsType": "",
        "checkStep": [],
        "checkType": [],
        "mandatory": true,
        "editable": true
    };

    js.defaultStructure = {
        "NomeEntity": {
            "fields": [],
            "associable": false,
            "dependecies": [],
            "EntityDescription": "descriptionDaSettare",
            "EntityNameForNavigation": "",
            "fieldsFilter": [],
            "fieldsName": [],
            "fieldsNew": [],
            "translableFields": []
        }
    }

    js.downloadGenetatedJSON = function(aFields){
        var data = js.generateJSON(JSON.parse(aFields));
        var blob = new Blob([data], {type: 'text/csv'});
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            var filename = "GeneratedJSON.txt"
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    }

    return js;

}));