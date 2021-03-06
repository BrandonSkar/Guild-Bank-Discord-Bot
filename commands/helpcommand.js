require('dotenv').config();

module.exports = {
    name: 'helpcommand',
    description: "Displays the functions of the program",
    async execute(message, args) {
        message.channel.send("**!add (item name) (amount)** - To add items.\nex: !add flask of relentless assault 10\n\n**!remove (item name) (amount)** - To remove items.\nex: !remove flask of blinding light 15\n\n**!delete (item name)** - To delete item.\nex: !delete large prismatic shard\n\n**!crit (item name) (amount)** - To set an item to critically low when under set amount.\nex: !crit flask of mighty restoration 15\n\n**!crit (item name) false** - To remove the critical status of an item.\nex: !crit onslaught elixir false\n\n**!low ** - To view critically low items.\n**!gb ** - To view all items in Guild Bank.");
    }
}