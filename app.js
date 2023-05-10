//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network).[1] Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development";
const aboutContent = "Web development refers to the creating, building, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management. It is the creation of an application that works over the internet i.e. websites.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res)
{
  res.render("home",{StartingContent:homeStartingContent,
  posts:posts
});
  
});

app.get("/about",function(req,res)
{
  res.render("about",{StartingAbout:aboutContent});
});

app.get("/contact",function(req,res)
{
  res.render("contact",{StartingContact:contactContent});
});

app.get("/compose",function(req,res)
{
  res.render("compose");
});

app.post("/compose",function(req,res)
{
  const post={
    title:req.body.posttitle,
    content:req.body.postbody
  };
  posts.push(post);
  res.redirect("/");
 
});
//first step to dynamic website
app.get("/posts/:postname",function(req,res)
{
  const requested= _.lowerCase(req.params.postname);

  posts.forEach(function(post){
    var stored=_.lowerCase(post.title);
    if(stored===requested){
      res.render("post", {
        title:post.title,
        content:post.content
      });

    }

  });
  

});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
