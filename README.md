Steps to run this project:

1. Run `npm i` command
2. Before Run the Project Run the Migration File By this Command `npm run typeorm -- migration:run -d src/db/data-source.ts `
3. If face Some Issues You can revert migration file by run this command `npm run typeorm -- migration:revert -d src/db/data-source.ts`
4. For Run the Project
   i. Run `npm start` for started with node
   ii. Run `npm run dev` for started with nodemon

Mainly Project is Run on PORT : 8000

if You face issue to run the Server Just Open CMD by Administrator Permission and Type Following Command :

i. netstat -ano | findstr :8000

This Command Shows you the Currently Running process on PORT 8000, along with the Process Id which will be at the End of the row, This ProcessId helps us to kill the Process and Start our Server on PORT 8000
For Kill the Existing Running Process on PORT 8000 Type following Command :

ii. taskkill /PID <ProcessID> /F

After this Please Restart the Server using :

1. `npm run dev` for Start Server with nodemon
2. `npm start` for Start Server normally
