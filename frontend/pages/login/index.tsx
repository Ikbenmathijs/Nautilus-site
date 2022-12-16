import { AxiosError } from "axios";
import { useState } from "react";
import LoginButton from "../../components/loginButton";
import ErrorMessage from "../../components/errorMessage";
import NautilusApiError from "../../interfaces/NautilusApiError.interface";


export default function Home() {

    const [errorDesc, setErrorDesc] = useState("Het is niet gelukt om in te loggen.");
    const [errorHidden, setErrorHidden] = useState(true);


    function loginFail(e?: AxiosError) {
        setErrorHidden(false);
        e ? setErrorDesc(`Fout ${e.response?.status}: ${(e.response?.data as NautilusApiError).error}`) : setErrorDesc("Het is niet gelukt om in te loggen.");
    }

    return (<>
        <div className="bg-fixed bg-cover bg-[url('https://cdn.mos.cms.futurecdn.net/v6XoEzDajGRMWNeLY5NMSb-1920-80.jpg.webp')]">
            <div className='grid static place-content-center h-screen w-screen backdrop-blur-md'>
                <div className='static bg-white border rounded-lg p-5'>
                    <div className="mb-5">
                        <div className='text-2xl text-slate-600 text-center font-medium'>Login</div>
                        <div className='text-lg text-slate-500'>login met google om de Server te joinen</div>
                    </div>
                    <div className="grid static place-content-center"><LoginButton onLoginFail={loginFail} /></div>
                </div>
            </div>
        </div>
        <ErrorMessage title="Er is iets fout gegaan!" desc={errorDesc} hidden={errorHidden} setHiddenCallback={setErrorHidden} />
    </>)
}