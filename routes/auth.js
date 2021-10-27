const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/");
const {
  login,
  googleSignin,
  confirmAccount,
  resendTokenVerification,
  resetPassword,requestSetPassword
} = require("../controllers/authController");
const { isVerified } = require("../helpers/users_db_validator");

const router = Router();
const passport = require("passport");
//routes for Api
router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email").custom(isVerified),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSignin
);
router.get("/confirmation", confirmAccount);
router.post(
  "/resendemail",
  [check("email", "El correo es obligatorio").isEmail(), validarCampos],
  resendTokenVerification
);
router.post("/resetpassword", resetPassword);
router.post("/requestsetpassword", requestSetPassword);



//Routes for website
router.post("/login", (req, res, next) => {
    passport.authenticate("local",
    function(err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            console.log(info)
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            console.log(req.user);
            //return res.status(200).json({ success: `logged in ${user.id}` });
            res.redirect("/");
        });
    })(req, res, next);
});
router.get('/logout', function(req, res){
  req.logout();
  res.send("Disconect");
  //res.redirect('/');
});
module.exports = router;
