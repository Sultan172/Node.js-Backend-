const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

module.exports = app;