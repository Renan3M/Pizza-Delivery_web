function MenuController($http, LoginService, $location, $anchorScroll) {
		this.update = false;
    this._loginService = LoginService;


		this.btnClicked = () => {
	
			var novaPizza = {
				  nome: this.nome,
        	descricao: this.descricao,
        	tipo: this.tipo,
          preco: this.preco,
        	imagem: this.img_src
			}
			
	if (novaPizza.nome != undefined && novaPizza.descricao != undefined && 
		novaPizza.tipo != undefined && novaPizza.preco > 0)	{
	  this.update = true;
	  $http.post('/api/menu', novaPizza).then((response)=>{console.log(response); this.update = false;});
  	this.showAlert('Pizza adicionada', 'success', 9000); 

	}
  }

  this.onListChange = ($event) => {
  	this.update = true;
  	$http.put('/api/menu/'+$event.id, $event).then((response)=>{console.log(response); this.update = false;});
  }

  this.onItemRemove = ($event) => {
  	this.update = true;
  	$http.delete('/api/menu/'+$event.id).then((response)=>{console.log(response); this.update = false;});
  	
  	this.showAlert('Pizza removida', 'danger', 9000); 
  }

  this.showAlert = function (message, type, tempo) { 
	this.alertMsg = { text: message, type: type, tempo: tempo }; 
  }

  this.ifAdm = () => {
    if (this._loginService.logginType == "adm") {
      return true;
    } else {
      return false
    }
  }
  this.scrollTo = function(id){ // 2 serviços injetados só para fazer uma âncora... 
    $location.hash(id);
    $anchorScroll();
  } 	
}

MenuController.$inject = ['$http', 'LoginService', '$location', '$anchorScroll'];
export default MenuController;