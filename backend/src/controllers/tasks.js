import {connect} from "../database"

export const login = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM users WHERE user = ? AND password = ?", [req.body.user, req.body.password]);
    if(rows[0]){
        res.status(200).json({
            user: rows[0],
            code: 200
        });
    }else{
        res.status(404).json({
            user: null,
            code: 404
        });
    }
}

export const existUser = async(user) => {
    let result = false;
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM users WHERE user = ?", [user]);
    if(rows[0]){
        result = true;
    }
    return result;
}

export const register = async(req, res) => {
    if(!await existUser(req.body.user)){
        const connection = await connect();
        await connection.query("INSERT INTO users (name, surname, user, password, permission) values (?,?,?,?,?)",
        [req.body.name, req.body.surname, req.body.user, req.body.password, req.body.permission]);
        res.status(200).json({
            code: 200,
            exist: false
        });
    }else{
        res.status(400).json({
            code: 400,
            exist: true
        });
    }
}

export const existBudget = async(id, number) => {
    let result = false;
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM budgets WHERE id = ? AND budget_number = ?", [id, number]);
    if(rows[0]){
        result = true;
    }
    return result;
}

export const addBudget = async(req, res) => {
    if(!await existBudget(req.body.budgetReference, req.body.budgetNumber)){
        const connection = await connect();
        await connection.query("INSERT INTO budgets (id, creation_date, budget_number, status, total_costs, photographic_production, agency_fee, total_budget, expiration_date, iban, user) values (?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.budgetReference, req.body.creationDate, req.body.budgetNumber, req.body.budgetStatus, req.body.budgetTotalCosts, req.body.photographicProduction, req.body.agencyFee, req.body.totalBudget, req.body.budgetExpirationDate, req.body.budgetIBAN, req.body.user]);
        await connection.query("INSERT INTO clients (name, cif, street, street_number, postal_code, city, province, id_budget, budget_number) values (?,?,?,?,?,?,?,?,?)",
        [req.body.clientName, req.body.clientCIF, req.body.clientStreet, req.body.clientStreetNumber, req.body.clientPostalCode, req.body.clientCity, req.body.clientProvince, req.body.budgetReference, req.body.budgetNumber]);
        for (let task of req.body.tasks){
            await connection.query("INSERT INTO tasks (description, category, days_number, day_price, total_price, cost, supplier, invoice_number, expiration_date, payment_method, payment_date, id_budget, budget_number) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [task.taskDescription, task.taskCategory, task.taskDays, task.taskDayPrice, task.taskTotalPrice, task.taskCost, task.taskSupplier, task.taskInvoiceNumber, task.taskExpirationDate, task.taskPaymentMethod, task.taskPaymentDate, req.body.budgetReference, req.body.budgetNumber]);
        }
        res.status(200).json({
            code: 200,
            exist: false
        });
    }else{
        res.status(400).json({
            code: 400,
            exist: true
        });
    }
}

export const getBudgetsByID = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM budgets WHERE id = ?", [req.body.idBudget]);
    if(rows[0]){
        res.status(200).json({
            budgets: rows,
            code: 200
        });
    }else{
        res.status(404).json({
            budgets: null,
            code: 404
        });
    }
}

export const deleteBudget = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM budgets WHERE id = ? AND budget_number = ?", [req.body.idBudget, req.body.budgetNumber]);
    if(rows[0]){
        await connection.query("DELETE FROM budgets WHERE id = ? AND budget_number = ?", [req.body.idBudget, req.body.budgetNumber]);
        await connection.query("DELETE FROM clients WHERE id_budget = ? AND budget_number = ?", [req.body.idBudget, req.body.budgetNumber]);
        await connection.query("DELETE FROM tasks WHERE id_budget = ? AND budget_number = ?", [req.body.idBudget, req.body.budgetNumber]);
        res.status(200).json({
            code: 200
        });
    }else{
        res.status(404).json({
            code: 404
        });
    }
}

export const getBudgetClient = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM clients WHERE id_budget = ? AND budget_number = ?", [req.body.idBudget, req.body.budgetNumber]);
    if(rows[0]){
        res.status(200).json({
            client: rows[0],
            code: 200
        });
    }else{
        res.status(404).json({
            client: null,
            code: 404
        });
    }
}

export const getBudgetTasks = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM tasks WHERE id_budget = ? AND budget_number = ?", [req.body.idBudget, req.body.budgetNumber]);
    if(rows[0]){
        res.status(200).json({
            tasks: rows,
            code: 200
        });
    }else{
        res.status(404).json({
            tasks: null,
            code: 404
        });
    }
}

export const modifyBudget = async(req, res) => {
    if(await existBudget(req.body.budgetReference, req.body.budgetNumber)){
        const connection = await connect();
        await connection.query("UPDATE budgets SET creation_date = ?, status = ?, total_costs = ?, photographic_production = ?, agency_fee = ?, total_budget = ?, expiration_date = ?, iban = ? WHERE id = ? AND budget_number = ?",
        [req.body.creationDate, req.body.status, req.body.budgetTotalCosts, req.body.photographicProduction, req.body.agencyFee, req.body.totalBudget, req.body.budgetExpirationDate, req.body.budgetIBAN, req.body.budgetReference, req.body.budgetNumber]);
        await connection.query("UPDATE clients SET name = ?, cif = ?, street = ?, street_number = ?, postal_code = ?, city = ?, province = ? WHERE id_budget = ? AND budget_number = ?",
        [req.body.clientName, req.body.clientCIF, req.body.clientStreet, req.body.clientStreetNumber, req.body.clientPostalCode, req.body.clientCity, req.body.clientProvince, req.body.budgetReference, req.body.budgetNumber]);
        await connection.query("DELETE FROM tasks WHERE id_budget = ? AND budget_number = ?", [req.body.budgetReference, req.body.budgetNumber]);
        for (let task of req.body.tasks){
            await connection.query("INSERT INTO tasks (description, category, days_number, day_price, total_price, cost, supplier, invoice_number, expiration_date, payment_method, payment_date, id_budget, budget_number) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [task.taskDescription, task.taskCategory, task.taskDays, task.taskDayPrice, task.taskTotalPrice, task.taskCost, task.taskSupplier, task.taskInvoiceNumber, task.taskExpirationDate, task.taskPaymentMethod, task.taskPaymentDate, req.body.budgetReference, req.body.budgetNumber]);
        }
        res.status(200).json({
            code: 200,
            exist: false
        });
    }else{
        res.status(400).json({
            code: 400,
            exist: true
        });
    }
}

export const getBudgetsByCIF = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM clients WHERE cif = ?", [req.body.clientCIF]);
    if(rows[0]){
        let budgetsID = [];
        for(let row of rows){
            budgetsID.push(row.id_budget)
        }
        console.log("ids: " + budgetsID)
        const [budgets] = await connection.query("SELECT * FROM budgets WHERE id IN (?)", [budgetsID]);
        if(budgets[0]){
            res.status(200).json({
                budgets: budgets,
                code: 200
            });
        }else{
            res.status(404).json({
                budgets: null,
                code: 404
            });
        }
    }else{
        res.status(404).json({
            budgets: null,
            code: 404
        });
    }
}

export const getBudgetsByStatus = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM budgets WHERE status = ?", [req.body.status]);
    if(rows[0]){
        res.status(200).json({
            budgets: rows,
            code: 200
        });
    }else{
        res.status(404).json({
            budgets: null,
            code: 404
        });
    }
}

export const getAllBudgets = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM budgets", []);
    if(rows[0]){
        res.status(200).json({
            budgets: rows,
            code: 200
        });
    }else{
        res.status(404).json({
            budgets: null,
            code: 404
        });
    }
}

export const getUserBudgets = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM budgets WHERE user = ?", [req.body.user]);
    if(rows[0]){
        res.status(200).json({
            budgets: rows,
            code: 200
        });
    }else{
        res.status(404).json({
            budgets: null,
            code: 404
        });
    }
}