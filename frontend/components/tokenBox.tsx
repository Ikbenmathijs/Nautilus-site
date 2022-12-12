import {KeyboardEvent, useState} from "react";
import axios, { AxiosError } from "axios";





export default function TokenBox({onSuccess, onFail}: {onSuccess?: Function, onFail?: (e?: AxiosError) => void}) {

    const [value, setValue] = useState("");

    function sendMessage(e: KeyboardEvent<HTMLTextAreaElement>): void {
        if (e.key == "Enter") {
            const text = (e.target as HTMLInputElement).value;
            // linking token is 6 characters
            if (text.length == 6) {
                // send request to the server with the linking token & login token (ties decided to call them both tokens so yeah)
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/link`, 
                {
                    token: localStorage.getItem("loginToken"),
                    linkingToken: (e.target as HTMLInputElement).value
                }).then((response) => {
                    // call the success callback if the account was linked
                    if (onSuccess) onSuccess();
                    setValue("");
                }).catch((e: AxiosError) => {
                    // call the fail callback if it didn't work
                    console.error(e);
                    if (onFail) onFail(e);
                    setValue("");
                });
            } else {
                // call fail if linking token is not 6 characters
                console.error("linking token must be 6 characters long!");
                if (onFail) onFail();
                setValue("");
            }
        }
    }

    return (
        <textarea className="resize-none bg-white border rounded-lg border-slate-300 focus:bg-sky-50 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:ring-red-500" onKeyDown={sendMessage} value={value} onChange={(e) => {setValue(e.target.value);}} />
        )
}