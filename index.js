const express=require("express");
const webpush=require("web-push");
const bodyparser = require("body-parser");
const path= require("path");

const app= express();

app.use(express.static(path.join(__dirname,"client")));
app.use(bodyparser.json());

const publicVapidKey="BFgx3hzhfEhzLcJ8jfjmC8Ud-orWbDYXGL-jfbVXKwif1G5jAMGhaKUzVN15bAsBoKfe7cqjhhwwT0aKUXhVJR4";
const privateVapidKey = "Hr8R-RKIpy_c3nhLKEwzymkzRDM7SkKkhGThJg5H9ws";

webpush.setVapidDetails('mailto:abc@abc.com',publicVapidKey,privateVapidKey);

app.post('/subscribe',(req,res) => {
    const subscription = req.body;

    res.status(201).json({});

    const payload= JSON.stringify({title:'push test'});

    webpush.sendNotification(subscription,payload).catch(err => console.error(err));

    
}
);

const port=5000;
app.listen(port,() => console.log('Server started '));