const Router = require("express")
const router = new Router()
const userController = require('../controllers/user.controller')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

router.post("/client/action=:action", urlencodedParser, jsonParser, userController.getClients);
router.post("/item/action=:action/item=:item", urlencodedParser, jsonParser, userController.workItem);
router.post("/jewelry/action=:action", urlencodedParser, jsonParser, userController.workJewelry);
router.post("/order/type=:type", urlencodedParser, jsonParser, userController.workOrder);

module.exports = router;