function timeCon(time) {
    time = time * 1000
    let days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0
    days = Math.floor(time / 86400000)
    time -= days * 86400000
    hours = Math.floor(time / 3600000)
    time -= hours * 3600000
    minutes = Math.floor(time / 60000)
    time -= minutes * 60000
    seconds = Math.floor(time / 1000)
    time -= seconds * 1000
    days = days > 9 ? days : "" + days
    hours = hours > 9 ? hours : "" + hours
    minutes = minutes > 9 ? minutes : "" + minutes
    seconds = seconds > 9 ? seconds : "" + seconds
    return (parseInt(days) > 0 ? days + " days " : " ") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + " hours ") + minutes + " minutes " + seconds + " seconds."
}



module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const pkg = require("../package.json");


    const embed = new Discord.MessageEmbed()
        .setColor('36393E')
        .setTitle(client.user.username + " V: " + pkg.version + ` Stats`)
        .setDescription(client.user.username + ' has been awake for ' + timeCon(process.uptime()))
        .addField('🏠 Guilds', client.guilds.cache.size, true)
        .addField('📄 Channels', client.channels.cache.size, true)
        .addField('🤵 Total Users', client.users.cache.size, true) 
        .addField('🐏 RAM Usage', `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`, true)
        //.addField('🏓 Ping', `${client.ping} ms`, true) // Voir pourquoi ne fonctionne pas 
        .addField(`:control_knobs: Library`, `Discord JS v${Discord.version}`, true)
        .addField(`:computer: Node.js `, `${process.version}`, true)

    message.channel.send(embed)
};

module.exports.help = {
    name : "botinfo"
}