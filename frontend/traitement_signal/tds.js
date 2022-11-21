//import Plotly from 'plotly.js-dist'



//valeurs définies
let amplitude_max = [];
let sql = "SELECT * FROM stockage_flux ;"
let recup = [];
let records = [];


//connexion db
var sq = require('sqlite3'); 
var database =  new sq.Database('./testdb.db3', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


//fctn de changement de valeur de flux en db. la seule a appeler, le reste se fait en cascade
async function stockage_flux(new_data){
    //dés qu'une valeur arrive la stock en db (tableua pour ca)
    //si longueur suffisante appelle separateur_de_flux
    let verif = await getRecords("SELECT sample_flux FROM stockage_flux");
    let manip_verif = verif[0].sample_flux;
    let stock = '';
    let verification2 = [];
    for(let i=1; i<manip_verif.length-1; i++){
        if(manip_verif[i]!=','){
            stock += manip_verif[i];
        }
        else{
            verification2 = verification2.push(parseFloat(stock));
            stock = '';
        }
    }
    verification2 = verification2.push(new_data)//.concat si tableau
    if (verification2.length >= 5){//valeur a changer selon longueur tab fixé (tds)
        separateur_de_flux(verification2);
    }
    else{
        database.run("UPDATE sample_flux SET stockage_flux = ?", [verification2]);
    }
}


function separateur_de_flux(flux){
    //prend le stockage flux, en cree un tableau et appelle amplitude_sup et reconnaissance_de_mot
    //supprime la moitié de départ de stockage flux
    amplitude_sup(flux);
    reconnaissance_de_mot(flux);

    let new_flux = flux.splice(flux.length/2);
    database.run("UPDATE stockage_flux SET stockage_flux = ?", [new_flux]);  
}


//fonction de traitemement de signal max
async function amplitude_sup(sample){
    amplitude_max= await getRecords("SELECT valeur FROM amplitude_max WHERE name =='bubuu'");
    console.log(amplitude_max[0].valeur);
    //let amplitude_max = database.run("SELECT valeur FROM amplitude_max WHERE name =='bubuu'");
    //console.log(amplitude_max);
    for (let i=0; i<sample.length;i++){
        console.log("ok");
        if (sample[i]>=amplitude_max[0].valeur){
            requete_max();
            return true;
        };
    };
    return false;   
}


//fonction de traitement de signal rec mot
function reconnaissance_de_mot(sample){
    requete_mot();
    return false;
}


//fctn fourier test 1
function transforme_fourier1(){//ne fonctionne pas
    var ft = require('fourier-transform');
    var db = require('decibels');
 
    var frequency = 440;
    var size = 1024;
    var sampleRate = 44100;
    var waveform = new Float32Array(size);
    for (var i = 0; i < size; i++) {
        waveform[i] = Math.sin(frequency * Math.PI * 2 * (i / sampleRate));
    }
 
    //get normalized magnitudes for frequencies from 0 to 22050 with interval 44100/1024 ≈ 43Hz
    var spectrum = ft(waveform);
 
    //convert to decibels
    var decibels = spectrum.map((value) => db.fromGain(value));
    console.log(decibels);
    console.log(decibels[0]);
}


//fctn fourier test 2
function transforme_fourier2(){ //fonctionne
    var fft = require('fft-js').fft,
    fftUtil = require('fft-js').util;
    //var signal = [1,1,1,1,0,0,0,0,0,0,0,0,3,3,3,3];//par multiple de 2^n (longueur)
    var signal = new Float32Array(1024);
    for (var i = 0; i < 1024; i++) {
        signal[i] = Math.sin(440 * Math.PI * 2 * (i / 44100));
    }

    var phasors = fft(signal);

    //console.log(phasors[3]);
    var frequencies = fftUtil.fftFreq(phasors, 1024), // Sample rate and coef is just used for length, and frequency step
    magnitudes = fftUtil.fftMag(phasors); 

    var both = frequencies.map(function (f, ix) {
        return {frequency: f, magnitude: magnitudes[ix]};
    });

    console.log(both);
    console.log(both[0]);
    //affichage_fourier(both);
}


//tentative de tableau js (fctn pas)
function affichage_fourier(both){
    var Plotly = require('plotly.js-dist');
    let xArray = both.map(x => x.frequency);
    let yArray = both.map(x => x.magnitude);

    //var xArray = [50,60,70,80,90,100,110,120,130,140,150];
    //var yArray = [7,8,8,9,9,9,10,11,14,14,15];

    // Define Data
    var data = [{
        x: xArray,
        y: yArray,
        mode:"markers",
        type:"scatter"
    }];

// Define Layout
    var layout = {
        xaxis: {range: [0, 511], title: "Square Meters"},
        yaxis: {range: [-20, 20], title: "Price in Millions"},
        title: "House Prices vs. Size"
    };

    Plotly.newPlot("myPlot", data, layout);
}


function requete_max(){
    console.log("envoie requete max");
}

function requete_mot(){
    console.log("envoie requete mot");
}


//fctn de requete db
function getRecords(sql){
    return new Promise(resolve=>{
        database.all(sql,[],(err,rows)=>{
            if(err){
                return console.error(err.message);
            }
            rows.forEach((row)=>{
                recup.push(row);
                console.log(row.sample_flux);
            });

            resolve(recup);
        });
    });
}





//asyncCall("SELECT sample_flux FROM stockage_flux");

//let test_db = database.run("SELECT sample_flux FROM stockage_flux WHERE name = \'bubu\';");//
//console.log(test_db);//undefined ?"test = "+
//console.log('bubu = ? ');
//console.log(recup[0]);

let sample = [1,0,1,0,1,2,5,4,0,3];
console.log(amplitude_sup(sample));
//transforme_fourier1();
//transforme_fourier2();
//affichage_fourier();












//--------------------------------------------------------------------------
//var database = new sq.Database(__dirname + '/testdb.db3');


/*database.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
        recup.push(row);
      console.log(row.sample_flux);
    });
  });
  
  
  
  async function asyncCall(sql){
    records=await getRecords(sql);
    console.log(recup);
}*/