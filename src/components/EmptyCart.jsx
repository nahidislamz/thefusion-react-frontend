import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function EmptyCart(props) {
    return (
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="70vh"
        >
          <ShoppingCartIcon style={{ fontSize: 100, color: '#ccc' }} />
          <Typography variant="h5" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            It looks like you haven't added anything to your cart yet.
          </Typography>
          {/* Place your empty cart image here */}
          <Button variant="contained" color="warning" href="#menus" onClick={props.handleClose}>
            Start Ordering
          </Button>
        </Box>
      </Container>
    );
  }
  