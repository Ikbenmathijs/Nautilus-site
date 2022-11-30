import { useRouter } from "next/router";

export default function LogoutButton() {

    const router = useRouter();

    function logout() {
        localStorage.removeItem("loginToken");
        router.push("/login");
    }
 

    return (
        <button onClick={logout}>Uitloggen</button>
    )
}