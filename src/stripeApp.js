import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert,
    Button
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const API_URL = "http://localhost:3000"

export default function CheckoutForm() {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentName, setPaymentName] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      window
        .fetch("/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setClientSecret(data.clientSecret);
        });
    }, []);
    const cardStyle = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };
    const handleChange = async (event) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
    };
    const handleSubmit = async ev => {
      ev.preventDefault();
      setProcessing(true);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    };
    return (
      <View style={styles.container}>
          <TextInput
                placeholder="Payment Name"
                onChange={value => setPaymentName(value.nativeEvent.text)}
                style={styles.input}
                />
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: "4242 4242 4242 4242"
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onChange={handleChange} />
        <Button style={styles.button} onPress={handleSubmit} title="Save Payment Method"
        disabled={false/*processing || disabled || succeeded*/}/>
        
      </View>
    );
  }

  /*
const StripeApp = (props) => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const {confirmPayment, loading} = useConfirmPayment();
    
    const fetchPaymentIntentClientSecret = async () => {
      console.log("..entered function, awaiting response");
        const response = await fetch(`${API_URL}/
        create-payment-intent`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("..recieved response, waiting for client secret");
        
        const {clientSecret,error} = await response.json();
        return {clientSecret,error};
    };

    const handlePayPress = async () => {
        if(!cardDetails?.complete || !email){
            Alert.alert("Please enter complete card details and email");
            console.log("Incomplete details");
            return;
        }
        const billingDetails = {
            email:email
        }
        try{
            console.log("\nFethcing payment intent client secret...");
            const {clientSecret,error} = await
            fetchPaymentIntentClientSecret();
            

            if(error){
                console.log("unable to process payment");
            }else{
                const {paymentIntent,error} = await confirmPayment
                (clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });
                if(error){
                    alert(`Error: ${error.message}`);
                }else if(paymentIntent){
                    alert("Payment successful");
                    console.log("Successful payment made");
                }
            }
        }catch(e){

        }
    }
    
    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                keyboardType="email-address"
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}
                />
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: "4242 4242 4242 4242"
                }}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails);
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
            />
            <Button onPress={handlePayPress} title="Tip"
                disabled={loading}/>
        </View>
    )
}
export default StripeApp;
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: "#d1d1d1",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10
    },
    card:{
        backgroundColor: "#d1d1d1",

    },
    cardContainer:{
        height: 50,
        marginVertical: 30
    },
    button:{
      backgroundColor: "#5469d4",
      fontFamily: "Arial, sans serif",
      color: "white",
      borderRadius: 4,
      padding: 14,
      fontSize: 16,
      fontWeight: "600",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,
    }
});