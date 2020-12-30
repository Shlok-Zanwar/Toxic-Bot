// channel is directly the channel to send (eg :- "message.channel".send)
function sendEmbedMessage(channel, title, description){
    var messageToSend;
    if(description == null){
        messageToSend = new Discord.MessageEmbed()
            .setColor(colorEmbed)
            .setDescription(title)
    }
    else{
        messageToSend = new Discord.MessageEmbed()
            .setColor(colorEmbed)
            .addField(title, description)
    }
    channel.send(messageToSend);
}


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
        sendEmbedMessage(message.channel, "You must be in a voice channel.", null);
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
        sendEmbedMessage(message.channel, "Arey chutiye mai hu hee nhi koi channel mai ...", null);
        return;
    }
    // If not in channel
    if (message.guild.voice.channelID === null){
        sendEmbedMessage(message.channel, "Arey chutiye mai hu hee nhi koi channel mai ...", null);
        return;
    }
    // if not in same channel
    else if(message.member.voice.channelID !== message.guild.voice.channelID){
        sendEmbedMessage(message.channel, "Pehle mere sath same channel mai aa loudu.", null);
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
        sendEmbedMessage(message.channel, "I am already playing something in '" + message.guild.voice.channel.name + "' voice channel.", null);
    }
    else if(queue.length >= maxQueue){
        sendEmbedMessage(message.channel, "Queue is full, please wait.", null);
    }
    else{
        sendEmbedMessage(message.channel, "'" + command + "' added to queue.", null);
        queue.push(command);
    }
}


function sendHelpMessage(channel){
    const messageToSend = new Discord.MessageEmbed()
        .setColor(colorEmbed)
        .setTitle('Apun aa gaya hai meme bajane.')
        .setAuthor('TOXIC BOT')
        .setDescription("To use the bot, you should have admin permissions or need to have a role named 'tb'.\nWe recommend using earphones :headphones::headphones:")
        .addFields(
            { name: 'For Help', value: 'tb help', inline: true },
            { name: 'To Disconnect', value: 'tb dc', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Website', value: 'https://toxicbotdiscord.github.io/' },
            { name: 'Prefix', value: '"tb "', inline: true },
            { name: 'Example', value: '"tb nahi"' , inline: true},
            { name: 'Commands', value: 'https://toxicbotdiscord.github.io/' },
        )
        .setImage('https://i.ibb.co/7tynPG9/Logo.jpg')
    channel.send(messageToSend);
}


function printQueue(message){
    if(queue.length >= 1){
        var strToPrint = "";
        var i;
        for(i = 0; i < queue.length; i++){
            strToPrint += (i+1).toString() + ") " + queue[i] + "\n";
        }
        sendEmbedMessage(message.channel, "Queue", strToPrint);
    }
    else{
        sendEmbedMessage(message.channel, "Queue is empty", null);
    }
}


function findChannelToSend(guild, updateMessage){
    
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
        if(updateMessage){
            sendEmbedMessage(channel, "New Update !!!", "We dropped a new update !!! Head on to our website for details.")
        }
        sendHelpMessage(channel);
        
    }
    catch(err){
        console.log("Couldnt send entry message :(" + err.message);
    }
}


function sendServerUpdateMessage(){
    var guildList = client.guilds.cache;
    guildList.forEach(guild => {
        try{
            findChannelToSend(guild, true);
        }
        catch(err){
            console.log("couldnt send message to " + guild.name);
        }
    })
}


function allChannelNames(message){
    const guilds = client.guilds.cache.array()

    const embed = new Discord.MessageEmbed()
        .setColor(colorEmbed)
        .setTitle("Server Id  ---------------------  Name")
        .setDescription('\u200B');
        // .setTitle("743560692937785534       Name")
        guilds.forEach(g => {
            embed.addField(g.id + "  ---  " + g.name, '\u200B')
        })
    message.channel.send(embed)
}
