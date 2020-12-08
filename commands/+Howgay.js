module.exports = {
    name : 'howgay',
    description : " ",
    execute(message, args){
        m1 = "You are " + Math.floor(Math.random()*100) + "% gay."
        message.channel.send(m1);
    }
}