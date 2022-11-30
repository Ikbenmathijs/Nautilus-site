import CheckLogin from "../components/checkLogin"
import LogoutButton from "../components/logoutButton"

export default function Home() {
  return (
  <div>
    <h1>Hello world!</h1>
    <LogoutButton />
    <CheckLogin />
  </div>
  )
}
