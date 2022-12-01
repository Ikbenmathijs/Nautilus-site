import express from "express";
import dotenv from "dotenv";
import mongodb, { Int32, MongoClient } from "mongodb";
import app from "./server";
import profilesDAO from "./dao/profilesDAO";
import usersDAO from "./dao/usersDAO";

dotenv.config();

let uri: string = process.env.DB_URI as string;

const port = process.env.PORT || 5000;

const client: MongoClient = new MongoClient(
    uri, 
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    });
client.connect().catch((e) => {
    console.error(e.stack);
    process.exit(1);
}).then(async client => {
    app.listen(port, () => {
        profilesDAO.injectDB(client);
        usersDAO.injectDB(client);
        console.log(`Listening on port ${port}`);
    });
});