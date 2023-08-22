// src/routes/homeRoute.ts
import path from 'path';
import {pool} from "./utils/database"

export const injectRoutes = (app: any) => {
    app.get("/home", (req:any, res:any)=>{
        const filePath = path.join(__dirname, '../public/index.html');
        res.sendFile(filePath);
    })

    app.get("/demo", async (req:any, res:any) => {
        try {
            const users = await pool.query("SELECT * FROM users");
            const data = { message: 'API call successful', users: users.rows };
            res.json(data);
        } catch (error) {   
            throw error;
        }
    })

    // Creating CRUD apis for adding and removing expenses
}
