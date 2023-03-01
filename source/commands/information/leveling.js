const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { levelSystem } = require("../../utils/databaseUtils");

module.exports = {
    "enable": true,
    "name": "leveling",
    "description": "See information about your level.",
    "category": "information",
    "permissions": {
        "client": [PermissionsBitField.Flags.SendMessages]
    },
    "usage": "leveling (member: id, username, tag)",
    "function": {
        "command": {}
    }
};

module.exports.function.command = {
    "data": {
        "name": module.exports.name,
        "name_localizations": {
            "en-US": "leveling",
            "th": "เลเวล"
        },
        "description": module.exports.description,
        "description_localizations": {
            "en-US": "See information about your level.",
            "th": "ดูข้อมูลเกี่ยวกับเลเวลของคุณ"
        },
        "options": [
            {
                "type": 6,
                "name": "member",
                "name_localizations": {
                    "th": "สมาชิก"
                },
                "description": "The name of the member you wish to view the level.",
                "description_localizations": {
                    "th": "ชื่อของสมาชิกที่คุณต้องการดูระดับของเขา"
                },
                "required": false
            }
        ]
    },
    async execute(interaction) {
        const inputMember = interaction.options.get("member");

        let authorAvatar = interaction.user.displayAvatarURL();
        let authorFetch = await interaction.user.fetch();
        let authorID = interaction.user.id;
        let memberBot = false;

        if (inputMember) {
            const member = interaction.guild.members.cache.find(members => (members.user.username === inputMember.value) || (members.user.id === inputMember.value) || (members.user.tag === inputMember.value));

            if (!member) return await interaction.editReply(interaction.client.translate.commands.leveling.can_not_find_user);

            authorAvatar = member.user.avatarURL();
            authorFetch = await member.user.fetch();
            authorID = member.user.id;
            memberBot = member.user.bot;
        }
        if (memberBot) return await interaction.editReply(interaction.client.translate.commands.leveling.bot_do_not_have_level);

        const data = await levelSystem(interaction.client, interaction, "GET", authorID);

        if (!data) return await interaction.editReply(interaction.client.translate.commands.leveling.user_no_data);

        const exp = data.exp;
        const level = data.level;
        const nextEXP = data.nextEXP;

        const levelingEmbed = new EmbedBuilder()
            .setTitle(interaction.client.translate.commands.leveling.your_experience)
            .setColor(authorFetch.accentColor)
            .setThumbnail(authorAvatar)
            .setTimestamp()
            .addFields(
                [
                    {
                        "name": interaction.client.translate.commands.leveling.level,
                        "value": "```" + level + "```"
                    },
                    {
                        "name": interaction.client.translate.commands.leveling.experience,
                        "value": "```" + exp + "/" + nextEXP + "```"
                    }
                ]
            );

        await interaction.editReply({
            "embeds": [levelingEmbed]
        });
    }
}