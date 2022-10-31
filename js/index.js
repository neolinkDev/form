
/* VARIABLES */
const d = document;

// '$' variables del DOM
const $form = d.getElementById('form');

// accedemos a todos los inputs que tenga el formulario
const $inputs = d.querySelectorAll('#form input');

// objeto con las expresiones regulares
const expresions = {
	usuario: /^[A-Za-z][A-Za-z0-9_]{3,15}$/, // Letras, números, guión bajo
	password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\.])[A-Za-z\d@$!%*#?&\.]{8,12}$/, // 8 a 12 caracteres.
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras, espacios y pueden llevar acentos.
	email: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
	phone: /^\d{10}$/ // 10 números.
}

const inputsObject = {
  'user': false,
  'password': false,
  'name': false,
  'email': false,
  'phone': false
}

// FUNCIONES
function validateForm({ target }){

  const { usuario, password, nombre, email, phone } = expresions;

  let targetName = target.name;
  // console.log(targetName)

  switch ( targetName ) {
    case 'user':
      validateInput( { regularExpresion: usuario, input: target, targetName } );
      break;

    case 'password':
      validateInput( { regularExpresion: password, input: target, targetName } );
      validatePasswords();
      break;

    case 'password2':
      validatePasswords();
      break;

    case 'name':
      validateInput( { regularExpresion: nombre, input: target, targetName } );
      break;

    case 'email':
      validateInput( { regularExpresion: email, input: target, targetName } );
      break;

    case 'phone':
      validateInput( { regularExpresion: phone, input: target, targetName } );
      break;
  
    default:
      break;
  }
}

// fn que valida los inputs del formulario
function validateInput({ regularExpresion, input, targetName }){

  if( regularExpresion.test( input.value ) ){
    d.getElementById(`${ targetName }-container`).classList.remove('form__container-danger');
    d.getElementById(`${ targetName }-container`).classList.add('form__container-success');
    d.querySelector(`#${ targetName }-container ion-icon`).setAttribute('name','checkmark-outline');
    d.querySelector(`#${ targetName }-container .form__input-error`).classList.remove('form__input-error--active');
    inputsObject[targetName] = true;
  }else {
    d.getElementById(`${ targetName}-container`).classList.add('form__container-danger');
    d.getElementById(`${ targetName}-container`).classList.remove('form__container-success');
    d.querySelector(`#${ targetName }-container ion-icon`).setAttribute('name','close-outline');
    d.querySelector(`#${ targetName }-container .form__input-error`).classList.add('form__input-error--active');
    inputsObject[targetName] = false;
  }
}

// fn que válida que las contraseñas sean iguales
const validatePasswords = () => {

  const inputPassword1 = d.getElementById('password').value,
        inputPassword2 = d.getElementById('password2').value;

  // 
  if( inputPassword1 !== inputPassword2 || !inputPassword2.match( expresions.password )){
    d.getElementById('password2-container').classList.add('form__container-danger');
    d.getElementById('password2-container').classList.remove('form__container-success');
    d.querySelector('#password2-container ion-icon').setAttribute('name','close-outline');
    d.querySelector('#password2-container .form__input-error').classList.add('form__input-error--active');
    inputsObject['password'] = false;
  }else {
    d.getElementById('password2-container').classList.remove('form__container-danger');
    d.getElementById('password2-container').classList.add('form__container-success');
    d.querySelector('#password2-container ion-icon').setAttribute('name','checkmark-outline');
    d.querySelector('#password2-container .form__input-error').classList.remove('form__input-error--active');
    inputsObject['password'] = true;
  }    

}

// fn que válida el formulario
const formValidation = () => {

  const $terms = d.getElementById('terms');

  const { user, password, name, email, phone } = inputsObject;

  if( user && password && name && email && phone && $terms.checked ){
    $form.reset();
    // d.location.reload();

    d.getElementById('form__success').classList.add('form__success--active');
    
    setTimeout( () => {
      d.getElementById('form__success').classList.remove('form__success--active');

    }, 3000);

    deleteIconSuccess();
    
  }else {

    d.getElementById('form__warning').classList.add('form__warning--active');
    
    setTimeout( () => {
      d.getElementById('form__warning').classList.remove('form__warning--active');
    }, 2000);
  }
}

// fn que borra los iconos de exito al enviar formulario
const deleteIconSuccess = () => {

  const $allContainerSuccess = d.querySelectorAll(".form__container-success");

  $allContainerSuccess.forEach(( iconSuccess ) => {
    iconSuccess.classList.remove('form__container-success');
  });
};

// EVENTOS
$inputs.forEach( input => {
  input.addEventListener('keyup', validateForm);
  input.addEventListener('blur', validateForm);
})

$form.addEventListener('submit', (e) => {

  e.preventDefault();

  formValidation();
});


