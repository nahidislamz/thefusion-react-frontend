import React from 'react';
import MenuCard from '../components/MenuCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function Menus({ menuItems }) {
    return (
        <section id='menus'>
            <h1 className="yellow">Menus</h1>
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
