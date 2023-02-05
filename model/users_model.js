const mongoose_element=require('mongoose');
const bycrypt = require("bcrypt");

const UserSchema=mongoose_element.Schema(
    {
        username:String,

        password:String,
        
        usertype:String
    }
);

UserSchema.pre("save",async function(next){

    this.password = await bycrypt.hashSync(this.password,10)
})
const UserModel=mongoose_element.model('users',UserSchema);
module.exports=UserModel

