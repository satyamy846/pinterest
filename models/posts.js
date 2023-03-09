import mongoose from "mongoose";

const schema = mongoose.schema({
    image:{
        type:String,
    },
    comment:{
        type:String
    },
    like:{
        type:Boolean
    }
});

export const posts = new mongoose.model("posts",schema);