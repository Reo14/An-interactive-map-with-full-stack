const createEditUserSchema = {
  
    email: {
      in: ['body'],
      isString: true,
      notEmpty: true,
      errorMessage: 'Se debe introducir un email'
    },
    
  };
  
  module.exports = {
    createEditUserSchema
  };