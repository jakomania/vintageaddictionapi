var express = require('express');
const users = require("../users/user.db");
const User = require("../../models/User");
var router = express.Router();

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
        return;
    }


    res.render('login');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/login");
    });
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    
    const { email, password } = req.body;

  // Buscar al usuario en la base de datos por su email
  try {
    // Buscar al usuario en la base de datos por su email
    const usuarioEncontrado = await User.findOne({ email });

    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    const coincide = usuarioEncontrado.password === password;
    if (!coincide) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }  
    
    req.session.user = usuarioEncontrado;
    console.log('Usuario: ', req.session.user.username);
    res.status(200)
        .cookie('username', encodeURIComponent(req.session.user.username), {
                        secure: false
                })
        .redirect('/dashboard');
        return;
                
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    };
})
// console.log(user)
//     if (user) {
//         req.session.user = user;
//         res
//             .cookie('username', encodeURIComponent(req.session.user.username), {
//                 secure: false
//             })
//             .redirect('/dashboard');
//         return;
//     }

//     res.redirect('/login');
// });


// router.post('/login', (req, res) => {
//     var user = users.find(user => {
//         console.log(user, req.body,user.email === req.body.email,user.password === req.body.password)
//         return user.email === req.body.email && user.password === req.body.password
//     });
// console.log(user)
//     if (user) {
//         req.session.user = user;
//         res
//             .cookie('username', encodeURIComponent(req.session.user.username), {
//                 secure: false
//             })
//             .redirect('/dashboard');
//         return;
//     }

//     res.redirect('/login');
// });



module.exports = router;
