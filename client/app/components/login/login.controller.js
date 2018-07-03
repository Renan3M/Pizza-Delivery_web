import $ from 'jquery';

function LoginController (LoginService, $http, $state){ 


$('.message a').click(function()
{
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

this.listaUsuarios = [];

this._loginService = LoginService;

this.loginEval = () => {

    if (this.user == "adm" && this.password == "123") {
        this._loginService.logginType = 'adm'; // Não é uma boa prática, mas é a mais simples.
        this.showAlert('Bem vindo administrador!', 'success', 9000);
        this._loginService.userLogged = {}; // Adm não precisa
        $state.go('menu'); 
    } else{

    this._loginService.getListPromisse().then((response)=>{console.log(response); 
        this.listaUsuarios = response.data;

        console.log(this.listaUsuarios.length);
        for(let i = 0; i<this.listaUsuarios.length; i++){
            if (this.listaUsuarios[i].username == this.user && this.listaUsuarios[i].password == this.password) {
                this._loginService.logginType = 'client'; // Mesma coisa.
                this._loginService.userLogged = this.listaUsuarios[i];
                console.log("lg controler: "+this._loginService.userLogged.username);
          //      this.showAlert('Bem vindo '+this.listaUsuarios.username+"!", 'success', 9000); 
                $state.go('menu');
            }
        }
    });

}
}

 this.showAlert = function (message, type, tempo) { 
    this.alertMsg = { text: message, type: type, tempo: tempo }; 
  }

window.onSignIn = (response) => { 
    console.log("foo");
            // Conseguindo as informações do seu usuário:
            let perfil = response.getBasicProfile();
 
            // Conseguindo o ID do Usuário
            let userID = perfil.getId();
 
            // Conseguindo o Nome do Usuário
            let userName = perfil.getName(); // username:
 
            // Conseguindo o E-mail do Usuário
            let userEmail = perfil.getEmail(); // email:
 
            // Conseguindo a URL da Foto do Perfil
            let userPicture = perfil.getImageUrl();
 
            document.getElementById('user-photo').src = userPicture;
            document.getElementById('user-name').innerText = userName;
            document.getElementById('user-email').innerText = userEmail;
 
            // Recebendo o TOKEN que você usará nas demais requisições à API:
            let LoR = response.getAuthResponse().id_token;
            console.log("~ le Tolkien: " + LoR);

            for(let i = 0; i<this.listaUsuarios.length; i++){
            if (this.listaUsuarios[i].username == userName && 
                this.listaUsuarios[i].email == userEmail) {

                this._loginService.logginType = 'client'; 
                this._loginService.userLogged = this.listaUsuarios[i];
                $state.go('menu');
                return;
        }} 
            let newUser = {
                username: userName,
                email: userEmail,
                endereco: "undefined",
                telefone: "undefined",
                password: "undefined"
            }
            $http.post('/api/usuarios', newUser).then((response)=>{console.log(response);});
            $state.go('menu');
        };


        this.createAccount = () => {

            if (this.newUser == undefined || this.newEmail == undefined || this.newStreet == undefined || 
                this.newReferencePoint == undefined || this.newCity == undefined || this.newUF == undefined ||
                this.newTelephone == undefined || this.newPassword == undefined) {
                console.log("informações faltando");
                this.showAlert('informações faltando!', 'danger', 9000); 

                return;
            }
            if (this.newTelephone < 1000000000 || this.newTelephone > 10000000000) {
                this.showAlert('O telefone deve ser DD + numero, ex: 2122543625', 'danger', 9000); 

                return;
            }

            let newUser = {
                username: this.newUser,
                email: this.newEmail,
                endereco: this.newUF+", "+this.newCity +", "+this.newStreet +", "+this.newReferencePoint+".",
                telefone: this.newTelephone,
                password: this.newPassword
            }

            $http.post('/api/usuarios', newUser).then((response)=>{console.log(response);});
            this.showAlert('Usuário adicionado com sucesso!', 'success', 9000);
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow"); 

        }
  
}

  LoginController.$inject = ['LoginService', '$http', '$state'];
  export default LoginController;