const { VoiceBroadcast } = require("discord.js");
const path = require('path');
const ytdl = require("ytdl-core");

module.exports = {
    name : 'BSDKTeriGMaiDaalDunga',
    description : " ",
    execute(message, args){

        const {voice} = message.member

        if(!voice.channelID){
            message.channel.send('You must be in a voice channel.');
        }
        else{
            voice.channel.join().then((connection) => {
                connection.play(path.join(__dirname, '_BSDKTeriGMaiDaalDuga.mp3'));

            })
        }
    }
}