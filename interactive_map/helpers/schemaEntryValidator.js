const createEditEntrySchema = {
  
  title: {
    in: ['body'],
    isString: true,
    custom: {
      options: (value) => {
        if (!value.trim()) {
          throw new Error('Se requiere un título');
        } else if (value.trim().length < 4 || value.trim().length > 20) {
          throw new Error('La longitud del título debe estar entre 4 y 20 caracteres');
        }
        return true;
      },
    },
  },
  description: {
    in: ['body'],
    isString: true,
    custom: {
      options: (value) => {
        if (!value.trim()) {
          throw new Error('Se requiere una descripción');
        } else if (value.trim().length < 4 || value.trim().length > 40) {
          throw new Error('La longitud de la descripción debe estar entre 4 y 40 caracteres');
        }
        return true;
      },
    },
  },
  status: {
    in: ['body'],
    isBoolean: true,
    errorMessage: 'El campo "status" debe ser un valor booleano'
  },
  iconType: {
    in: ['body'],
    isIn: {
      options: [['Tower', 'Dungeon']],
      errorMessage: 'El campo "iconType" debe ser "Tower" o "Dungeon"'
    }
  },

};

module.exports = {
  createEditEntrySchema
};