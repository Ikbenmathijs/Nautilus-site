export default function DiscordButton() {
    return (<>
        <a href="https://discord.com/api/oauth2/authorize?client_id=1049305516385501235&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&response_type=code&scope=identify%20guilds.join">
            <div className="float-left p-3 border rounded-lg bg-indigo-400 hover:bg-indigo-500 hover:shadow-inner text-white font-medium text-md">Discord</div>
        </a>
    </>)
}