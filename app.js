const { name } = require("ejs");
const express = require("express");
const app = express();
const https = require("https");
const date = require(__dirname + "/views/date.js");
const mongoose = require("mongoose");

 mongoose.connect("mongodb+srv://ramanbaliyan:raman123@cluster0.e8tiqcf.mongodb.net/todoDB?retryWrites=true&w=majority");
// mongoose.connect("mongodb://127.0.0.1:27017/todoDB",)

// console.log(date()) ; // this gives date.js export and activate it by running using "()" function 

//*******task schema*********//
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
  }

});

//********schema model**********//
const todo_item = new mongoose.model("todo_item", todoSchema);

// *********local save menthod (so removed it)  ******//
//var todoTasks = []; 
//var tTask = [];// 

app.set('view engine', 'ejs'); // for ejs

app.use(express.urlencoded({ extended: true })); // use to catch input data from the webpage
app.use(express.static('public'));


var da = date.getdate();
app.get("/", function (req, res) {

  //var weeks= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  //var wkDay= weeks[todayDate.getDay()];// gives the no of the week but with weeks i will give name of day 

  console.log(date);

  const data_entry = async () => {
    try {
      const item1 = await new todo_item({
        task: "hello i iam 1st task",
      });

      const item2 = await new todo_item({
        task: "hello i iam 2nd task",
      });

      var todoTasks = await todo_item.find();

      if (await todoTasks.length === 0) {
        const upload = await todo_item.insertMany([item1, item2,]);
        console.log("data uploaded sucessfully");
        await res.redirect("/");
      } else {
        res.render("Mainlists", { weekDay: da, todo: todoTasks, taskName: "To-do list" });
        console.log(todoTasks);
        res.send();
      };

    } catch (error) {
      console.log("opps something went wrong in db insertion ")
    };
  };
  data_entry();
});

app.post("/", function (req, res) {
  const add_data = async () => {
    try {
      const item = await new todo_item({
        task: req.body.tasks,
      });
      // if else -- not to add empty array 
      if (item.task.length == 0) {
        console.log("item is not added" + item.task.length + "is null");
      } else {
        item.save();
        console.log("save sucessfully not null and length is " + item.task.length);
      };
      res.redirect("/");
    }
    catch {
      console.log("your task is not added ");
    }
  }
  add_data();

  /* if (req.body.butto === "Work list") {
     tTask.push(req.body.tasks);
     res.redirect("/work");
   } else {
     todoTasks.push(req.body.tasks);
     res.redirect("/");
   }*/
  // res.render("lists",{ task:task}) this will crash, as its already rendered before but without task:tasks 
});

app.post("/delete", async function (req, res) {

  const item_delete = async () => {
    try {
      const checkedItemId = req.body.checkbox;
      const remove = await todo_item.findByIdAndDelete(checkedItemId);
      console.log("item removed:" + checkedItemId);

    }
    catch {
      console.log("error in delete");
    }
  }
  item_delete();
  res.redirect("/");
});

/*app.get("/:listname", function (req, res) {
  const listname = req.params.listname;
  console.log(listname);
  const listschema = new mongoose.Schema({
    list: String,
    items: [todoSchema],
  });
  const item1 = new todo_item({
    task: "helask",
  });
  const item2 = new todo_item({
    task: "herogliu",
  });
  const itemm = [item1, item2];
  const Newlist = new mongoose.model("NewList", listschema);

  const aff = async () => {

    const find2 = await Newlist.findOne({ list: listname });
    const match = find2 == null;
    console.log(match);
    var newlistItem = await new Newlist({
      list: listname,
      items: itemm,
    });
    try {
      if (await match == false) {
        console.log(newlistItem.list);
        console.log("item already present in db");
        res.redirect("/"+ listname);
      } else {
        console.log("not presnt thus added ")

        newlistItem.save();
        res.render("Mainlists", { weekDay: da, todo: newlistItem.items, taskName: listname });
      };
    }
    catch {
      console.log('error');
    };

  };
  aff();

});

*/



app.get("/work", function (req, res) {
  var fa = date.getBday();
  const work_list = new mongoose.model("work_list", todoSchema);
  const data_entry = async () => {
    try {
      const item1 = await new work_list({
        task: "hello i iam work task",
      });

      var todoTasks = await work_list.find();

      if (await todoTasks.length === 0) {
        const upload = await work_list.insertMany([item1]);
        console.log("data uploaded sucessfully");
        await res.redirect("/work");
      } else {
        res.render("Mainlists", { weekDay: da, todo: todoTasks, taskName: "Work list" });
        console.log(todoTasks);
        res.send();
      };

    } catch (error) {
      console.log("opps something went wrong in db insertion ")
    };
  };
  data_entry();
});
 
app.post("/work", function (req, res) {

  res.redirect("/work");

});

app.get("/about", function (req, res) {
  res.render("about");
})
app.listen(5000, function () {
  console.log("server is running on 5000");
});
