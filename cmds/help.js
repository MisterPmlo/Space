let Discord = require('discord.js');

module.exports.run = async (client, message, args, con, prefix) => {

    const owner = process.env.OWNER;

    // Embed en Orange 
    var HelpEmbed = new Discord.MessageEmbed()
        .setColor('#F5A623')
        .setAuthor('Commandes', client.user.avatarURL)
        .setTimestamp(new Date)
        .setFooter("By x00#6522")
        .addField(`**Your prefix is ${prefix}**`, '\u200b')
        .addField("_Permet de changer le préfix_ \n **```" + `${prefix}` + "setPrefix NewPrefix```**", '\u200b')
        .addField("_Donner accès aux commandes du bot à ce role_ \n **```" + `${prefix}` + "give-perm @rolename```**", '\u200b')
        .addField("_Permet de ban la personne définitivement_ \n **```" + `${prefix}` + "ban @x00 raison```**", '\u200b')
        .addField("_Permet de kick la personne_ \n **```" + `${prefix}` + "kick @x00 raison```**", '\u200b')
        .addField("_Permet d'obtenir les infos de la personne_ \n **```" + `${prefix}` + "modinfo @x00 raison```**", '\u200b')
        
        
        
        return message.author.send(HelpEmbed);

}


module.exports.help = {

    name : "help"
}