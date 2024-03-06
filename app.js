const express=require("express");
const app=express();
const sound = require("sound-play");
const { exec } = require('child_process');

const port = process.env.PORT || 3000; // Define the port to listen on (default is 3000)
app.listen(port, () => {
    console.log("Listening on port " + port);
});
allowed = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get("/:id",async function(req,res){
var command = 'aplay';
    try {
        if(allowed.includes(req.params.id)){
            res.redirect("/");
            // await sound.play(req.params.id+".wav");
            command += " "+req.params.id+".wav";
            // Execute the command
            exec(command, (error, stdout, stderr) => {
                if (error) {
                console.error(`Error executing the command: ${error.message}`);
                return;
                }
                if (stderr) {
                console.error(`Command stderr: ${stderr}`);
                return;
                }
                console.log(`Command stdout: ${stdout}`);
            });
        }else{
            res.sendStatus(404);
        }
      } catch (error) {
        console.error(error);
    }
    // console.log(req.params.id);
});

app.get("*",function(req,res){
    res.sendStatus(404);
})
