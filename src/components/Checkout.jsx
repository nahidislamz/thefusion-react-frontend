import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Box, Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function Checkout() {
  const uid = uuidv4();
  const cart = useContext(CartContext);
  const totalAmount = cart.getTotalCost().toFixed(2);
  const penceTotalAmount = parseFloat(totalAmount) * 100;
  const [orderCompleted, setOrderCompleted] = useState(false);

  const orderItems = cart.items.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.total
  }));
  console.log(orderItems)

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',  // Address Line 1
    address2: '',  // Address Line 2 (optional)
    townCity: '',  // Town/City
    postcode: '',  // Postcode

  });
  const [customerNotes, setCustomerNotes] = useState('');
  const [orderType, setOrderType] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get PaymentMethod data
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    const { token } = await stripe.createToken(cardElement);
    console.log(token.id)
    if (error) {
      setPaymentError(error.message);
      return;
    }

    //const { userId, items, totalAmount, token, customer, orderType, customerNotes } = req.body;
    // You would send paymentMethod.id to your server here
    // along with other relevant data (e.g., price, order details, etc.)
    try {
      const response = await axios.post('http://localhost:4000/order/create', {
        userId: uid,
        items: orderItems /* Your cart items here */,
        totalAmount: penceTotalAmount/* Your total amount here */,
        token: token.id,
        customer,
        orderType,
        customerNotes,
        // Add other relevant data here
      });

      // Check if the order was successfully created
      // Check if the order was successfully created
      if (response.data === 'Order placed and payment successful') {
        setPaymentCompleted(true);
        setPaymentError(null);
        setOrderCompleted(true); // Setting order completion state to true

        // Clear the cart from local storage
        localStorage.removeItem('cart'); // Assuming 'cart' is the key you used
      }

    } catch (error) {
      setPaymentError(error.message);
    }
  };


  return (
    <Container sx={{ margin: "10px" }}>
      {orderCompleted ? (
        <Box>
          <p style={{ color: 'green' }}>Thank you for your order!</p>
          {/* Place your order successful icon here */}
        </Box>
      ) : (
        <Box width="100%">
          <TextField
            sx={{ marginBottom: "6px" }}
            label="Name"
            variant="outlined"
            name="name"
            value={customer.name}
            onChange={handleChange}
          />
          <br />
          <TextField
            sx={{ marginBottom: "6px" }}
            label="Email"
            variant="outlined"
            name="email"
            value={customer.email}
            onChange={handleChange}
          />
          <br />
          <TextField
            sx={{ marginBottom: "6px" }}
            label="Phone"
            variant="outlined"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
          />
          <br />
          <TextField
            sx={{ marginBottom: "6px" }}
            label="Address Line 1"
            variant="outlined"
            name="address1"
            value={customer.address1}
            onChange={handleChange}
          />
          <br />
          <TextField
            sx={{ marginBottom: "6px" }}
            label="Address Line 2"
            variant="outlined"
            name="address2"
            value={customer.address2}
            onChange={handleChange}
          />
          <br />
          <TextField
            sx={{ marginBottom: "6px" }}
            label="Town/City"
            variant="outlined"
            name="townCity"
            value={customer.townCity}
            onChange={handleChange}
          />
          <br />
          <TextField
            sx={{ marginBottom: "6px" }}
            label="Postcode"
            variant="outlined"
            name="postcode"
            value={customer.postcode}
            onChange={handleChange}
          />
          <br />
          <FormControl sx={{ marginBottom: "6px" }} variant="outlined" fullWidth>
            <InputLabel id="order-type-label">Order Type</InputLabel>
            <Select
              labelId="order-type-label"
              id="order-type"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              label="Order Type"
            >
              <MenuItem value="takeaway">Takeaway</MenuItem>
              <MenuItem value="collection">Collection</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            sx={{ marginBottom: "4px" }}
            label="Customer Notes"
            variant="outlined"
            multiline
            rows={4}
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
          />
          <Box width="100%" sx={{ margin: "10px" }}>
            <CardElement options={{ hidePostalCode: true }} />
          </Box>
          <Button
            sx={{ marginBottom: "4px" }}
            variant="contained"
            color="primary"
            onClick={handlePayment}
          >
            Pay and Place Order
          </Button>

          {paymentError && (
            <p style={{ color: 'red' }}>{paymentError}</p>
          )}

          {paymentCompleted && (
            <p style={{ color: 'green' }}>Payment successful and order placed!</p>
          )}
        </Box>
      )}

    </Container>
  );
}
