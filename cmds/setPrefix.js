module.exports.run = async (client, message, args, con) => {

  var mysql = require('mysql');

  // Si il manque le préfix
  if (args.length == 0) {
    message.channel.send(`[**Error Prefix**] : Missing prefix`);
  } else if (args.length == 1) {

    let nPrefix = args[0];

    // Changement du préfix dans la db guilds
    var sql = `UPDATE guilds SET prefix ='${nPrefix}' WHERE guildID='${message.guild.id}'`;
    con.query(sql, function (err, result) {
      if (err) return console.log(err);
      console.log(`Changement prefix de ${message.guild.name} par ${nPrefix}`);
      message.channel.send(`[**Prefix update**] : new prefix **${nPrefix}**`);
    });
  }
}


module.exports.help = {
  name: "setPrefix"
}