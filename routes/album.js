const { Router } = require("express");
const { albumPost } = require("../controllers/albumController");

const router = Router();


router.post('/', albumPost);



module.exports = router;