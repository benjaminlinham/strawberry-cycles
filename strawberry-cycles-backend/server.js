require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5100; // Default port due to compatability error on Mac.

app.use(cors());
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Emmas eBikes backend is running 🚴‍♀️');
});

// Import routes here once they're set up
const authRoutes = require('./routes/auth');
// ... other routes can be imported similarly
app.use('/api/auth', authRoutes);


// Sync models and then start the server
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error syncing database: ", err);
  });
