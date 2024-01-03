const ErrorMessages = {
  locales: {
    en: {
      presence: "Can't be blank",
      length: {
        min: 'Too short. Minimum {value} characters',
        max: 'Too long. Maximum {value} characters'
      },
      numericality: 'Must be a number',
      email: 'Invalid email format',
      strongPassword: {
        capitalLetter: 'Must contain at least one capital letter (A-Z)',
        number: 'Must contain at least one number',
        specialCharacter:
          'Must contain at least one special character (!@#$%^&*)',
        length: 'Must be at least 10 characters long'
      }
    },
    es: {
      presence: 'no puede estar en blanco',
      length: {
        min: 'Demasiado corto. Mínimo {value} caracteres',
        max: 'Demasiado largo. Máximo {value} caracteres'
      },
      numericality: 'Tiene que ser un número',
      email: 'Formato de correo inválido',
      strongPassword: {
        capitalLetter: 'Debe contener al menos una letra mayúscula (A-Z)',
        number: 'Debe contener al menos un número',
        specialCharacter:
          'Debe contener al menos un carácter especial (!@#$%^&*)',
        length: 'Debe tener al menos 10 caracteres'
      }
    },
    fr: {
      presence: 'Je ne peux pas être vide',
      length: {
        min: 'Trop court. Minimum {value} caractères',
        max: 'Trop long. 5 caractères maximum'
      },
      numericality: 'Doit être un nombre',
      email: "Format d'email invalide",
      strongPassword: {
        capitalLetter: 'Doit contenir au moins une lettre majuscule (A-Z)',
        number: 'Doit contenir au moins un chiffre',
        specialCharacter:
          'Doit contenir au moins un caractère spécial (!@#$%^&*)',
        length: 'Doit contenir au moins 10 caractères'
      }
    },
    'pt-BR': {
      presence: 'Não posso ficar em branco',
      length: {
        min: 'Muito curto. Mínimo {value} caracteres',
        max: 'Demasiado longo. Máximo de {value} caracteres'
      },
      numericality: 'Deve ser um número',
      email: 'Formato de email inválido',
      strongPassword: {
        capitalLetter: 'Deve conter pelo menos uma letra maiúscula (A-Z)',
        number: 'Deve conter pelo menos um número',
        specialCharacter:
          'Deve conter pelo menos um caractere especial (!@#$%^&*)',
        length: 'Deve ter pelo menos 10 caracteres'
      }
    },
    'zh-CN': {
      presence: '不能为空',
      length: {
        min: '过短。最少 {value} 个字符',
        max: '太长。最多 {value} 个字符'
      },
      numericality: '必须是一个数字',
      email: '电子邮件格式无效',
      strongPassword: {
        capitalLetter: '必须包含至少一个大写字母 (A-Z)',
        number: '必须至少包含一个数字',
        specialCharacter: '必须至少包含一个特殊字符 (!@#$%^&*)',
        length: '长度必须至少 10 个字符'
      }
    },
    'zh-TW': {
      presence: '不能為空',
      length: {
        min: '過短。最少 {value} 個字符',
        max: '太長。最多 {value} 個字符'
      },
      numericality: '必須是一個數字',
      email: '電子郵件格式無效',
      strongPassword: {
        capitalLetter: '必須包含至少一個大寫字母 (A-Z)',
        number: '必須至少包含一個數字',
        specialCharacter: '必須至少包含一個特殊字元 (!@#$%^&*)',
        length: '長度必須至少 10 個字符'
      }
    }
  }
}

export default ErrorMessages
