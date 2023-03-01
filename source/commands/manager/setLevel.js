const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { levelSystem } = require("../../utils/databaseUtils");

module.exports = {
    "enable": true,
    "name": "setLevel",
    "description": "Set Level of Members",
    "category": "manager",
    "permissions": {
        "user": [PermissionsBitField.Flags.ManageGuild],
        "client": [
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ManageGuild
        ]
    },
    "usage": "setLevel <member; id, username, tag> <amount>",
    "function": {
        "command": {}
    }
};

module.exports.function.command = {
    "data": {
        "name": module.exports.name.toLowerCase(),
        "name_localizations": {
            "en-US": "setlevel",
            "th": "ตั้งค่าเลเวล"
        },
        "description": module.exports.description,
        "description_localizations": {
            "en-US": "Set the members' level.",
            "th": "ตั้งค่าค่าประสบการณ์ของสมาชิก"
        },
        "options": [
            {
                "type": 6,
                "name": "member",
                "name_localizations": {
                    "th": "สมาชิก"
                },
                "description": "The name of the member who wants to set the level value.",
                "description_localizations": {
                    "th": "ชื่อของสมาชิกที่ต้องการกำหนดค่าเลเวล"
                },
                "required": true
            },
            {
                "type": 10,
                "name": "amount",
                "name_localizations": {
                    "th": "จำนวน"
                },
                "description": "The amount of level that you want to set.",
                "description_localizations": {
                    "th": "จำนวนเลเวลที่คุณต้องการตั้งค่า"
                },
                "required": true,
                "min_value": 0
            }
        ]
    },
    async execute(interaction) {
        const inputMember = interaction.options.get("member").value;
        const inputAmount = interaction.options.get("amount").value;

        const member = interaction.guild.members.cache.find(members => (members.user.username === inputMember) || (members.user.id === inputMember) || (members.user.tag === inputMember));

        if (!member) return await interaction.editReply(interaction.client.translate.commands.setLevel.can_not_find_user);

        const memberAvatar = member.user.avatarURL();
        const memberUsername = member.user.username;
        const memberID = member.user.id;

        const data = levelSystem(interaction.client, interaction, "PUT", memberID, inputAmount);

        const exp = data.exp;
        const level = data.level;
        const notify = data.notify;
        const status = data.status;

        if (status === "error") return await interaction.editReply(interaction.client.translate.commands.setLevel.error);
        if (notify) {
            const setLevelEmbed = new EmbedBuilder()
                .setDescription(interaction.client.translate.commands.setLevel.level_was_changed.replace("%s", memberUsername))
                .setColor("Blue")
                .setThumbnail(memberAvatar)
                .setFooter({ "text": interaction.client.translate.commands.setLevel.set_by_staff, "iconURL": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/pencil_270f.png" })
                .addFields(
                    [
                        {
                            "name": interaction.client.translate.commands.setLevel.level,
                            "value": "```" + exp + "```"
                        },
                        {
                            "name": interaction.client.translate.commands.setLevel.experience,
                            "value": "```" + level + "```"
                        }
                    ]
                );

            await notify.send({ "embeds": [setLevelEmbed] });
            await interaction.editReply(interaction.client.translate.commands.setLevel.notification_complete);
        } else {
            await interaction.editReply(interaction.client.translate.commands.setLevel.success);
        }
    }
}