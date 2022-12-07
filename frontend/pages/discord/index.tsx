// deze pagina wordt gebruikt als redirect voor discord oAuth2, het heeft geen content
// en als je het bezoekt zonder code parameter wordt je naar home gestuurt
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DiscordRedirectReceiver() {

    const router = useRouter();

    const [status, setStatus] = useState("Je bent de discord server nu aan het joinen...");

    useEffect(() => {
        if (router.isReady) {
            if (router.query.code && localStorage.getItem("loginToken")) {
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/discord`, {
                    token: localStorage.getItem("loginToken"),
                    discordCode: router.query.code
                }).then((response) => {
                    router.push("/");
                }).catch((e) => {
                    console.error(e);
                    setStatus("Oh nee, Er is iets fout gegaan!")
                })
            } else {
                // geen discord redirect code
                router.push("/");
            }
        }
    }, [router.isReady]);


    return (<div className="dark:text-white">
        <h1>Even wachten!</h1>
        <p>{status}</p>
    </div>)
}