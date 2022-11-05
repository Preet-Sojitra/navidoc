"use strict";
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImthbGFzaGphaW4xMjRAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMTM2NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMi0xMS0wMiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjY3NjQzNDk4LCJuYmYiOjE2Njc2MzYyOTh9.8QjelieElELTKETXohYvz0o-mCX1UR4wNX_qEoFQLJ8';
let symptoms;
let dictionary = [];

function get(){
    let choices = document.getElementById('dropdown').selectedOptions;
    var values = Array.from(choices).map(({ value }) => value);

    let gender = document.getElementById('gender').value;
    let age = document.getElementById('age').value;
    let symp_para = [];

    call().then((data) => {
        symptoms = data;
        console.log(symptoms);

        for(let i = 0; i < 60; i++){
            dictionary[symptoms[i].Name] = symptoms[i].ID;
        }

        for(let i = 0; i < values.length; i++){
            symp_para.push(dictionary[values[i]])
        }
        console.log(symp_para)

        diagnose(JSON.stringify(symp_para), gender, age).then((data) => {
            console.log(data);
        })        
    })
    
}

async function call(){
    return fetch(`https://sandbox-healthservice.priaid.ch/symptoms?token=${TOKEN}&language=en-gb`)
        .then(async (response) => { 
            try {
                const data = await response.json();
                return data;
            } catch (err) {
                console.log(err);
            } 
        });
}

async function diagnose(symptoms_as_para, gender, age){
    return fetch(`https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms_as_para}&gender=${gender}&year_of_birth=${age}&token=${TOKEN}&format=json&language=en-gb`)
        .then(async (response) => { 
            try {
                const data = await response.json();
                return data;
            } catch (err) {
                console.log(err);   
            } 
        });
}