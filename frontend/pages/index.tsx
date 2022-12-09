import CheckLogin from "../components/checkLogin"
import LogoutButton from "../components/logoutButton"
import User from "../interfaces/User.interface"
import { useState } from "react";
import TokenBox from "../components/tokenBox";
import { Axios, AxiosError } from "axios";
import NautilusApiError from "../interfaces/NautilusApiError.interface";
import DiscordButton from "../components/discordButton";

export default function Home() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  function onLogIn(user: User) {
    setName(`${user.firstName} ${user.lastName}`);
  }


  function linkSuccess() {
    setStatus("Je account is successvol gelinked!");
  }

  function linkFail(e?: AxiosError) {
    console.log("hallo")
    if (e) {
      // TODO: better error handling
      setStatus(`Fout code ${e.response?.status}: ${(e.response?.data as NautilusApiError).error}`);
    } else {
      console.log("hoi")
      setStatus("Linking token moet 6 karakters lang zijn!");
    }
  }

  return (
  <>
    <div className="bg-fixed bg-cover bg-[url('https://cdn.mos.cms.futurecdn.net/v6XoEzDajGRMWNeLY5NMSb-1920-80.jpg.webp')]">
      <div className="backdrop-blur-md">
        <div className="py-16 text-center text-slate-200 text-4xl font-bold">Hallo {name}!</div>
      </div>
    </div>
    <LogoutButton />
    <CheckLogin callback={onLogIn} />
  </>
  )
}
