const mongoose_element=require('mongoose');
const EmployeeSchema=mongoose_element.Schema(
    {
        name: String,
        position : String,
        location:String,
        salary : String
    }
);
const EmployeeModel=mongoose_element.model('employees',EmployeeSchema);

module.exports = EmployeeModel

