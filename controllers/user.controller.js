const bd = require('../bd')

class UserController {
    async getClients(req, res) {
        try{
            const {action} = req.params;
            const {type} = req.body;
            if(action == "getall"){
                const Clients = await bd.query('SELECT * FROM ReportClients()');
                return res.status(200).json(Clients.rows)
            }       
            if(action == "getjewelry"){
                const Clients = await bd.query('SELECT * FROM jewelry;');
                return res.status(200).json(Clients.rows)
            }         
            if(action == "addclient"){
                const {name, contact} = req.body;
                const Clients = await bd.query('INSERT INTO client(name, contactinfo) VALUES ($1, $2)', [name, contact]);
                return res.status(200).json(Clients.rows)
            }  
        } catch (error) {
            console.log(error)
        }
    }

    async workItem(req, res) {
        try{
            const {action, item} = req.params;
            const {type} = req.body;
            if(action == "add" && item == "material"){
                const {materialtype, price} = req.body;
                const Clients = await bd.query('INSERT INTO material(materialtype, price) VALUES ($1, $2)', [materialtype, price]);
                return res.status(200).json(Clients.rows)
            }        
            if(action == "add" && item == "gemstone"){
                const {gemstonetype, gemstoneprice} = req.body;
                const Clients = await bd.query('INSERT INTO gemstone(gemstonetype, gemstoneprice) VALUES ($1, $2) RETURNING *', [gemstonetype, gemstoneprice]);
                return res.status(200).json(Clients.rows)
            }  
            if(action == "add" && item == "jewelry"){
                const {type, weight, materialid, gemstoneid} = req.body;
                const Clients = await bd.query('INSERT INTO jewelry(type, weight, materialid, gemstoneid) VALUES ($1, $2, $3, $4) RETURNING *', [type, weight, materialid, gemstoneid]);
                return res.status(200).json(Clients.rows)
            }  
        } catch (error) {
            console.log(error)
        }
    }

    async workJewelry(req, res) {
        try{
            const {action} = req.params;
            const {type} = req.body;
            if(action == "get" && type == "material"){
                const Clients = await bd.query('SELECT * FROM material;');
                return res.status(200).json(Clients.rows)
            }        
            if(action == "get" && type == "gemstone"){
                const Clients = await bd.query('SELECT * FROM gemstone;');
                return res.status(200).json(Clients.rows)
            }  
        } catch (error) {
            console.log(error)
        }
    }

    async workOrder(req,res) {
        try{
            const {type} = req.params;
            const {id, start, end} = req.body;
            if(type == "client"){
                const Clients = await bd.query('SELECT * FROM ReportClientOrders($1)', [id]);
                return res.status(200).json(Clients.rows)
            }        
            if(type == "finans"){
                const Clients = await bd.query("SELECT ReportProfitForPeriod($1, $2);", [start, end]);
                return res.status(200).json(Clients.rows)
            }   
            if(type == "add"){
                const {clientid, jewelryid, comment, summa} = req.body;
                const Clients = await bd.query("INSERT INTO OrderInfo (ClientID, JewelryID, Summa, comment) VALUES ($1, $2, $3, $4)", [clientid, jewelryid, summa, comment]);
                return res.status(200).json(Clients.rows)
            }        
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController();