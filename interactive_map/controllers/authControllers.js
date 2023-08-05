const { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')
const { createUserAdmin, getUserBody } = require('./usersControllers')
const { admin } = require('../helpers/firebase');

/**
 * Registrar un nuevo usuario y almacenarlo en la base de datos.
 * @function signUp
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const signUp = async (req, res) => {

    try {

        const { email, password, username } = req.body

        if (!res.errors) {
            
            const userCredentials = await createUserWithEmailAndPassword(authFb, email, password)
            const token = userCredentials._tokenResponse.idToken
            
            const newUserDB = {
                email: email,
                username: username,
                role: 'user',
                uid: userCredentials.user.uid
            }

          const user =  await createUserAdmin(newUserDB)
        
            return res.status(200).json({
                ok:true,
                user,
                token
            })
            
        } else {
            
            const errors = res.errors;
            return res.status(200, { errors });

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
            error: error.code
        });
    }
};


/**
 * Iniciar sesión con un usuario 
 * @function signIn
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json} mensaje de respuesta y objetos
 */
const signIn = async (req, res) => {
    
    const { email, password } = req.body
  
    try {
        
        const userCredentials = await signInWithEmailAndPassword(authFb, email, password);
        const token = userCredentials._tokenResponse.idToken
       
        const user = await getUserBody(email)
        return res.status(200).json({
            ok:true,
            user,
            token
        })
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al inciar sesion",
            error: error.code
        });
    }
};

/**
 * Cerrar sesión del usuario actual.
 * @function logOut
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json} 
 */
const logOut = async (req, res) => {

    try {

        await signOut(authFb)
        return res.status(200).json({
            ok:true,
            mgs: 'Cerrada sesión de usuario'
        })

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
            error: error.code
        });
    }
};

/**
 * Verificar y renovar el token de un usuario.
 * @function verifyAndRenewToken
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json} mensaje de respuesta, objetos y el token en caso de que se pida.
 */
const verifyAndRenewToken = async (req, res) => {

    const idToken = req.body.token;
    const uid = req.body.uid;

    if (!idToken && !uid ) {

        return res.status(400).json({ 
            isValid: false, 
            msg: "No se ha encontrado ni token ni usuario" 
        });

    } else if (idToken && uid) {

       try {

        await admin.auth().getUser(uid);
        const renewedToken = await admin.auth().createCustomToken(uid);
  
        res.status(200).json({ 
            isValid: true, 
            token: renewedToken,
            msg: "Usuario y token validados"
        });

      } catch (error) {

        res.status(401).json({ 
            isValid: false, 
            msg: "Usuario no válido" 
        });
      } 

    } else {

      try {

        await admin.auth().verifyIdToken(idToken);

        res.status(200).json({ 
            isValid: true,
            msg: 'Token verificado'
        });

      } catch (error) {

        res.status(401).json({
             isValid: false, 
             msg: "El token no es válido" 
        });
      }
    }
};

module.exports = {
    signIn,
    logOut,
    signUp,
    verifyAndRenewToken
};
