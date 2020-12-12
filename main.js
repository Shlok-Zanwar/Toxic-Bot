const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = "+";

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('OP Bot is online !');
})

client.on('message', message => {
    // let allowedRole = message.guild.roles.cache.find("name", "tb");

    
        
    

    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    if(message.member.roles.cache.find(role => role.name === "tb")){

        const args = message.content.slice(prefix.length).split("/ +/");
        const command = args.shift().toLowerCase();

        if(command === 'hardik'){
            client.commands.get('hardik').execute(message, args);
        }
        else if(command === 'rohan'){
            client.commands.get('rohan').execute(message, args);
        }
        else if(command === 'howgay'){
            client.commands.get('howgay').execute(message, args);
        }
        else if(command === 'rishishrimali'){
            client.commands.get('rishishrimali').execute(message, args);
        }
        else if(command === 'aiman'){
            client.commands.get('aiman').execute(message, args);
        }
        else if(command === 'disconnect' || command === 'leave' || command === 'dc'){
            if(message.guild.voice === undefined){
                message.channel.send("Arey chutiye mai hu hee nhi koi channel mai");
                return;
            }

            if (message.guild.voice.channelID === null){
                message.channel.send("Arey chutiye mai hu hee nhi koi channel mai");
            }
            else if(message.member.voice.channelID !== message.guild.voice.channelID){
                message.channel.send("Pehle mere sath same channel mai aa loudu.");
            }
            else{
                message.guild.voice.connection.disconnect();
            }
        }



        // Song commands
        else if(command === 'apnibhavnaokodaalo' || command === 'bhavnao'){
            client.commands.get('ApniBhavnaoKoDaalo').execute(message, args);
        }

        else if(command === 'apnimaamaatchudao' || command === 'maachudao'){
            client.commands.get('ApniMaaMatChu').execute(message, args);
        }

        else if(command === 'areymaachudipadihai' || command === 'maachudi'){
            client.commands.get('AreyMCPadiHai').execute(message, args);
        }

        else if(command == 'bikgayihaigormint' || command === 'gormint'){
            client.commands.get('BikGayiGormint').execute(message, args);
        }

        else if(command === 'bolnaauntyaaukya' || command === 'aunty'){
            client.commands.get('BolNaAuntyAauKya').execute(message, args);
        }

        else if(command === 'terigandmaidaalduga' || command === 'gand'){
            client.commands.get('BSDKTeriGMaiDaalDunga').execute(message, args);
        }

        else if(command === 'chalbhosdike' || command === 'chalbsdk'){
            client.commands.get('ChalBsdk').execute(message, args);
        }

        else if(command === 'chupbilkulchup' || command === 'chup'){
            client.commands.get('ChupBilkulChup').execute(message, args);
        }

        else if(command === 'deshsankatmaihai' || command === 'desh'){
            client.commands.get('DeshSankatMaiHai').execute(message, args);
        }

        else if(command === 'dhatterimaaki' || command === 'dhatmkc'){
            client.commands.get('DhatTeriMkc').execute(message, args);
        }

        else if(command === 'jantamaafnhikaregi' || command === 'janta'){
            client.commands.get('JantaMaafNhiKaregi').execute(message, args);
        }

        else if(command === 'kaunhaiyehlog' || command === 'log'){
            client.commands.get('KaunHaiYehLog').execute(message, args);
        }

        else if(command === 'kehnakyachahtehoo' || command === 'kehna'){
            client.commands.get('KehnaKyaChahteHoo').execute(message, args);
        }

        else if(command === 'maakabhosdamc' || command === 'mkbmc'){
            client.commands.get('MaaKaBsdaMc').execute(message, args);
        }

        else if(command === 'maimchu' || command === 'maimchu'){
            client.commands.get('MaiMcHu').execute(message, args);
        }

        else if(command === 'netaneta' || command === 'neta'){
            client.commands.get('NetaNeta').execute(message, args);
        }

        else if(command === 'nikallaude' || command === 'nikal'){
            client.commands.get('NikalLaudeBhau').execute(message, args);
        }

        else if(command === 'rawdiesgaali' || command === 'toxic'){
            client.commands.get('Rawdies').execute(message, args);
        }

        else if(command === 'saaremilkarmcbaanare' || command === 'mcbanare'){
            client.commands.get('SaareMilkarMcBanare').execute(message, args);
        }

        else if(command === 'sachboldebsdk' || command === 'sach'){
            client.commands.get('SachBoldeBSDK').execute(message, args);
        }

        else if(command === 'bhagwansedaaro' || command === 'daro'){
            client.commands.get('SharamKaroBhagwanSeDaro').execute(message, args);
        }

        else if(command === 'terimaadisco' || command === 'disco'){
            client.commands.get('TeriMaaDiscoBhau').execute(message, args);
        }

        else if(command === 'terimaakurkure' || command === 'kurkure'){
            client.commands.get('TeriMaaKurkureBhau').execute(message, args);
        }

        else if(command === 'tumsenahopayega' || command === 'nahopayega'){
            client.commands.get('TumseNaHoPayega').execute(message, args);
        }

        else if(command === 'whatwtf' || command === 'wtf'){
            client.commands.get('WhatWTF').execute(message, args);
        }

        else if(command === 'yehkoirkhai' || command === 'rk'){
            client.commands.get('YehKoiRkHai').execute(message, args);
        }

        else if(command === 'yehtohtattihai' || command === 'tatti'){
            client.commands.get('YehTohTattiHai').execute(message, args);
        }

        else if(command === 'salamalikum' || command === 'salam'){
            client.commands.get('SalamAlikum').execute(message, args);
        }

        else if(command === 'terimkc' || command === 'terimk'){
            client.commands.get('TeriMKC').execute(message, args);
        }

        else if(command === 'oooo' || command ==  'dilwaale'){
            client.commands.get('DilWaaleOOOO').execute(message, args);
        }

        else if(command === 'nahi' || command ==  'nai'){
            client.commands.get('Nahi').execute(message, args);
        }
        
        else if(command === 'baapkomatsikha' || command ==  'matsikha'){
            client.commands.get('MalumHaiTereBaapKoMatSikha').execute(message, args);
        }
        
        else if(command === 'abeysaale' || command ==  'saale'){
            client.commands.get('AbeySaale').execute(message, args);
        }
        
        else if(command === 'padhailikhai' || command ==  'padhai'){
            client.commands.get('PadhaiLikhaiMaiDhyanLagao').execute(message, args);
        }
        
        else if(command === 'zindatohbaalbhihai' || command ==  'jhaatkebaal'){
            client.commands.get('ZindaTohBaalBhiHai').execute(message, args);
        }
        
        else if(command === 'gandnaphulao' || command ==  'mcdenge'){
            client.commands.get('GandNaaPhulao').execute(message, args);
        }
        
        else if(command === 'chacha' || command ==  'bsdkchacha'){
            client.commands.get('ChachaOhhChacha').execute(message, args);
        }
        
        else if(command === 'musicbandkaro' || command ==  'musicband'){
            client.commands.get('AreyMusicBandKaroZaara').execute(message, args);
        }
        
        else if(command === 'restkro' || command ==  'rip'){
            client.commands.get('ThodaRestKarLijiye').execute(message, args);
        }
        
        else if(command === 'kisekehrha' || command ==  'kkrh'){
            client.commands.get('KiseKehRahaHai').execute(message, args);
        }
        
        else if(command === 'sorryraga' || command ==  'sorry'){
            client.commands.get('SorrySorryRAGA').execute(message, args);
        }
        
        else if(command === 'laudaphekke' || command ==  'purakhandan'){
            client.commands.get('LaudaPhekKeMaruga').execute(message, args);
        }
        
        else if(command === 'oh' || command ==  'ohh'){
            client.commands.get('Ohhhhhhhh').execute(message, args);
        }
        
        else if(command === 'pattseheadshot' || command ==  'headshot'){
            client.commands.get('PattSeHeadshot').execute(message, args);
        }
        
        else if(command === 'mujhemaro' || command ==  'mmm'){
            client.commands.get('MaroMujheMaro').execute(message, args);
        }
        
        else if(command === 'matlabkuchbhi' || command ==  'kuchbhi'){
            client.commands.get('MatlabKuchBhi').execute(message, args);
        }
        
        else if(command === 'itsherchoice' || command ==  'herchoice'){
            client.commands.get('ItsHerChoice').execute(message, args);
        }
        
        else if(command === 'buralagtahai' || command ==  'dilsebura'){
            client.commands.get('BuraLagtaHaiBhai').execute(message, args);
        }
        
        else if(command === 'ekdabbagu' || command ==  'dabbagu'){
            client.commands.get('EkDabbaGuuBhau').execute(message, args);
        }
        
        else if(command === 'lundinsaan' || command ==  'lundinsaan'){
            client.commands.get('LundInsaanCarry').execute(message, args);
        }

        // Else
        else{
            message.channel.send("Galat command hai BSDK !!!");
        }
    }
    else{
        message.channel.send("You dont have the permission to use Toxic-Bot (Add a role 'tb') !!");
    }

});



client.login(process.env.token);