const Database = require('wow-classic-items');
const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.aws_default_region,
    accessKeyId: process.env.dynamodb_id,
    secretAccessKey: process.env.dynamodb_secret
})

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'Guild_Bank';

module.exports = {
    name: 'guildbank',
    description: "Displays the guild bank items",
    async execute(message, args, Discord) {

        const params = {
            TableName: tableName,
            ScanIndexForward: false
        }

        const result = await docClient.scan(params).promise();

        var itemString = '';

        if(result.Count > 0)
        {
            for(var i = result.Items.length - 1; i >= 0; i--)
            {
                itemString += result.Items[i].item + ' x' + result.Items[i].amount + '\n';
            }
    
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Guild Bank')
            .setDescription('These are the items in the guild bank')
            .addField('Items', itemString, true)
    
            message.channel.send({ embeds: [newEmbed] });
        } 
        else
        {
            message.channel.send('Guild Bank Empty');
        }
    }
}