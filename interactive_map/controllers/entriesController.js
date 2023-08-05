const Entry = require('../models/entriesModel');

/**
 * Obtener todas las entradas de la base de datos.
 * @function getEntriesAdmin
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const getEntriesAdmin = async (req, res) => {
   
    try {

        const search = new RegExp(`${req.query.search}`, 'i');

        if (req.query.search != undefined) {

            const entry = await Entry.find({ $or: [{ titulo: search }, { descripcion: search }, {iconType: search}]});
            /**
             * @typedef {Object} json
             * @property {boolean} ok - Indica cómo fue la solicitud.
             * @property {*} [data] - Datos de la respuesta.
             */
            return res.status(200).json({
                ok: true,
                data: entry
            });

        } else {

            const entry = await Entry.find().populate('user', 'email role username date');

            return res.status(200).json({
                ok: true,
                data: entry
            });
        };

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la entrada",
        });
    }
};

/**
 * Obtener una entrada de la base de datos por su ID.
 * @function getEntryAdmin
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const getEntryAdmin = async (req, res) => {

    const id = req.params.id;

    try {

        const entry = await Entry.findById(id).populate('user', 'email role username date');

        return res.status(200).json({
            ok: true,
            msg: "Entrada encontrada",
            data: entry,
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "No se ha podido acceder a la entrada",
        });
    }
};

/**
 * Crear una nueva entrada en la base de datos.
 * @function createEntry
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const createEntry = async (req, res) => {
   
    const newEntry = new Entry(req.body);
  
    try {

        if (!res.errors) {

            const entry = await newEntry.save();

            return res.status(201).json({
                ok: true,
                msg: 'Entrada creada.',
                entry
            });

        } else {

            console.log(res.errors)
            const errors = res.errors;
            return res.status(200).json({ errors}) ;

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al crear la entrada",
        });
    }
};

/**
 * Editar una entrada en la base de datos por ID.
 * @function editEntry
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const editEntry = async (req, res) => {

    try {

        const id = req.params.id;
        const body = req.body;
    
        if (!res.errors) {

            const entry = await Entry.findOneAndUpdate({ _id: id }, { $set: body });

            return res.status(200).json({
                ok: true,
                msg: 'Entrada actualizada.',
                entry
            });

        } else {

         
            const errors = res.errors;
            return res.status(200).json({ errors}) ;

        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error al editar la entrada",
        });
    };
};

/**
 * Eliminar una entrada de la base de datos por su ID.
 * @function deleteEntry
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json}
 */
const deleteEntry = async (req, res) => {
 
    try {

        const id = req.params.id;
        const entry = await Entry.findOneAndDelete({ _id: id });

        return res.status(200).json({

            ok: true,
            msg: 'Entrada eliminada correctamente.',
            entry

        });


    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Error al borrar la entrada.'
        });
    }
};

/**
 * Eliminar todas las entradas de un usuario por su ID, se utiliza en el siguiente controlador y en el de borrar usuarios.
 * @function deleteEntriesByUserId
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json} Devuelve un objeto
 */
const deleteEntriesByUser = async (id) => {

    try {

      const result = await Entry.deleteMany({ user: id });
      return result.deletedCount;

    } catch (error) {
        
      throw new Error('Error al borrar las entradas del usuario.');
    }
};

/**
 * Eliminar todas las entradas de un usuario por su ID utilizando la función anterior.
 * @function deleteEntriesByUserId
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta
 * @return {json} Devuelve mensaje de respuesta y el número de entradas borradas
 */
const deleteEntriesByUserId = async (req, res) => {
   
    try {
        
      const id = req.params.id;
      const deletedEntriesCount = await deleteEntriesByUser(id)
  
      return res.status(200).json({
        ok: true,
        deletedEntriesCount
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        msg: 'Error al borrar las entradas del usuario.'
      });
    }
};

module.exports = {
    getEntryAdmin,
    getEntriesAdmin,
    createEntry,
    editEntry,
    deleteEntry,
    deleteEntriesByUser,
    deleteEntriesByUserId
}