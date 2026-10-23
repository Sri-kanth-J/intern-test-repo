const express=require("express")
const cors=require("cors")
const mysql=require("mysql2")
const app=express()
app.use(cors(),express.json())
const db=mysql.createConnection(
    {host:"localhost",user:"root",password:"0000",database:"icecream_stock_db",dateStrings:true});



db.connect(err => console.log(err ? "db error" : "db connected "));


const valid = b => b.name && b.flavout && b.category && b.expiry_date && b.quantity >= 0 && b.price > 0;


const run = (res, sql, params, code, msg) => {
    db.query(sql, params, (err, result) =>
        err ? res.status(500).json({ error: err.message })
            : res.status(code).json(msg ? { message: msg } : result));
};

app.get("/api/icecreams", (req, res) => run(res, "SELECT * FROM icecreams", [], 200));

app.post("/api/icecreams", (req, res) => {
    const b = req.body;
    if (!valid(b)) return res.status(400).json({ error: "Invalid data" });
    run(res, "INSERT INTO icecreams (name,flavout,category,quantity,price,expiry_date) VALUES (?,?,?,?,?,?)",
        [b.name, b.flavout, b.category, b.quantity, b.price, b.expiry_date], 201, "Record added");
});

app.put('api/icecreams/:id',(req, res) => {
    const b = req.body;
    if (!valid(b)) return res.status(400).json({ error: "Invalid data" });
    run(res,"UPDATE icecreams SET name=?,flavout=?,category=?,quantity=?,price=?,expiry_date=? where id=?",
        [b.name, b.flavout, b.category, b.quantity, b.price, b.expiry_date], 201, "Record updated");
});
    app.delete('api/icecreams/:id',(req,res)=>{
        run(res,"DELETE from icecream where id={req.parms.id}",200,"record deleted");
    });
    app.listen(5000, ()=>console.log("server running at 5000"));