const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "tb ";

client.commands = new Discord.Collection();

var queue = [];
var botIsBusy = false;
const maxQueue = 7;

var myJson = require('./commands/myJson.json');

function handleQueue(message){
    if(queue.length == 0){
        botIsBusy = false;
    }
    else{
        var toPlay = myJson[queue[0]];
        queue.shift();
        playSound(message, toPlay);
    }
}


function playSound(message, songName){
    const {voice} = message.member

    if(!voice.channelID){
        message.channel.send('You must be in a voice channel.');
    }
    else{
        strToPlay = './commands/'+songName;
        botIsBusy = true;
        voice.channel.join().then((connection) => {

            const dispatcher = connection.play(strToPlay);
            dispatcher.on("finish", () => handleQueue(message));
        })
    }
}


function handleDisconnect(message){
    // If never joined a voice channel
    if(message.guild.voice === undefined){
        message.channel.send("Arey chutiye mai hu hee nhi koi channel mai ...");
        return;
    }
    // If not in channel
    if (message.guild.voice.channelID === null){
        message.channel.send("Arey chutiye mai hu hee nhi koi channel mai");
        return;
    }
    // if not in same channel
    else if(message.member.voice.channelID !== message.guild.voice.channelID){
        message.channel.send("Pehle mere sath same channel mai aa loudu.");
        return;
    }
    // disconnect
    else{
        botIsBusy = false;
        queue = [];
        message.guild.voice.connection.disconnect();
        return;
    }
}


function handleBusyBot(message, command){
    if(message.member.voice.channelID !== message.guild.voice.channelID){
        message.channel.send("I am already playing something in '" + message.guild.voice.channel.name + "' voice channel. ");
    }
    else if(queue.length >= maxQueue){
        message.channel.send("Queue is full, please wait.")
    }
    else{
        message.channel.send("'" + command + "' added to queue.")
        queue.push(command);
    }
}


function sendHelpMessage(channel){
    const messageToSend = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Apun aa gaya hai meme bajane.')
        .setAuthor('TOXIC BOT')
        .setDescription("To use the bot, you should have admin permissions or need to have a role named 'tb'.")
        .addField('For help', '"tb help"')
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Website', value: 'Website to be added' },
            { name: 'Prefix', value: '"tb "', inline: true },
            { name: 'Example', value: '"tb nahi"' , inline: true},
            { name: 'Commands', value: 'https://docs.google.com/spreadsheets/d/1M-9mTWaDkayPkfxI8HbQyEHuUCRnIMaK9E7ISJgiEwM/edit?usp=sharing' },
        )
        .setImage('https://i.ibb.co/7tynPG9/Logo.jpg')
    channel.send(messageToSend);
}

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    let channelID;
    let channels = guild.channels.cache;

    try{
        for (let key in channels) {
            let c = channels[key];
            if (c[1].type === "text") {
                channelID = c[0];
                if(guild.me.permissionsIn(channelID).hasPermission('SEND_MESSAGES')){
                    break;
                }
            }
        }

        let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
        sendHelpMessage(channel);
        
    }
    catch(err){
        console.log("Couldnt send entry message :(");
    }
});

client.once('ready', () => {
    console.log('TOXIC Bot is online !');
})


client.on('message', message => {
    
    try{
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
                message.channel.send("View Commands here :-\nhttps://docs.google.com/spreadsheets/d/1M-9mTWaDkayPkfxI8HbQyEHuUCRnIMaK9E7ISJgiEwM/edit?usp=sharing")
            }

            if(command === 'disconnect' || command === 'leave' || command === 'dc'){
                handleDisconnect(message, command);
                return;
            }

            
            if(command === 'remove' || command === 'rm'){
                if(queue.length >= 1){
                    message.channel.send("'" + queue[queue.length - 1] + "' removed from queue.")
                    queue.pop();
                    if(queue.length == 0){
                        botIsBusy = false;
                    }
                }
                else{
                    message.channel.send("Nothing to remove from queue.")
                }
                return;
            }

            if(command === 'clearqueue' || command === 'clrq'){
                if(queue.length >= 1){
                    message.channel.send("Queue cleared.")
                    queue = [];
                    botIsBusy = false;
                }
                else{
                    message.channel.send("Nothing to remove from queue.")
                }
                return;
            }
            

            if(myJson[command] === undefined){
                message.channel.send("Galat Command hai BSDK !!!!");
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
            message.channel.send("You dont have the permission to use Toxic-Bot (Add a role 'tb') !!");
        } // To check if member has role named tb if not next else
    }
    catch(err){
        console.log("Error occured !!! " + err.message);
    }

});

client.login(process.env.token);
