const mongoose=require("mongoose")

const Schema=mongoose.Schema

const workoutSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    // if i want to restrict that that onlu user who has registered the workouts see it 
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Workout",workoutSchema)