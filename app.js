//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "🌆 Welcome to the beating heart of Metropolis! The Daily Bugle Blog, your digital portal to the city's untold stories, invites you on a thrilling journey through the secrets that define our urban landscape. Unmasking the metropolis one post at a time, we bring you exclusive insights, gripping narratives, and diverse perspectives. Join our community of engaged readers and become a part of the conversation shaping the city's destiny. Explore the web of truth with the Daily Bugle Blog – where every headline reveals more than meets the eye. 🕵️‍♂️🔍 #DailyBugleBlog #MetropolisUnmasked";
const aboutContent = "🏙️ Discover the heartbeat of Metropolis with the Daily Bugle Blog – your digital haven for unmasking the city's untold stories. Dive into gripping narratives, exclusive insights, and diverse perspectives that go beyond the headlines. As more than just a news source, we're a community of engaged citizens, unraveling the mysteries that shape our urban landscape. Whether you're a seasoned resident or a newcomer to the streets, join us in exploring the hidden truths beneath the skyscrapers and shadows. Daily Bugle Blog – where every post is a revelation in the ongoing saga of our vibrant city. #DailyBugleBlog #MetropolisUnmasked 🕵️‍♂️🔍";
const contactContent = "Have a scoop to share or a burning question? The Daily Bugle Blog welcomes your input! Reach out to our dedicated team at contact@dailybugleblog.com to submit tips, share your perspectives, or inquire about partnerships. Follow us on social media for real-time updates: @DailyBugleBlog. Your voice matters, and we're here to listen. Join the conversation, unmask the metropolis, and be a part of the dynamic community at Daily Bugle Blog – where every message is a thread in the intricate web of city storytelling. 🌐 #ContactUs #DailyBugleBlog 🕵️‍♂️📰";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];


app.get("/", (req, res) => {
  res.render("home.ejs", {
    home: homeStartingContent,
    posts: posts
  });
  
})

app.get("/about", (req, res) => {
  res.render("about.ejs", {about: aboutContent});
})
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {contact: contactContent});
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
})

app.post("/compose", (req, res) =>{
const post ={
  title: req.body["postTitle"],
  content: req.body["post"]
};

posts.push(post);
res.redirect("/");
})

app.get("/posts/:postName", (req, res) => {
  const requiredTitle = _.lowerCase(req.params.postName) ;
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle ===  requiredTitle ){
      
      res.render("post.ejs", {
        title: _.startCase(storedTitle),
        content: post.content
      });
  }
  }
)
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
