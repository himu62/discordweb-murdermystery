import { Client, MessagePayload, TextChannel } from "discord.js";

(async () => {
  const client = new Client({ intents: [] });
  const guild = await client.guilds.fetch("hogehoge");
  const channel = guild.channels.cache.first() as TextChannel;
  await channel.send({
    files: [{ name: "hogehoge.pdf", data: new Buffer(0) }],
  } as MessagePayload);
})();
