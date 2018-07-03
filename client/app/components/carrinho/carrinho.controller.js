function carrinhoControler($http, LoginService) {

$http.get('/api/carrinho').then((response)=>{ console.log(response);
                this.nossasPizzas = response.data;
                } 
              );

console.log("carrinho controler: "+LoginService.userLogged.username);

this.username = LoginService.userLogged.username;

this.userOnline = () => { // Muito feio mas cumpre o trabalho
	if (this.username == null) { return false;}
	else return true;
}

}

export default carrinhoControler;