

function amplitude_sup(sample){
    let amplitude_max = database.run("SELECT valeur FROM amplitude_max WHERE name =='bubuu'");
    console.log(amplitude_max);
    for (let i=0; i<sample.length;i++){
        if (sample[i]>=amplitude_max){
            return true
        };
    };
    return false;
}

function reconnaissance_de_mot(sample){
    return false;
}

/*function transforme_fourier1(){//ne fonctionne pas
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
}*/

function transforme_fourier2(){ //fonctionne
    var fft = require('fft-js').fft,
    fftUtil = require('fft-js').util,
    signal = [1,1,1,1,0,0,0,0,2,2,2,2,3,3,3,3];//par multiple de 2^n (longueur)

    var phasors = fft(signal);

    //console.log(phasors[3]);
    var frequencies = fftUtil.fftFreq(phasors, 8000), // Sample rate and coef is just used for length, and frequency step
    magnitudes = fftUtil.fftMag(phasors); 

    var both = frequencies.map(function (f, ix) {
        return {frequency: f, magnitude: magnitudes[ix]};
    });

    console.log(both);
    console.log(both[1]);
}

function stockage_flux(new_data){
    //dés qu'une valeur arrive la stock en db (tableua pour ca)
    //si longueur suffisante appelle separateur_de_flux
    let verification = database.run("SELECT stockage_flux FROM stockage_flux");
    verification = verification.push(new_data)//.concat si tableau
    if (verification.length >= 5){
        separateur_de_flux(verification);
    }
    else{
        database.run("UPDATE stockage_flux SET stockage_flux = ?", [verification]);
    }
}

function separateur_de_flux(flux){
    //prend le stockage flux, en cree un tableau et appelle amplitude_sup et reconnaissance_de_mot
    //supprime la moitié de départ de stockage flux
    if(amplitude_sup(flux)){
        requete_max();
    }
    if(reconnaissance_de_mot(flux)){
        requete_mot();
    }
    let new_flux = flux.splice(flux.length/2);
    database.run("UPDATE stockage_flux SET stockage_flux = ?", [new_flux]);

    
}

function requete_max(){

}

function requete_mot(){

}

function drop_table(){
    database.run("DROP TABLE stockage_flux");
    database.run("DROP TABLE mot_enregistre");
    database.run("DROP TABLE amplitude_max");
}

function create_table(){
    database.run("CREATE TABLE IF NOT EXISTS mot_enregistre (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, sample_enregistre TEXT);");
    database.run("CREATE TABLE IF NOT EXISTS amplitude_max (name TEXT PRIMARY KEY, valeur INTEGER);");
    database.run("CREATE TABLE IF NOT EXISTS stockage_flux (name TEXT PRIMARY KEY, sample_flux TEXT);");
}

function insert_table(){
    database.run("INSERT INTO stockage_flux (name, sample_flux) VALUES(?,?);", ['bubuu','[1,0,2]']);
    database.run("INSERT INTO amplitude_max (name, valeur) VALUES(?,?)", ['bubuu',3]);
    database.run("INSERT INTO mot_enregistre (name, sample_enregistre) VALUES(?,?)", ['bubuu','[1,0,2]']);
}

var sq = require('sqlite3'); 

var database =  new sq.Database('./testdb.db3', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

//var database = new sq.Database(__dirname + '/testdb.db3');

let sql = "SELECT * FROM stockage_flux ;"
let recup = [];
let records = [];
/*database.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
        recup.push(row);
      console.log(row.sample_flux);
    });
  });*/


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

async function asyncCall(sql){
    records=await getRecords(sql);
    console.log(recup);
}

asyncCall("SELECT * FROM stockage_flux;")


 



//let test_db = database.run("SELECT sample_flux FROM stockage_flux WHERE name = \'bubu\';");//
//console.log(test_db);//undefined ?"test = "+
console.log('bubu = ? ');
console.log(recup);

let sample = [1,0,1,0,1,2,5,4,0,3];
console.log(amplitude_sup(sample));
transforme_fourier2();
