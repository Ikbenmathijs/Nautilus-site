import { useRouter } from "next/router";

export default function LogoutButton() {

    const router = useRouter();

    function logout() {
        localStorage.removeItem("loginToken");
        router.push("/login");
    }
 

    return (<>
        <button onClick={logout}>
            <div className="float-right p-3 ml-5 border rounded-lg bg-rose-400 hover:bg-rose-500 hover:shadow-inner text-white font-medium text-md">Uitloggen</div>
        </button>
    </>)
}