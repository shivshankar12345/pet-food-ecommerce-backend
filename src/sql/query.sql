create database petFoodApis;

use `petFoodApis`;

Insert into permission(id , permission) values(uuid(), "limited"),(uuid(), "moderate"),(uuid(), "full");

Insert into role(id , role_name, permissionsId) values(uuid(), "customer","75145526-7c9e-11ef-ba0f-00e04cca30fe"),(uuid(), "seller","751496f9-7c9e-11ef-ba0f-00e04cca30fe"),(uuid(), "admin","7514a657-7c9e-11ef-ba0f-00e04cca30fe");

INSERT into user(id, name, email, phone, gender, pan_num,gst_num, is_active, is_verified) values
  (uuid(),"Satyam","satyam@google.com","7875413685","m","ABCDF7625E","0xhdsdAbCYDhfdsh",true, true),
  (uuid() ,"Sahil Hussain","sahilhussain395@gmail.com","7742048486","m",null, null, true, false),
  (uuid(), "Zabir Khan","zabirkhan69142@gmail.com","8003326507","m","BIIPH7812M","0fdhriuerebAfdb",true,false),
  (uuid(),"Raghav Soni","raghavsoni361@gmail.com","6367679561","m",null,null, false, false)