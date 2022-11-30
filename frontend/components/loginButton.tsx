import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function LoginButton() {


    const router = useRouter();

    function loginSuccess(credentialResponse: CredentialResponse) {
        verifyLogin(credentialResponse.credential as string);
    }

    function loginFail() {

    }


    function verifyLogin(loginToken: string) {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL as string}/auth`, { 
            token: loginToken
        }).then((response) => {
            localStorage.setItem("loginToken", loginToken);
            router.push("/");
        }).catch((e) => {
            console.error(e);
        });
    }

    useEffect(() => {
        if (router.isReady) {
            if (localStorage.getItem("loginToken") != null) {
                verifyLogin(localStorage.getItem("loginToken") as string);
            }
        }
    }, [router.isReady])


    return (
    <GoogleOAuthProvider clientId="714726516267-hn2jg6dl88eset2hbt78p6l74s5smj2v.apps.googleusercontent.com">
        <GoogleLogin onSuccess={(credentialResponse) => {loginSuccess(credentialResponse)}} onError={() => {loginFail()}} />
    </GoogleOAuthProvider>
    );
}