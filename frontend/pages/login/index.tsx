import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, CredentialResponse } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


export default function googleLogin() {

    function loginSuccess(credentialResponse: CredentialResponse) {
            
    }

    function loginFail() {

    }


    return (
    <GoogleOAuthProvider clientId="714726516267-hn2jg6dl88eset2hbt78p6l74s5smj2v.apps.googleusercontent.com">
        <GoogleLogin onSuccess={(credentialResponse) => {loginSuccess(credentialResponse)}} onError={() => {loginFail()}} />
    </GoogleOAuthProvider>
    );
}



/*
<GoogleOAuthProvider clientId="714726516267-hn2jg6dl88eset2hbt78p6l74s5smj2v.apps.googleusercontent.com"><GoogleLogin
    onSuccess={credentialResponse => {
      console.log(jwt_decode(credentialResponse as string));
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  /></GoogleOAuthProvider>
  */