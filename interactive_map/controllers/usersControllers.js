const User = require('../models/userModel');
const { admin } = require('../helpers/firebase');
const {deleteEntriesByUser}=require('../controllers/entriesController')

/**
 * Obtener todos los usuarios de la base de datos.
 * @function getUsersAdmin
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const getUsersAdmin = async (req, res) => {

    try {

        const user  = await User.find();

        return res.status(200).json({
            ok: true,
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener los usuarios",
        });
    }
};

/**
 * Obtener un usuario de la base de datos por su email.
 * @function getUserAdmin
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const getUserAdmin = async (req, res) => {

    const email = req.params.id;
  
    try {

        const user = await User.findOne({email: email});

        return res.status(200).json({
            ok: true,
            msg: "Usuario encontrado",
            data: user,
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "No se ha podido obtener el usuario",
        });
    }
};

/**
 * Obtener un usuario de la base de datos por su email utilizando el cuerpo de la solicitud.
 * @function getUserBody
 * @async
 * @param {Object} req Objeto de solicitud.
 * @return {Object} Usuario encontrado.
 */
const getUserBody = async (req, res) => {

    const email = req;
  
    try {

        const user = await User.findOne({email: email});
        return user

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "No se ha podido obtener el usuario",
        });
    }
};

/**
 * Crear un nuevo usuario en la base de datos que viene desde la función del registro.
 * @function createUserAdmin
 * @async
 * @param {Object} newUserDB Objeto con los datos del nuevo usuario.
 * @return {Object} Usuario creado que se envía al controlador del registro.
 */
const createUserAdmin = async (newUserDB) => {

    const newUser = new User(newUserDB);

    try {

        const user = await newUser.save();
        return user
        
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
        });
    }
};

/**
 * Editar un usuario de la base de datos por su ID.
 * @function editUserAdmin
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const editUserAdmin = async (req, res) => {
 
    try {
        
        const id = req.params.id;
        const body = req.body;
        const user = await User.findOneAndUpdate({ _id: id }, { $set: body });
        
        if (!body.role) {
            await admin.auth().updateUser(user.uid, {
              email: body.email,
              password: body.password
            });
          }
        const data = await User.findOne({_id: id});
      
        return res.status(200).json({
            ok:true,
            data,  
        }) 

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al editar el usuario",
        });
    };
};

/**
 * Eliminar un usuario de la base de datos por su ID.
 * @function deleteUserAdmin
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const deleteUserAdmin = async (req, res) => {

    try {
        
        const id = req.params.id;
        const user = await User.findOneAndDelete({ _id: id });
        const deletedEntriesCount = await deleteEntriesByUser(id);
        await admin.auth().deleteUser(user.uid)

        return res.status(200).json({
            ok:true,
            user,
            deletedEntriesCount
        })
       
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar el usuario.'
        });
    }
};


module.exports = {

   getUsersAdmin,
   getUserAdmin,
   createUserAdmin,
   deleteUserAdmin,
   editUserAdmin,
   getUserBody,

}