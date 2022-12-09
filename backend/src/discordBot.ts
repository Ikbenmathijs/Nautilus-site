import { Client, GatewayIntentBits, Guild } from "discord.js";
import dotenv from "dotenv";

const client = new Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans] });
let guild: Guild;


client.on("ready", async () => {
    console.log(`Discord bot logged in as ${client.user?.tag}`);
    guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID as string);
    if (guild) {
        console.log(`Fetched guild with ID ${guild.id}`);
    } else {
        console.error("Failed to fetch guild!");
    }
});


export async function kickUser(userId: string, reason: string) {
    const member = await guild.members.fetch(userId);
    if (member && member.dmChannel) {
        await member.dmChannel.send(`Je bent gekicked van de fioretti minecraft discord server.\n\nReden: ${reason}`);
    }
    await guild.members.kick(userId, reason);
}

export async function getMember(userId: string) {
    return await guild.members.fetch(userId);
}

dotenv.config();

client.login(process.env.DISCORD_BOT_TOKEN);