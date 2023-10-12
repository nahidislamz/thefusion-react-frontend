import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Button from '@mui/material/Button';
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext";
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";
import logo from "../assets/logo.svg";
import Hero from "../components/Hero";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import EmptyCart from "../components/EmptyCart";
export default function Header() {
    const cart = useContext(CartContext);
    const [navbarState, setNavbarState] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const productsCount = cart.items.reduce((sum, name) => sum + name.quantity, 0);
    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About Us" },
        { href: "#menus", label: "Menus" },
        { href: "#bookings", label: "Bookings" },
        { href: "#contact", label: "Contact" },
    ];

    const [open, setOpen] = useState(false);
    const _handleClose = () => setOpen(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <AppBar position="fixed" color="default">
                <Toolbar>
                    <img src={logo} alt="Logo" style={{ marginRight: "auto", cursor: "pointer" }} />
                    <Box mr={2}>  {/* Added Box to manage spacing */}
                        <IconButton color="inherit"
                            onClick={handleShow}
                        >
                            <Badge badgeContent={productsCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <IconButton edge="end" color="inherit" onClick={() => setNavbarState(!navbarState)}>
                        {navbarState ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Dialog
                open={show}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" onClose={handleClose}>
                    Shopping Cart
                </DialogTitle>
                <DialogContent>
                    {productsCount > 0 ? (
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentItem, idx) => (
                                <Cart
                                    key={idx}
                                    id={currentItem.id}
                                    name = {currentItem.name}
                                    quantity={currentItem.quantity}
                                    itemTotal={currentItem.total}
                                />
                            ))}
                            <h4 style={{ textAlign: 'right' }}>Total: ${cart.getTotalCost().toFixed(2)}</h4>

                        </>

                    ) : (
                        <EmptyCart handleClose={handleClose}/>
                    )}
                </DialogContent>
                {productsCount > 0 && (
                    <DialogActions>
                        <Box width="100%" display="flex" justifyContent="center">
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
                                    }
                                }}
                                onClick={handleClickOpen}
                            >
                                Place Order
                            </Button>
                            <Dialog open={open} onClose={_handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="alert-dialog-title"
                                sx={{ textAlign: "center" }} color="warning.main" 
                                onClose={handleClose}>
                                    Checkouts
                                </DialogTitle>
                                <DialogContent>
                                <Box width="100%"justifyContent="center">
                                    
                                    <Checkout/>
                                </Box>
                                </DialogContent>
                                
                            </Dialog>
                        </Box>
                    </DialogActions>
                )}
            </Dialog>
            <Drawer anchor="right" open={navbarState} onClose={() => setNavbarState(false)}>
                <List style={{ width: 250 }}>
                    {navLinks.map((link) => (
                        <ListItem key={link.label} onClick={() => setNavbarState(false)}>
                            <a href={link.href} style={{ textDecoration: "none", color: "#f9c74f", width: "100%" }}>
                                {link.label}
                            </a>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Hero />
        </>
    );
}
