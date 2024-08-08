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
  var currentdate = new Date();
  var datetime = currentdate.getFullYear() + "-" +
                "0"+ (currentdate.getMonth()+1) + "-" +
               "0" + currentdate.getDate() + "T" 
                + currentdate.getHours() + ":" + currentdate.getMinutes()
  console.log(datetime)

  res.render("index");
  

  })

  
  app.post('/',async(req,res,next) => {
  
    const lattitude = req.body.longitude
    const longitude = req.body.lattitude
   
    if (!lattitude || !longitude) {
      return res.render('index', { error: 'Enter lattitude and longittude' });
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

  app.post('/ipaddress',async(req,res,next) => {
  
    const ipaddress = req.body.ipaddress
   
    
    if (!ipaddress) {
      return res.render('index', { error: 'Enter an ip address' });
    }
  
    try {
      const response = await axios.get('https://api.ip2location.io/', {
        params: {
          key: 'C1DCFBD53D19C1DD0C79185899A84057',
          ip: ipaddress
        },
       
      });
  
      const lat = response.data.longitude;
      const long = response.data.latitude;
      const city = response.data.city_name;
      const country  = response.data.country_name;
      console.log(lat,long,city);
      
      try {
        const response = await axios.get('https://api.openuv.io/api/v1/uv', {
          params: {
            lat: lat,
            lng: long
          },
          headers: {
            'x-access-token': 'openuv-es06rlzidh358-io',
          }
        });
    
        const uvFactorTwo = response.data.result.uv;
        
        console.log(uvFactorTwo);
        res.render('index', { uvFactorTwo,city,country});
      } catch (error) {
        console.error(error);
        res.render('index', { error: 'Error fetching data. Please try again later.' });
      }
    
    } catch (error) {
      console.error(error);
      res.render('index', { error: 'Error fetching  data. Please try again' });
    }
  });




// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });