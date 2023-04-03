type ErrorsDictionary = {
  [key: string]: string;
};

export const errorsDictionary: ErrorsDictionary = {
  required: 'El campo es requerido',
  email: 'El campo debe ser un email válido',
  passwordMustMatchValidFormat: 'Formato de contraseña inválido',
};
