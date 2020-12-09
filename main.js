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
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

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

    else if(command === 'terimkc' || command === 'terimkc'){
        client.commands.get('TeriMKC').execute(message, args);
    }

    else if(command === 'oooo' || command ==  'dilwaale'){
        client.commands.get('DilWaaleOOOO').execute(message, args);
    }

    // Else
    else{
        message.channel.send("Galat command hai BSDK !!!");
    }

});



client.login(process.env.token);