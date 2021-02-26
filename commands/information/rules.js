module.exports.run = async function (client, message, args) {
	if (message.guild.id === "618837514882514944") {
		let update = client.config.update;
		message.channel.send({
			"embed": {
				"title": "กฏระเบียบของเซิร์ฟเวอร์นี้",
				"color": 6179554,
				"timestamp": update,
				"footer": {
					"icon_url": "https://hotemoji.com/images/emoji/t/1utnwrapq218t.png",
					"text": "อัพเดทเมื่อ"
				},
				"thumbnail": {
					"url": "https://cdn.discordapp.com/emojis/693345267960774677.png"
				},
				"fields": [
					{
						"name": "**กฏระเบียบข้อที่ 1**",
						"value": "ข้อความจะถูกส่งในช่องทางที่เหมาะสม ข้อความอาจถูกลบโดยไม่ต้องแจ้งให้ทราบหากข้อความนั้นไม่ถูกที่"
					},
					{
						"name": "**กฏระเบียบข้อที่ 2**",
						"value": "ห้ามส่งสแปมหรือข้อความโฆษณาตนเอง (การเชิญเข้าร่วมเซิร์ฟเวอร์ โฆษณา หรืออื่น ๆ) รวมถึงการส่งข้อความหาสมาชิกรายอื่นโดยตรง หากไม่ได้รับอนุญาตจากพนักงาน"
					},
					{
						"name": "**กฏระเบียบข้อที่ 3**",
						"value": "ต้องให้เกียรติผู้อื่น เราจะไม่ยอมให้มีการคุกคาม ล่าแม่มด เหยียดเพศ เหยียดเชื้อชาติ หรือข้อความแสดงความเกลียดชังใด ๆ เกิดขึ้นเป็นอันขาด"
					},
					{
						"name": "**กฏระเบียบข้อที่ 4**",
						"value": "ห้ามเผยแพร่เนื้อหา NSFW หรือลามก ซึ่งรวมถึงข้อความ รูปภาพ หรือลิงก์ที่มีเนื้อหาโป๊เปลือย สื่อไปในทางเพศ ความรุนแรง หรือเนื้อหาอื่นที่มีภาพไม่เหมาะสม"
					},
					{
						"name": "**กฏระเบียบข้อที่ 5**",
						"value": "หากคุณพบเห็นสิ่งที่ขัดต่อกฎหรือสิ่งที่ทำให้รู้สึกไม่ปลอดภัย โปรดแจ้งให้พนักงานทราบ เราต้องการให้เซิร์ฟเวอร์นี้เป็นพื้นที่ที่น่าอยู่!"
					},
					{
						"name": "**กฏระเบียบข้อที่ 6**",
						"value": "เคารพลิขสิทธิ์ของผู้ใช้และวัสดุอื่นๆ และให้เครดิตเมื่อจำเป็น"
					},
					{
						"name": "📄 **คำสุดท้ายจากฉัน**",
						"value": "โปรดใช้สามัญสำนึกพร้อมกับกฎเหล่านี้เนื่องจากรายการนี้ไม่ละเอียดถี่ถ้วน แม้ว่ากฎจะไม่ได้ระบุไว้อย่างชัดเจน การอ้างว่าไม่รู้อะไรเป็นส่วนหนึ่งของกฎไม่มีข้อแก้ตัวสำหรับพฤติกรรมที่ไม่ดี นอกจากนี้อย่าลืมอ่านคำอธิบายช่องและข้อความที่ถูกตรึงในช่องที่คุณอยู่ช่องบางช่องมีแนวทางเฉพาะของตนเองในการปฏิบัติตาม"
					}
				]
			}
		});

		let myGuild = client.guilds.cache.find(servers => servers.id === "618837514882514944");
		let guildChannel = myGuild.channels.cache.find(channels => channels.id === "692297482062790706");
		guildChannel.messages.fetch("712405302258958356")
		.then(messages => messages.edit({ embed }));
	} else {
		message.channel.send("🚫 ขออภัยย...คำสั่งนี้ใช้งานได้เฉพาะเซิร์ฟเวอร์ผู้สร้างเท่านั้นนะคะ");
	}
};

module.exports.help = {
	"name": "rules",
	"description": "See information about rules.",
	"usage": "rules",
	"category": "guild",
	"aliases": ["กฏ"]
};