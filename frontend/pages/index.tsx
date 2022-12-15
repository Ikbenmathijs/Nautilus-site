import CheckLogin from "../components/checkLogin"
import LogoutButton from "../components/logoutButton"
import User from "../interfaces/User.interface"
import { useState } from "react";
import TokenBox from "../components/tokenBox";
import { Axios, AxiosError } from "axios";
import NautilusApiError from "../interfaces/NautilusApiError.interface";
import DiscordButton from "../components/discordButton";
import ErrorMessage from "../components/errorMessage";

export default function Home() {
  const [name, setName] = useState("");
  const [errorDesc, setErrorDesc] = useState("");
  const [errorTitle, setErrorTile] = useState("Er is iets fout gegaan!");
  const [errorHidden, setErrorHidden] = useState(true);
  
  function onLogIn(user: User) {
    setName(`${user.firstName} ${user.lastName}`);
  }


  function linkSuccess() {
    setErrorDesc("Je account is successvol gelinked!");
  }

  function linkFail(e?: AxiosError) {
    if (e) {
      // TODO: better error handling
      setErrorDesc(`Fout code ${e.response?.status}: ${(e.response?.data as NautilusApiError).error}`);
      setErrorHidden(false);
    } else {
      setErrorDesc("Linking token moet 6 karakters lang zijn!");
      setErrorHidden(false);
    }
  }

  return (<>
    <div className="bg-fixed bg-cover bg-[url('https://cdn.mos.cms.futurecdn.net/v6XoEzDajGRMWNeLY5NMSb-1920-80.jpg.webp')]">
      <div className="relative grid place-content-center backdrop-blur-md h-screen w-screen">
        <div className="bg-white border rounded-lg p-6">
          <div className="mb-5">
            <div className='text-2xl text-slate-700 text-center font-medium'>Welkom {name}!</div>
            <div className='text-lg text-slate-500'>Vul je linking token in om de Server te joinen</div>
          </div>
          <div className="grid static place-content-center">
            <TokenBox onSuccess={linkSuccess} onFail={linkFail} />
          </div>
          <div className="grid static place-content-center mt-4">  
            <div>
              <DiscordButton />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ErrorMessage title={errorTitle} desc={errorDesc} hidden={errorHidden} setHiddenCallback={setErrorHidden} />
    <CheckLogin callback={onLogIn} />
  </>)
}
