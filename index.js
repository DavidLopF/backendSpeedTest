
const express = require("express");

const app = express();
const { exec } = require("child_process");

// Home Route 
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Speed Test 
app.post("/test", async (req, res) => {
  try {
    await exec("fast --json", (err, stdout, stderr) => {
      if (err || stderr) return res.send(
        "Error while testing internet speed.");
      const result = JSON.parse(stdout);
      const response = `
                        <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Speed Test</title>
  <link rel="stylesheet" href="https://unpkg.com/nprogress@0.2.0/nprogress.css">
  <script src="https://unpkg.com/nprogress@0.2.0/nprogress.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
  <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css"
>
  <link rel="stylesheet" href="./index.css">
</head>

<body background="gray">
<center> 
<h1 style="color: green" class="is-size-1">Speed Test Result</h1>
<h2 style="margin-top: 1.2rem;">Ping : ${result.bufferBloat}</h2> 
<h2>Download Speed : ${result.downloadSpeed}</h2> 
<h2>Upload Speed : ${result.downloaded}</h2> 
</center>
</body>

</html>
                        
                        
                        `;
      res.send(response);
    });
  } catch (e) {
    res.send("Error while testing internet speed.");
  }
});

// Server 
app.listen(4000, () => {
  console.log("Server running on port - 4000");
}); 