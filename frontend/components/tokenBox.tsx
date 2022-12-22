import { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios";





export default function TokenBox({onSuccess, onFail}: {onSuccess?: Function, onFail?: (e?: AxiosError) => void}) {

    const [value, setValue] = useState("");
    const [inputCss, setInputCss] = useState("bg-white hover:bg-gray-100 border-slate-300 focus:bg-sky-50 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500")

    function sendMessage(e?: FormEvent<HTMLFormElement>): void {
        if (e != undefined){e.preventDefault()}
        const text = value;
        // linking token is 6 characters
        if (text.length == 6) { 
            // send request to the server with the linking token & login token (ties decided to call them both tokens so yeah)
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/link`, 
            {
                token: localStorage.getItem("loginToken"),
                linkingToken: text
            }).then((response) => {
                // call the success callback if the account was linked
                if (onSuccess) onSuccess();
                setInputCss("bg-white hover:bg-gray-100 border-slate-300 focus:bg-sky-50 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500")
                setValue("");
            }).catch((e: AxiosError) => {
                // call the fail callback if it didn't work
                console.error(e);
                if (onFail) onFail(e);
                setInputCss("bg-rose-50 hover:bg-rose-100 border-rose-500 focus:bg-rose-50 focus:outline-none focus:ring-1 focus:ring-rose-500")
                setValue("");

            });
        } else {
            // call fail if linking token is not 6 characters
            console.error("linking token must be 6 characters long!");
            if (onFail) onFail();
            setInputCss("bg-rose-50 hover:bg-rose-100 border-rose-500 focus:bg-rose-50 focus:outline-none focus:ring-1 focus:ring-rose-500")
            setValue("");
        }
    }

    return (
        <div className="grid static place-content-center">
            <form onSubmit={sendMessage}>
                <input className={`py-2 px-14 shadow-inner border rounded-lg border-slate-300 placeholder:text-sm ${inputCss}`} placeholder='Vul hier je Linking token in' value={value} onChange={(e) => {setValue(e.target.value);}} />    
            </form>
            <button className="float-left p-1 mt-1 mx-10 border rounded-lg bg-emerald-400 hover:bg-emerald-500 hover:shadow-inner text-white font-medium text-md" onClick={(e) => {sendMessage()}}>Link!</button>
        </div>
        )
}
