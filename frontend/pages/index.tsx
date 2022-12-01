import CheckLogin from "../components/checkLogin"
import LogoutButton from "../components/logoutButton"
import User from "../interfaces/User.interface"

export default function Home() {

  function onLogIn(user: User) {
    console.log(user);
  }


  return (
  <div>
    <h1>Hello world!</h1>
    <LogoutButton />
    <CheckLogin callback={onLogIn} />
  </div>
  )
}
