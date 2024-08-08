// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.


const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// 3. Use the public folder for static files.
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Use middleware to parse JSON bodies
app.use(express.json());

app.get("/", async (req, res)  => {
 

  res.render("index");


  })

  
  app.post('/',async(req,res,next) => {
  
    const lattitude = req.body.longitude
    const longitude = req.body.lattitude
  
    if (!lattitude || !longitude) {
      return res.render('index', { error: 'Both latitude and longitude are required.' });
    }
  
    try {
      const response = await axios.get('https://api.openuv.io/api/v1/uv', {
        params: {
          lat: lattitude,
          lng: longitude
        },
        headers: {
          'x-access-token': 'openuv-es06rlzidh358-io',
        }
      });
  
      const uvFactor = response.data.result.uv;
      console.log(uvFactor);
      res.render('index', { uvFactor, lattitude, longitude });
    } catch (error) {
      console.error(error);
      res.render('index', { error: 'Error fetching UV data. Please try again later.' });
    }
  });

 




// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });