const { PermissionsBitField } = require("discord.js");

module.exports = {
    "enable": true,
    "name": "seek",
    "description": "Change the duration of the currently playing song",
    "category": "music",
    "permissions": {
        "client": [PermissionsBitField.Flags.SendMessages]
    },
    "usage": "seek <second>",
    "function": {
        "command": {}
    }
};

module.exports.function.command = {
    "data": {
        "name": module.exports.name,
        "name_localizations": {
            "en-US": "seek",
            "th": "ไปยังช่วง"
        },
        "description": module.exports.description,
        "description_localizations": {
            "en-US": "Change the duration of the currently playing song",
            "th": "เปลี่ยนระยะเวลาของเพลงที่กำลังเล่นอยู่"
        },
        "options": [
            {
                "type": 10,
                "name": "second",
                "name_localizations": {
                    "th": "วินาที"
                },
                "description": "The time in seconds that you want to seek.",
                "description_localizations": {
                    "th": "เวลาเป็นวินาทีที่คุณต้องการเปลี่ยนช่วง"
                },
                "required": true,
                "min_value": 0
            }
        ]
    },
    async execute(interaction) {
        const inputSecond = interaction.options.get("second").value;
        const queue = interaction.client.music.getQueue(interaction);

        if (!queue) return await interaction.editReply(interaction.client.translate.commands.seek.no_queue);

        const queueDuration = queue.songs.map((song, id) => song.duration);
        const queueFormatDuration = queue.songs.map((song, id) => song.formatDuration);

        if (interaction.user.id !== queue.songs[0].user.id && queue.autoplay === false) return await interaction.editReply(interaction.client.translate.commands.seek.not_owner);
        if (!inputSecond) return await interaction.editReply(interaction.client.translate.commands.seek.seek_guide.replace("%s", queueDuration));
        if (inputSecond >= parseInt(queueDuration.join())) return await interaction.editReply(interaction.client.translate.commands.seek.too_much.replace("%s", queueFormatDuration));

        interaction.client.music.seek(interaction, inputSecond);
        await interaction.editReply(interaction.client.translate.commands.seek.sought);
    }
};