import express from "express";
import Stripe from "stripe";
import mysql from 'mysql';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51ISAtNLgA5We1KpPsp8OWCvcgyOREAskwBnsfs718TzfdHXp1KykJRbDYvDrEIC6vRAyMM0v6YOqiskifyy7SyNm00rTnS6qBk";
const SECRET_KEY = "sk_test_51ISAtNLgA5We1KpP0uWEYaKazviBLkCS9rIGpfxBomqqE5psehAEVsJgXjWeubdDtexE52jtUTjpy4SJrMSLw1bS00hf4Z3Tpm";
const stripe = Stripe(SECRET_KEY, {apiVersion:"2020-08-27"})

const connection = mysql.createPool({
    host     : '185.27.134.10/',
    user     : 'epiz_29993811',
    password : 'HMWtSk9rFgZDxPo',
    database : 'epiz_29993811_data'
  });

app.use(express.static("public"));
app.use(express.json());

const router = express.Router();
app.use("/",router);

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1099;
  };

  app.get('/users', function (req, res) {
    // Connecting to the database.
    //connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    //connection.query('SELECT * FROM users', function (error, results, fields) {
      // If some error occurs, we throw an error.
      //if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send("yo")
    //});
  //});
});

router.post("/create-payment-intent", async (req, res) => {
    console.log("posting");
    try{
        const paymentIntent = await stripe.paymentIntents.create
        ({
            amount: calculateOrderAmount(),
            currency: "usd",
            payment_method_types: ["card"],
        });
        
        const clientSecret = paymentIntent.client_secret;
        res.status(201).json({
            clientSecret: clientSecret,
        });

    }catch(e){
        console.log(e.message);
        res.json({ error: e.message});
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

