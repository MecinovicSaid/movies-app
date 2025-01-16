import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://imdb-top-100-movies.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': '323d609bbemshf082f053e8a8a8fp103e99jsn5fa94e58573d',
          'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setMovies(response.data);  // This should be an array of movies
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const handleLearnMore = (movieId) => {
    // Handle the 'Learn More' button click (could be a redirect or popup)
    alert(`Learn more about movie ID: ${movieId}`);
  };

  return (
    <Box className="container">
      <Typography variant="h4" gutterBottom>
        Most Popular Movies
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                image={movie.image}  // Adjust based on the actual API response for image
                alt={movie.name}     // Adjust based on the actual API response for the title
                sx={{
                  height: 180,           // Adjust image size
                  objectFit: 'cover',    // Ensures the image covers the area
                  width: '100%',         // Ensures the image takes full width of the container
                }}
              />
              <CardContent sx={{ padding: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                  {movie.name}  {/* Assuming the title is stored in 'name' */}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ marginTop: 2 }} 
                  onClick={() => handleLearnMore(movie.id)}  
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
