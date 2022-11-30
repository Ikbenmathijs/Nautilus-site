import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);


async function verifyUser(token: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID as string
        });
        const payload = ticket.getPayload();

        return {authorised: true, payload: payload};
    } catch(e) {
        return {authorised: false, payload: undefined}
    }
}



export {verifyUser};