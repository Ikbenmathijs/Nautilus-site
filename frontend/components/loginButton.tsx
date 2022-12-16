import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import axios, { AxiosError } from "axios";
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function LoginButton({onLoginFail}: {onLoginFail?: Function}) {


    const router = useRouter();

    function loginSuccess(credentialResponse: CredentialResponse) {
        verifyLogin(credentialResponse.credential as string, true);
    }

    function loginFail(e?: AxiosError) {
        if (onLoginFail) onLoginFail(e);
    }


    function verifyLogin(loginToken: string, callFail: boolean) {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL as string}/auth`, { 
            token: loginToken
        }).then((response) => {
            localStorage.setItem("loginToken", loginToken);
            router.push("/");
        }).catch((e: AxiosError) => {
            console.error(e);
            if (callFail) loginFail(e);
        });
    }

    useEffect(() => {
        if (router.isReady) {
            if (localStorage.getItem("loginToken") != null) {
                verifyLogin(localStorage.getItem("loginToken") as string, false);
            }
        }
    }, [router.isReady])


    return (
    <GoogleOAuthProvider clientId="714726516267-hn2jg6dl88eset2hbt78p6l74s5smj2v.apps.googleusercontent.com">
        <GoogleLogin onSuccess={(credentialResponse) => {loginSuccess(credentialResponse)}} onError={() => {loginFail()}} />
    </GoogleOAuthProvider>
    );
}