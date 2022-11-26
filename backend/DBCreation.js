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