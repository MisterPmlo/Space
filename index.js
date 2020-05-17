// require packages
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require("enmap");
require("dotenv/config");

// initialise are client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// import settings
let prefix = ";";
const owner = process.env.OWNER;
const token = process.env.TOKEN;

// read commands files
fs.readdir('./cmds', (err, files) => {
    if (err) {
        console.log(err);
    }

    let cmdFiles = files.filter(f => f.split(".").pop() === "js");

    if (cmdFiles.length === 0) {
        console.log("No files found");
        return;
    }

    cmdFiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} loaded`);
        client.commands.set(props.help.name, props);
    })
})



// Initialisation database
var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB
});


// Initialisation de la base de donnée (une seule fois)
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE Guilds (guildID bigint, guildName VARCHAR(255), prefix VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Guilds created");
  });
});
*/

// Ajout des infos serveur quand le bot arrive dessus
client.on('guildCreate', async gData => {
    con.connect(function (err) {
        console.log("Connected!");
        var sql = `INSERT INTO Guilds (guildID, guildName, prefix) VALUES (${gData.id}, "${gData.name}", ";")`;
        con.query(sql, function (err, result) {
            if (err) {
                // Mettre à jour la bd du serveur si il est déjà en bd
                con.connect(function (err) {
                    var sql = `UPDATE Guilds SET guildName = "${gData.name}", prefix = "${prefix}" WHERE guildID = "${gData.id}"`;
                    con.query(sql, function (err, result) {
                        console.log(result.affectedRows + " lignes updated");
                        client.user.setActivity(`${client.guilds.cache.size} guilds 🌌`, { type: "WATCHING"})
                    });
                });
                //return console.log(`Impossible de mettre la ligne car ${gData.id} existe déjà`); // Si le serveur est déjà sur la base de donnée
            }
            console.log(`Inséré la guildID ${gData.id}`);
            client.user.setActivity(`${client.guilds.cache.size} guilds 🌌`, { type: "WATCHING"})
        });
    });
});

client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`${client.guilds.cache.size} guilds 🌌`, { type: "WATCHING"})
  });


client.on('message', async message => {
    if (message.author.bot) return; // Si la commande viens du bot on annule


    con.connect(function (err) { // Connection à la db
        console.log("Connecté!");
    });

    var sql = `
    SELECT prefix 
    FROM Guilds 
    WHERE guildID=${message.guild.id}`; // Récupérer le prefix du serveur


    con.query(sql, function (err, pre) {
        // Récupère le préfix du serv
        prefix = pre[0].prefix;
        //console.log("prefix = " + prefix);

        let message_array = message.content.split(" ");
        let command = message_array[0];
        let args = message_array.slice(1);

        if (!command.startsWith(prefix)) return;

        if (client.commands.get(command.slice(prefix.length))) {
            let cmd = client.commands.get(command.slice(prefix.length));
            if (cmd) {
                cmd.run(client, message, args, con, prefix)
                console.log('[COMMAND]', `${command} ${args} used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${message.guild.name}`)
                message.delete();
            }
        } else {
            console.log(`[${command}] Cette commande n'existe pas`)
        }
    })
});



client.on('ready', async () => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
    console.log("Hello, im ready");
    client.user.setActivity(`${client.guilds.cache.size} guilds 🌌`, { type: "WATCHING"})
});


// client login
client.login(token);