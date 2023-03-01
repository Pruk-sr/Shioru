const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
	"enable": true,
	"name": "invite",
	"description": "Create and receive invitation links to join the server.",
	"category": "fun",
	"permissions": {
		"user": [PermissionsBitField.Flags.CreateInstantInvite],
		"client": [
			PermissionsBitField.Flags.SendMessages,
			PermissionsBitField.Flags.CreateInstantInvite
		]
	},
	"usage": "invite",
    "function": {
        "command": {}
    }
}

module.exports.function.command = {
	"data": {
		"name": module.exports.name,
		"name_localizations": {
			"en-US": "invite",
			"th": "เชิญ"
		},
		"description": module.exports.description,
		"description_localizations": {
			"en-US": "Create and receive invitation links to join the server.",
			"th": "สร้างและรับลิงค์คำเชิญเพื่อเข้าร่วมเซิร์ฟเวอร์นี้"
		}
	},
	async execute(interaction) {
		interaction.channel.createInvite().then(async (invite) => {
			const guildIcon = interaction.guild.iconURL();
			const inviteEmbed = new EmbedBuilder()
				.setTitle(interaction.client.translate.commands.invite.membership_invitation_card)
				.setDescription("||" + invite.url + "||")
				.setColor("LightGrey")
				.setFooter({ "text": interaction.client.translate.commands.invite.this_product_is_free, "iconURL": guildIcon });

			await interaction.editReply({
				"embeds": [inviteEmbed]
			});
		});
	}
}