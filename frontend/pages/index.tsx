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
  <div>
    <h1 className="text-slate-400">Hallo {name}!</h1>
    <br />
    <br />
    <br />
    <p className="dark:text-white">Je kan hier je linking token invullen:</p>
    <br />
    <TokenBox onSuccess={linkSuccess} onFail={linkFail} />
    <br />
    <br />
    <p className="dark:text-white">{status}</p>
    <br />
    <br />
    <DiscordButton />
    <br />
    <br />
    <LogoutButton />
    <CheckLogin callback={onLogIn} />
  </div>
  )
}
