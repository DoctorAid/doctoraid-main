const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.get('/', (req, res) => res.send('DoctorAid API Running'));

app.listen(PORT, () => console.log(`Serkkkrunning on http://localhost:${PORT}`));
