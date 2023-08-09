
const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require('mongoose');
const date=require(__dirname+"/date.js");
const _ =require("lodash");


//console.log(date());

const app=express();

 app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public")); 

mongoose.connect("mongodb://127.0.0.1:27017/Todolistdb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// const nitems=["buy food","cook food","eat food"];
// var workitems=[];

const itemschema=new mongoose.Schema({
  name:String
});

const Item=mongoose.model("Item",itemschema);

const item1=new Item({
  name:"pen"
})

const item2=new Item({
  name:"pencil"
})
const item3=new Item({
  name:"rubbber"
})

 const defaultitems=[item1,item2,item3];

// Item.insertMany(defaultitems);

const listschema=new mongoose.Schema({
    listname:String,
    items:[itemschema]
});

const List=mongoose.model("List",listschema);

app.get("/",function(req,res){
  
   
 
  
    Item.find({})
         .then((founditems) => {
             //console.log(founditems);
             if(founditems.length==0)
             {
               Item.insertMany(defaultitems);
               res.redirect("/");
             }
             else 
             {
             res.render("list",{listTitle: "Today",newlistitems: founditems});
             }

            }).catch((err) => {
                     console.log(err);
                  })
  
  

});

app.post("/",function(req,res){

//req.body.item;

const itemname=req.body.item;
   const listna=req.body.list;

  const newitem= new Item({
    name:req.body.item
  });

  if(listna==="Today")
  {
    newitem.save();
    res.redirect("/");
  }
  else{
       List.findOne({listname:listna})  
           .then((foundlist) => {
                
            foundlist.items=[...foundlist.items,newitem];
            foundlist.save();
            res.redirect("/"+listna);

           })
  }

  
      
});


app.post("/delete",(req,res) => {

  const itemtobedelete=req.body.checkbox;
  const fromlist=req.body.lis;

  if(fromlist==="Today")
  {
    Item.findByIdAndRemove(itemtobedelete)
        .then((err) => {
          if(!err)
          {
            res.redirect("/");
          }
        });
  }
  else
  {
     List.findOneAndUpdate({listname:fromlist},{$pull: {items:{_id:itemtobedelete}}})
         .then((foundlist) => {
          res.redirect("/"+fromlist);
         })  

  }


});


//express route parameters

app.get("/:customlistname",function(req,res){
  //req.params.paraName
  const customlistname= _.capitalize(req.params.customlistname);
  
      List.findOne({listname:customlistname})
          .then((foundlist) => {
            if(!foundlist)
            {
              //console.log("not");
              const list=new List({
                listname:customlistname,
                items:defaultitems
              });
            
              list.save();
              res.redirect("/"+customlistname);

            }
            else
            {

              res.render("list",{listTitle:customlistname,newlistitems: foundlist.items});
             }
          })

})








app.listen(3000,function(){
    console.log("server is running on port 3000");
})
























// app.post("/work",function(req,res){

//   var workitem=req.body.item;

//   workitems.push(workitem);

//   res.redirect("/work");
// })




/*

 db.products.updateOne({name:"rubber"},{$set:{reviews:[
  { 
    auth:"sally",
    rating:5,
    review:"awesome",
  },
   { 
    auth:"arpit",
    rating:2,
    review:"good",
  }
  ]}}
  */


  /*
    

app.get("/",function(req,res){

    console.log("server is running on port 30000");
   // res.send("hello");
/*
   var today=new Date();
   var day="";
  const weekday=["sunday","monday","tuesday","wednesday","thrusday","friday","saturday"]
   
  if(today.getDay==6 || today.getDay==0)
   {
    day="weekend";
   // res.send("yay! its weekend");
   }
   else
   {
    day="weekday";
    //res.send("oh ! its working day");
   }

   res.render("list",{kindofday:day});

   

   day=weekday[today.getDay()];
   res.render("list",{kindofday:day});
     
   

   var options = { weekday: 'long',  month: 'long', day: 'numeric' };
   var today  = new Date();

   var day= today.toLocaleDateString("en-US",options);

   
   console.log(today.toLocaleDateString("en-US"));             // 9/17/2016
   console.log(today.toLocaleDateString("en-US", options));

   console.log(today.toLocaleString("en-US"))
 
   
   let day=date.getdate();
   res.render("list",{listTitle: day,newlistitems: nitems});


});

app.post("/",function(req,res){



  var   nitem= req.body.item;
     console.log(req.body);
  

    if(req.body.list==="work")
    {
      workitems.push(nitem);
      res.redirect("/work");
    }
    else
    {
      nitems.push(nitem);
      res.redirect("/");
    }


       
       console.log(nitem);
   
     
    
    
});


app.get("/work",function(req,res){

  res.render("list",{listTitle:"work list",newlistitems:workitems})

})

app.get("/about",function(req,res){
 
  res.render("about");

})





app.listen(3000,function(){
    console.log("server is running on port 3000");
})













// app.post("/work",function(req,res){

//   var workitem=req.body.item;

//   workitems.push(workitem);

//   res.redirect("/work");
// })






 db.products.updateOne({name:"rubber"},{$set:{reviews:[
  { 
    auth:"sally",
    rating:5,
    review:"awesome",
  },
   { 
    auth:"arpit",
    rating:2,
    review:"good",
  }
  ]}}
  
  */

  /*
      <%       for(var i=0;i<newlistitems.length ; i++) { %>
             <div class="item">
             
              <input type="checkbox">
              <p> <%= newlistitems[i].name %> </p>

             </div>   
           <%  } %>*/