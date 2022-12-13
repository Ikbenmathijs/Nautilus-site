import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";



export default function CheckLogin({callback}: {callback?: Function}) {

    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            if (localStorage.getItem("loginToken") != null) {
                axios.post(`${process.env.NEXT_PUBLIC_API_URL as string}/auth`, {
                    token: localStorage.getItem("loginToken")
                }).then((response) => {
                    console.log("Verified login!");
                    if (callback) {
                        callback(response.data);
                    }
                }).catch((e) => {
                    console.log("You have to log in again!");
                    router.push("/login");
                });
            } else {
                console.log("You're not logged in!");
                router.push("/login");
            }
        }
    }, [router.isReady]);



    return (<div />)
}