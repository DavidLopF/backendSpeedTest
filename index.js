
const express = require("express"); 
  
const app = express(); 
const { exec } = require("child_process"); 
  
// Home Route 
app.get("/", (req, res) => { 
  res.sendFile(__dirname + "/views/index.html"); 
}); 
  
// Speed Test 
app.post("/test", async (req, res) => { 
  try{
    await exec("fast --json", (err, stdout, stderr) => { 
        if (err || stderr) return res.send( 
          "Error while testing internet speed."); 
        const result = JSON.parse(stdout); 
        const response = `<center> 
                        <h2>Ping : ${result.bufferBloat}</h2> 
                        <h2>Download Speed : ${result.downloadSpeed}</h2> 
                        <h2>Upload Speed : ${result.downloaded}</h2> 
                        </center>`; 
        res.send(response); 
      }); 
  }catch(e){
    res.send("Error while testing internet speed.");
  }
}); 
  
// Server 
app.listen(4000, () => { 
  console.log("Server running on port - 4000"); 
}); 