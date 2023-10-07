import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Badge,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext } from '../context/CartContext';

function Cart(props) {
  const cart = React.useContext(CartContext);
  const { id, quantity, menus } = props;

  const getProductData = (id, menus) => {
    return menus.find(item => item.id === id);
  }

  const productData = getProductData(id, menus);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
                <Badge badgeContent={'x'+quantity} color="warning">
                <Typography variant="h5" gutterBottom>
                  {productData.name}
                </Typography>
                </Badge>
            </TableCell>
            <TableCell align="right">
              <Typography variant='h6'>
                £{ (quantity * productData.price).toFixed(2) }
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton 
                color='error'
                onClick={() => cart.deleteFromCart(id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Cart;
