const mongoose=require("mongoose");
const schema=mongoose.Schema;

const listing_scehma=new schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image: {
        filename: { type: String},
        url: { type: String }
      },
    price:String,
    location:String,
    country:String,   
});


const listing=mongoose.model("listing",listing_scehma);
module.exports=listing;