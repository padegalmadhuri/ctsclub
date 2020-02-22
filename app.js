const express =require('express');
const path=require('path');
const mongoose=require('mongoose')
const app=express();
const bodyParser=require('body-parser');
var session=require('express-session')

var MongoStore=require('connect-mongo')(session);
//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ctsportal',{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){});


app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  // store:new MongoStore({
  //   mongooseConnection:db
  // })
}));
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set up for html pages using view  engine
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

//Body parser
app.use(express.urlencoded({extended:false}));


//Routes
app.use('/',express.static(path.join(__dirname, '/public')));
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));




//listening to port 3000
const PORT=process.env.PORT||3000;
app.listen(PORT,console.log(`server is running at ${PORT}`))
