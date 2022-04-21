'use strict';

const env = require('dotenv');
const cors = require('cors');
env.config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const CredentialRouter = require('./routes/CredentialRoute');
const NewsRouter = require('./routes/NewsRoute');
const CommentRouter = require('./routes/CommentRoute');
const EmergencyRouter = require('./routes/EmergencyRoute');
const ReportRouter = require('./routes/ReportRoute');

//configure express dependencies
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

//register routes
app.use('/v1/credential', CredentialRouter);
app.use('/v1/news', NewsRouter);
app.use('/v1/comment', CommentRouter);
app.use('/v1/emergency', EmergencyRouter);
app.use('/v1/report', ReportRouter);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})

module.exports = app;