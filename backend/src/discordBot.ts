import { Client, GatewayIntentBits, Guild, Role, Snowflake } from "discord.js";
import dotenv from "dotenv";

const client = new Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.DirectMessages] });
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
    const DMChannel = member.dmChannel || await member.createDM();
    console.log(`${member} ${member.dmChannel}`);
    if (member && DMChannel) {
        await DMChannel.send(`Je bent gekicked van de fioretti minecraft discord server.\n\nReden: ${reason}`);
    }
    await guild.members.kick(userId, reason);
}

export async function getMember(userId: string) {
    try {
        return await guild.members.fetch(userId);
    } catch (e) {
        return null;
    } 
}

export async function giveRole(userId: string) {
    try {
    
        const member = await guild.members.fetch(userId);
        console.log(member);
        const role = await guild.roles.fetch(process.env.DISCORD_ROLE_ID as string) as Role;
        console.log(role);
        console.log(process.env.DISCORD_ROLE_ID as string);
        await member.roles.add(role);
    } catch (e) {
        return null;
    }
}

dotenv.config();

client.login(process.env.DISCORD_BOT_TOKEN);