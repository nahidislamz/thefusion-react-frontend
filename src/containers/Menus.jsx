import React from 'react';
import MenuCard from '../components/MenuCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function Menus({ menuItems }) {
    return (
        <section id='menus'>
        <Typography sx={{ textAlign: "center" }} variant="h3" color="warning.main">
          Menus
        </Typography>
            <Container>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {menuItems.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id} container justifyContent="center">
                            <MenuCard
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                desc={item.desc}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );
}

export default Menus;
