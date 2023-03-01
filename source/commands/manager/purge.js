const { PermissionsBitField } = require("discord.js");
const { catchError } = require("../../utils/consoleUtils");

module.exports = {
	"enable": true,
	"name": "purge",
	"description": "Delete a lot of messages",
	"category": "manager",
	"permissions": {
		"user": [
			PermissionsBitField.Flags.ReadMessageHistory,
			PermissionsBitField.Flags.ManageMessages
		],
		"client": [
			PermissionsBitField.Flags.SendMessages,
			PermissionsBitField.Flags.ReadMessageHistory,
			PermissionsBitField.Flags.ManageMessages
		]
	},
	"usage": "purge <amount>",
    "function": {
        "command": {}
    }
};

module.exports.function.command = {
	"data": {
		"name": module.exports.name,
		"name_localizations": {
			"en-US": "purge",
			"th": "ล้าง"
		},
		"description": module.exports.description,
		"description_localizations": {
			"en-US": "Delete a lot of messages",
			"th": "ลบข้อความจำนวนมาก"
		},
		"options": [
			{
				"type": 10,
				"name": "amount",
				"name_localizations": {
					"th": "จำนวน"
				},
				"description": "The amount of messages to delete",
				"description_localizations": {
					"th": "จำนวนข้อความที่จะลบ"
				},
				"required": true,
				"min_value": 0,
				"max_value": 100
			}
		]
	},
	async execute(interaction) {
		let messageCount = interaction.options.get("amount").value;

		interaction.channel.messages.fetch({
			"limit": 1
		}).then((previousMessages) => {
			interaction.channel.messages.fetch({
				"limit": messageCount,
				"before": previousMessages.first().id
			}).then(async (messages) => {
				await interaction.channel.bulkDelete(messages, true);
				await interaction.editReply(interaction.client.translate.commands.purge.message_cleared.replace("%s", messages.size));
			}).catch((error) => {
				catchError(interaction.client, interaction, module.exports.name, error);
			});
		});
	}
};