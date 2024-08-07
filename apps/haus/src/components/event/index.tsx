import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

interface FeaturedPostProps {
event: {
    date: string;
    image: string;
    imageLabel: string;
    title: string;
    location: string;
    price: string;
  };
}

export default function Event(props: FeaturedPostProps) {
  const { event } = props;

  return (
    <Grid item md={3}>
      <CardActionArea sx={{ minWidth: 285 }} component="a" href="#">
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={event.image}
            alt={event.imageLabel}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={2.5} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                >
                  {event.date}
                </Typography>
              </Grid>
              <Grid item xs={9.5}>
                <Box>
                  <Typography variant="h6">
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {event.price}
                  </Typography>
                  <Typography variant="subtitle1">
                    {event.location}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}