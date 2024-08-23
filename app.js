import 'dotenv/config.js';
import './initTables.js';

import path from "path";
import express from "express";
import logger from 'morgan';
import createError from "http-errors";
import cookieParser from "cookie-parser";
import session from 'express-session';
import expressMysqlSession from "express-mysql-session"

import indexRouter from "./routes/index.js";
// const  MySQLStore = expressMysqlSession(session)
//
// const options = {
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'root',
//   database: 'exam_db'
// };

// const sessionStore = new MySQLStore(options)

const app = express();

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   store: sessionStore
// }))


app.set('views', path.resolve('./views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve('./public')))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = err;

  res.status(err.status || 500)
  res.render('error')
})


export default app