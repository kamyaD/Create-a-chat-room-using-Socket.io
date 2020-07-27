async function listDatabases(client){
    databaseLists = await client.db().admin().listDatabases();

    console.log("Databases:");
    databaseLists.databases.forEach(db=>console.log(` -${db.name}`));
};

module.exports = listDatabases;