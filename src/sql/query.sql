create database petFoodApis;

use `petFoodApis`;

Insert into permission(id , permission) values(uuid(), "limited"),(uuid(), "moderate"),(uuid(), "full");

Insert into role(id , role_name, permissionsId) values(uuid(), "customer","75145526-7c9e-11ef-ba0f-00e04cca30fe"),(uuid(), "seller","751496f9-7c9e-11ef-ba0f-00e04cca30fe"),(uuid(), "admin","7514a657-7c9e-11ef-ba0f-00e04cca30fe");