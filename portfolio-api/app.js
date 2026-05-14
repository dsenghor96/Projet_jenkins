const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/connectdb');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config()
const app = express()

// CORS — autorise le frontend React
app.use(cors({
  origin: 'http://localhost:5173'
}))

connectDB();

app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.json({ message: 'API Portfolio opérationnelle ✅' });
});

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});