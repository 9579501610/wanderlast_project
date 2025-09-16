const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate =require("ejs-mate");


app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

main()
.then(()=>{
    console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);

}
app.listen(8080,()=>{
    console.log("server is listening to the port");
   
});
app.get("/",(req,res)=>{
    console.log("Hi,I am root");
    res.send("Hi,I am root");
});

// app.get("/test_Listing",async(req,res)=>{
    // let sample_listing=new listing({
//         title:"my new vanilla",
//         description:"By the beatch",
//         price:42000,
//         location:"loandon,goa",
//         country:"india",
//     });
// await sample_listing.save();
// console.log(sample_listing);
// console.log("sample was save");
// res.send("testing succefully");

// });


app.get("/listing",async(req,res)=>{
    const allListing=await listing.find({});
    res.render("./listing/index.ejs",{allListing});
});


app.post("/listings",async(req,res)=>{
       const newListing=new listing(req.body.Listing);
       console.log(newListing)
       await newListing.save();
       res.redirect("/listing");
    });
    
app.get("/listing/new",async(req,res)=>{
 res.render("new.ejs");
});

app.get("/listing/:id" ,async(req,res)=>{

    let {id}=req.params;
    const listings=await listing.findById(id);
    res.render("./listing/show.ejs",{listings});
});

app.get("/listing/:id/Edit",async(req,res)=>{
    let {id}=req.params;
    const listings=await listing.findById(id);
    res.render("./listing/edit.ejs",{listings});
});


app.put("/listing/:id",async(req,res)=>{
    let {id}=req.params;
   let test= await listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect("/listing");
});

//delete route
app.delete("/list/:id",async(req,res)=>{
    let {id}=req.params;
    const listings=await listing.findByIdAndDelete(id);
    console.log("listing was deleted");
    res.redirect("/listing");
});

