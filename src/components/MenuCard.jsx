import React,{ useContext } from 'react';
import { Button, Card, CardContent,
  Typography, CardActions,Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext } from '../context/CartContext';

function MenuCard({ id,name, desc, price }) {
  const cart = useContext(CartContext);
  const itemQuantity = cart.getProductQuantity(id);
  return (
    <Card sx={{ maxWidth: 345, mb: 3 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Typography variant="h6">
          £{price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        {itemQuantity > 0 ? (
          <>
            <Box display="flex" alignItems="center" gap={2}>
            <Button
                  variant="contained"
                  color="primary"
                  sx={{borderRadius: "2rem"}}
                  onClick={() => cart.addOneToCart(id)}
                >
                  +
                </Button>
                <Typography sx={{fontSize: "1rem",fontStyle:'bold'}}>{itemQuantity}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => cart.removeOneFromCart(id)}
                  sx={{borderRadius: "2rem"}}
                >
                  -
                </Button>
                <Button
              variant="contained"
              color="error"
              onClick={() => cart.deleteFromCart(id)}
            >
              <DeleteIcon />
            </Button>
            </Box>

          </>
        ) : (
          <Button 
          size="small" 
          variant="contained" 
          color='warning'
          sx={{ 
            padding: "0.6rem 3rem", 
            borderRadius: "2rem", 
            fontSize: "1rem", 
            letterSpacing: "0.2rem", 
            "&:hover": { 
              backgroundColor: "#fc4958" 
            }}}
          startIcon={<ShoppingCartIcon />}
          onClick={() => cart.addOneToCart(id)}
        >
          Add to Cart
        </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default MenuCard;
