// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const config = {
  headers: { 'x-access-token': 'openuv-es06rlzidh358-io' },
};

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// 3. Use the public folder for static files.
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get("/", async (req, res)  => {
   

   
  await axios.get('https://api.openuv.io/api/v1/uv',{ params: {
      lat:41.02423669878033,
      lng:21.323862075805668
    }, headers : {
       'x-access-token': 'openuv-es06rlzidh358-io',
    }
  }).then(function (response) {
  const uvFactor = response.data.result.uv
  console.log(uvFactor)    
  res.render("index",{uvFactor:uvFactor});
  })
    
  });




// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });