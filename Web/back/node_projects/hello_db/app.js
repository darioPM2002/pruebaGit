"use strict";

// Importing modules
import express from "express";

import mysql from "mysql2/promise";

const app = express();
const port = 3001;


app.use(express.json());

// Function to connect to the MySQL database

// The async keyword is used to define an asynchronous function. An asynchronous function is a function that operates asynchronously, using an implicit Promise to return its result.
// A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

async function connectToDB() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cards_db",
  });
}


app.get("/", async (req, res)=>{
    res.status(200).send("ADAD")
  })
  
  app.get("/api/cards", async (request, response) => {
    let connection = null;
  
    try {
  
      // The await keyword is used to wait for a Promise. It can only be used inside an async function.
      // The await expression causes async function execution to pause until a Promise is settled (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. When resumed, the value of the await expression is that of the fulfilled Promise.
  
      connection = await connectToDB();
      // The execute method is used to execute a SQL query. It returns a Promise that resolves with an array containing the results of the query (results) and an array containing the metadata of the results (fields).
      const [results, fields] = await connection.execute("select * from card");
  
      console.log(`${results.length} rows returned`);
      console.log(results);
      response.status(200).json(results);
    }
    catch (error) {
      response.status(500);
      response.json(error);
      console.log(error);
    }
    finally {
      // The finally statement lets you execute code, after try and catch, regardless of the result. In this case, it closes the connection to the database.
      // Closing the connection is important to avoid memory leaks and to free up resources.
      if (connection !== null) {
        connection.end();
        console.log("Connection closed succesfully!");
      }
    }
  });
  

  app.get("/api/cards/:id", async (request, response) => {
    let connection = null;
  
    try {
      connection = await connectToDB();
  
      // The ? character is used as a placeholder for the values that will be passed to the query. This is a security measure to avoid SQL injection attacks.
      const [results, fields] = await connection.execute(
        "select * from card where card_id = ?",
        [request.params.id]
      );
  
      console.log(`${results.length} rows returned`);
      console.log(results);
      if(results.length > 0)
      {
        response.status(200).json(results[0]);
      }
      else
      {
        response.status(404).send("No cards found")
      }
    }
    catch (error) {
      response.status(500);
      response.json(error);
      console.log(error);
    }
    finally {
      if (connection !== null) {
        connection.end();
        console.log("Connection closed succesfully!");
      }
    }
  });
  

app.listen(port,()=>{
    console.log('example app listenign '+port)
})