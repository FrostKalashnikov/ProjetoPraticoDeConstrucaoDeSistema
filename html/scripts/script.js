const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfimation = document.getElementById("password-confirmation");


form.addEventListener("submit", (event) => {

event.preventDefault();
checkform();

})

function checkInputUsername(){

    const usernameValue = username.value;
    
    if(usernameValue ===""){
     errorInput(username, "Preencha esse karalho")}
     else{
        const formItem = username.parentElement;
        formItem.className = "form-content"
     }
}
function checkInputEmail(){
 const emailValue = email.value;

 if(emailValue === ""){
   errorInput(email, "DIGITA O EMAIL ANIMAL")
 }else{
    const formItem = email.parentElement;
    formItem.className = "form-content"

 }
}
function checkInputPassword(){
const passwordValue = password.value;
if(passwordValue === ""){
    errorInput(password, "A senha porra")
}else if(passwordValue.length <8){
    errorInput(password, "Digite mais de 8 caracteres... isso é uma ameaça")

}else{
    const formItem = password.parentElement;
    formItem.className = "form-content"
}

}
function checkInputPasswordConfirmation(){
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfimation.value;
    if( confirmationPasswordValue=== ""){
        errorInput(confirmationPasswordValue, "A confirmação é necessária.")
    }else if(confirmationPasswordValue !== passwordValue){
        errorInput(passwordConfimation, "As senhas não são iguais")
    }else{
        const formItem = passwordConfimation.parentElement;
        formItem.className = "form-content"
    }

    }
function checkform(){
checkInputUsername();
checkInputEmail();
checkInputPassword();
checkInputPasswordConfirmation();

const formItems = form.querySelectorAll(".form-content")

const isValid = [...formItems].every ((item) =>{
    return item.className === "form-content"
});
if(isValid){
    alert("CADASTRADO COM SUCESSO")
}
}    
    
    


function errorInput(input, message){
const formItem = input.parentElement;
const textMessage = formItem.querySelector("a")

textMessage.innerText = message;

formItem.className = "form-content error"

}
