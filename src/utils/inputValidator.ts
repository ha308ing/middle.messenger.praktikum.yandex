function validate(regexp: RegExp | RegExp[]): (string: string) => boolean {
  return function (string) {
    if (!Array.isArray(regexp)) {
      return regexp.test(string);
    } else {
      return regexp.reduce((result, reg) => {
        return reg.test(string) && result;
      }, true);
    }
  };
}

/*
 *login — от 3 до 20 символов,
 *  латиница,
 *  может содержать цифры, но не состоять из них,
 *  без пробелов,
 *  без спецсимволов (допустимы дефис и нижнее подчёркивание).
 */
const loginRegexp = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
const loginValidate = (string: string) => validate(loginRegexp)(string);

/*
 *email — латиница,
 *  может включать цифры и спецсимволы вроде дефиса и подчёркивания,
 *  обязательно должна быть «собака» (@) и точка после неё,
 *  но перед точкой обязательно должны быть буквы.
 */
const emailRegexp = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,5}$/;
const emailValidate = (string: string) => validate(emailRegexp)(string);

/*
 *first_name, second_name — латиница или кириллица,
 *  первая буква должна быть заглавной,
 *  без пробелов и без цифр,
 *  нет спецсимволов (допустим только дефис).
 */
const nameRegexp = /^[A-ZА-Я][a-zA-Zа-яА-Я]+$/;
const nameValidate = (string: string) => validate(nameRegexp)(string);

/*
 *password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
 */
const passwordRegexp = [/\S{8,40}/, /[A-Z]/, /[0-9]/];
const passwordValidate = (string: string) => validate(passwordRegexp)(string);

/*
 *phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.
 */
const phoneRegexp = /^\+?\d{10,15}/;
const phoneValidate = (string: string) => validate(phoneRegexp)(string);

/*
 *message — не должно быть пустым.
 */
const messageRegexp = /\w+/;
const messageValidate = (string: string) => validate(messageRegexp)(string);

const inputValidator: Record<string, (string: string) => boolean> = {
  login: loginValidate,
  email: emailValidate,
  first_name: nameValidate,
  second_name: nameValidate,
  display_name: nameValidate,
  password: passwordValidate,
  old_password: passwordValidate,
  new_password: passwordValidate,
  repeat_password: passwordValidate,
  phone: phoneValidate,
  message: messageValidate,
  avatar: () => {
    return true;
  },
};

export default inputValidator;
