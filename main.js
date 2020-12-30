import "./functions.js";

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "tb ";

client.commands = new Discord.Collection();

var adminList = ["360730103589634049", "713482556242133072", "688618504571715710", "471293316558880768"];
var queue = [];
var botIsBusy = false;
const maxQueue = 7;
const colorEmbed = "#0099ff";

var myJson = require('./commands/myJson.json');


client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    try{
        findChannelToSend(guild, false);
    }
    catch(err){
        console.log("Error occured !!! " + err.message);
    }
});


client.once('ready', () => {
    console.log('TOXIC Bot is online !');
    console.log("Logged into " + client.guilds.cache.size + " servers.");
})


client.on('message', message => {
    
    try{
        // check dm from admin
        if(message.channel.type === "dm"){
            if(adminList.includes(message.author.id)){
                console.log("Message from " + message.author.username + " => " + message.content);
                if(message.content === "send update message" && message.author.id === "360730103589634049"){
                    sendServerUpdateMessage();
                    sendEmbedMessage(message.channel, "Update messages sent")
                }
                else if(message.content === "show all servers"){
                    allChannelNames(message);
                }
            }
            return;
        }

        if(!message.content.startsWith(prefix) || message.author.bot) {
            return;
        }

        var isPermit = message.member.roles.cache.find(role => role.name === "tb");

        if(message.member.hasPermission('ADMINISTRATOR') || isPermit){
            const args = message.content.slice(prefix.length).split("/ +/");
            const command = args.shift().toLowerCase();

            if(command === 'help'){
                sendHelpMessage(message.channel)
                return;
            }

            if(command === 'commands' || command === 'command'){
                sendEmbedMessage(message.channel, "View Commands here", "https://toxicbotdiscord.github.io/");
                return;
            }

            if(command === 'queue' || command == 'printqueue'){
                printQueue(message);
                return;
            }

            if(command === 'disconnect' || command === 'leave' || command === 'dc'){
                handleDisconnect(message, command);
                return;
            }

            
            if(command === 'remove' || command === 'rm'){
                if(queue.length >= 1){
                    sendEmbedMessage(message.channel, "'" + queue[queue.length - 1] + "' removed from queue.", null);
                    queue.pop();
                    if(queue.length == 0){
                        botIsBusy = false;
                    }
                }
                else{
                    sendEmbedMessage(message.channel, "Nothing to remove from queue.", null);
                }
                return;
            }

            if(command === 'clearqueue' || command === 'clrq'){
                if(queue.length >= 1){
                    sendEmbedMessage(message.channel, "Queue cleared.", null);
                    queue = [];
                    botIsBusy = false;
                }
                else{
                    sendEmbedMessage(message.channel, "Nothing to remove from queue.", null);
                }
                return;
            }
            

            if(myJson[command] === undefined){
                sendEmbedMessage(message.channel, "Galat Command hai BSDK !!!!", null);
                return;
            }

            if(botIsBusy){
                // Cause if a user disconnects manually, the bot would be shown busy if it was disconnected while playing something.
                if(message.guild.voice.channelID === null || message.guild.voice === undefined){
                    botIsBusy = false;
                    queue = [];
                }
                else{
                    handleBusyBot(message, command);
                    return;
                }
            }

            playSound(message, myJson[command]);
        
        } // Closing of permission to play bot
        else{
            sendEmbedMessage(message.channel, "You dont have the permission to use Toxic-Bot (Add a role 'tb') !!", null);
        } // To check if member has role named tb if not next else
    }
    catch(err){
        console.log("Error occured !!! " + err.message);
    }

});


client.login(process.env.token);
