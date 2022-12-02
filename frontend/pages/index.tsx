import CheckLogin from "../components/checkLogin"
import LogoutButton from "../components/logoutButton"
import User from "../interfaces/User.interface"
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  function onLogIn(user: User) {
    setName(`${user.firstName} ${user.lastName}`);
  }


  return (
  <div>
    <h1 className="text-slate-400">Hallo {name}!</h1>
    <LogoutButton />
    <CheckLogin callback={onLogIn} />
  </div>
  )
}
