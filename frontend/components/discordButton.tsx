export default function DiscordButton() {
    return (<>
        <a href={process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL}>
            <div className="float-left p-3 border rounded-lg bg-indigo-400 hover:bg-indigo-500 hover:shadow-inner text-white font-medium text-md">Discord</div>
        </a>
    </>)
}