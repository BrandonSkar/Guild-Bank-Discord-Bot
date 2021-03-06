const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

const prefix = process.env.prefix;
const fs = require('fs');
const { CLIENT_RENEG_WINDOW } = require('tls');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('WoW Guild Bank Online');
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'gb' || command === 'guildbank')
    {
        client.commands.get('guildbank').execute(message, args, Discord);
    }

    if(command === 'add')
    {
        client.commands.get('additems').execute(message, args);
    }

    if(command === 'remove' || command === 'take')
    {
        client.commands.get('removeitems').execute(message, args);
    }

    if(command === 'delete')
    {
        client.commands.get('deleteitems').execute(message, args);
    }

    if(command === 'crit' || command === 'critical')
    {
        client.commands.get('setcritical').execute(message, args);
    }

    if(command === 'low')
    {
        client.commands.get('lowitems').execute(message, args, Discord);
    }

    if(command === 'help')
    {
        client.commands.get('helpcommand').execute(message, args);
    }
});

client.login(process.env.token);