const express = require('express');
const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatRoutes = require('./routes/seats.routes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatRoutes);


app.use((req, res) => {
    res.status(404).send({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});