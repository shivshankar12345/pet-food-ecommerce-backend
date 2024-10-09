Steps to run this project:

1. Run `npm i` command
2. For Run the Project
   i. Run `npm start` for started with node
   ii. Run `npm run dev` for started with nodemon

Mainly Project is Run on PORT : 8000

if You face issue to run the Server Just Open CMD by Administrator Permission and Type Following Command :

i. netstat -ano | findstr :8000

This Command Shows you the Currently Running process on PORT 8000, along with the Process Id which will be at the End of the row, This ProcessId helps us to kill the Process and Start our Server on PORT 8000
For Kill the Existing Running Process on PORT 8000 Type following Command :

ii. askkill /PID <ProcessID> /F

After this Please Restart the Server using :

1. `npm run dev` for Start Server with nodemon
2. `npm start` for Start Server normally
