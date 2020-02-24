const express = require("express");
const Comment = require("../model/comment")

const router = express.Router();


//comment(data) och ska visa den till comment router
//create
//skapa comment med post router och en ejs input fält (för torsdag)


router.get("/createcomment", (req, res) => {

  res.render("comment");

})


router.post("/createcomment", async (req, res) => {

  //req.body.allanameproperties
  const comment = new Comment({
    task: req.body.task,
    timescale: req.body.timescale,
    when: req.body.when
  })
  await comment.save((error, success) => {
    if (error) {
      console.log(error);
      res.send(error._message)
    }
    else
      console.log(success);
    res.redirect("/comment")
  });


  //new Comment({text:"testdata", author:"authorname"}).save();
})


router.get("/comment", async (req, res) => {
  const comments = await Comment.find()
  // { comment : []}
  //comments:comments
  res.render("comment", { comments });

})

//test
router.get("/about", (req, res) => {

  res.send("This todo app was created by Helena");

})
//test

//params skapar dynamiskt id vad än items får för id tilldelat skriv "it works" ut. 
router.get("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  await Comment.deleteOne({ _id: req.params.id });
  //  res.send("it works");
  res.redirect("/comment");
})

router.get("/update/:id", async (req, res) => {

  //vill hämta bara en data från databas 
  const response = await Comment.findById({ _id: req.params.id })
  console.log(response);
  //sen skicka den till edit sidan 

  res.render("edit", { response });
})

router.post("/update/:id", async (req, res) => {

  //använd update one metoden för att kunna redigera comment
  await Comment.updateOne({ _id: req.body._id },
    { $set: { task: req.body.task, timescale: req.body.timescale, when: req.body.when } });

  console.log(req.body);
  res.redirect("/comment");
})

module.exports = router;
/* //create
new Modelnamn(  {ettobject}).save()
// find/read
Modelnamn.find()
 */
