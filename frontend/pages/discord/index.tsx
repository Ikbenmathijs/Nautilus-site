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


    return (<>
        <div className="bg-fixed bg-cover bg-[url('https://cdn.mos.cms.futurecdn.net/v6XoEzDajGRMWNeLY5NMSb-1920-80.jpg.webp')]">
            <div className='grid static place-content-center h-screen w-screen backdrop-blur-md'>
                <div className='static bg-white border rounded-lg p-5'>
                    <div className='text-2xl text-rose-600 text-center font-bold'>Even wachten</div>
                    <div className='text-lg text-slate-500'>{status}</div>
                    <div className="flex justify-center mt-3">
                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-rose-500 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    </>)
}