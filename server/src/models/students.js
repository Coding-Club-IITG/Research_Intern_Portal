import mongoose from "mongoose";
const Students = new mongoose.Schema({
cpi:{
    type: Number
},
branch:{
    type: String
},
study_year:{
    type: Number
}
});
export default mongoose.model("Students", Students);