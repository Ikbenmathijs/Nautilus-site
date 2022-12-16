// deze pagina wordt gebruikt als redirect voor discord oAuth2, het heeft geen content
// en als je het bezoekt zonder code parameter wordt je naar home gestuurt
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/errorMessage";
import NautilusApiError from "../../interfaces/NautilusApiError.interface";
import SuccessMessage from "../../components/successMessage";

export default function DiscordRedirectReceiver() {

    const router = useRouter();


    const [errorHidden, setErrorHidden] = useState(true);
    const [errorDesc, setErrorDesc] = useState("Er is iets fout gegaan!");
    const [successHidden, setSuccessHidden] = useState(true);

    useEffect(() => {
        if (router.isReady) {
            if (router.query.code && localStorage.getItem("loginToken")) {
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/discord`, {
                    token: localStorage.getItem("loginToken"),
                    discordCode: router.query.code
                }).then((response) => {
                    setSuccessHidden(false);
                }).catch((e: AxiosError) => {
                    console.error(e);
                    setErrorHidden(false);
                    setErrorDesc(`Fout ${e.response?.status}: ${(e.response?.data as NautilusApiError).error}`);
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
                    <div className='text-lg text-slate-500'>Je bent de discord server nu aan het joinen...</div>
                    <div className="flex justify-center mt-3">
                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-rose-500 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
        <ErrorMessage title="Er is iets fout gegaan!" desc={errorDesc} hidden={errorHidden} setHiddenCallback={setErrorHidden} okButtonCallback={() => {router.push("/")}} />
        <SuccessMessage title="Het is gelukt!" desc="Je zit nu in de discord server!" hidden={successHidden} setHiddenCallback={setSuccessHidden} okButtonCallback={() => {router.push("/");}} />
    </>)
}