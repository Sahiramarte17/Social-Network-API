const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
