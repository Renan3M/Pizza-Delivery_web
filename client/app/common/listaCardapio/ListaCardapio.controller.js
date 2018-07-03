class ListapizzasController {

  constructor($log, menuService, LoginService, $uibModal, $http, $state) {  
this._log = $log;
this.showList = true;
this._menuService = menuService;
this._loginService = LoginService;
this.$uibModal = $uibModal;
this._http = $http;
this._state = $state;
}

 buyPizza = (pizza) => {
  console.log("I am buying this pizza "+pizza);
  if (!this.ifAdm()) {
  this.abrirModal(pizza);
  }
 }

 abrirModal = (pizza) => {
  this._pizza = pizza;
    var modalInstance = this.$uibModal.open({
      animation: true,
      component: 'comprarPizza',
      resolve: {
        pizzaEscolhida: () => {
          return this._pizza;
        }
      }
    });

    modalInstance.result // Promesa de retorno do resultado do modal
    .then( (pedido) => this.concluirCompra(pedido) )
    .catch ( () => this._log.info('comprar-pizza dismissed at: ' + new Date()));
  }

 concluirCompra = (pedido) => {
  console.log(pedido); // Adiciona a nossa lista de compras. Componente carrinho de compras
  // terá um serviço que carregará essa lista e aqui injetariamos tal serviço e adicionariamos
  // à lista.
  this._http.post('/api/carrinho', pedido).then((response)=>{ console.log("Api carrinho:"+response);
                this._state.go('carrinho');
                });

 showAlert('Sua compra foi adicionada ao carrinho', 'success', 9000);
 }

  showAlert = function (message, type, tempo) { 
    this.alertMsg = { text: message, type: type, tempo: tempo }; 
  }

 RemoverPizza = (pizza) => {
  this.remove({$event: pizza});
}

 EditarPizza = (pizza) => {
    this._log.info(pizza);
    this.showList = false;
    this.pizza = pizza;

    this.novoNome = pizza.nome;
    this.novaDescricao = pizza.descricao;
    this.novaImg_src = pizza.imagem;
    this.novoTipo = pizza.tipo;
    this.novoPreco = pizza.preco;

 }

 AtualizarPizza = () => {

    if (this.novoNome == null) {this.novoNome = this.pizza.nome;}
    if (this.novaDescricao == null) {this.novaDescricao = this.pizza.descricao;}
    if (this.novaImg_src == null) {this.novaImg_src = this.pizza.imagem;}
    if (this.novoTipo == null) {this.novoTipo = this.pizza.tipo;}
    if (this.novoPreco == null) {this.novoPreco = this.pizza.preco;}

  var novaPizza = {
        nome: this.novoNome,
        descricao: this.novaDescricao,
        tipo: this.novoTipo,
        imagem: this.novaImg_src,
        preco: this.novoPreco,
        id: this.pizza.id
      }

  this.pizza = null; // No reason to keep in memory
  this.showList = true;
  this.save({$event: novaPizza});
 }

 UpdateList = () => {

    let promisse = this._menuService
  .getListPromisse();
    promisse.then((response)=>{ console.log(response);
                this.listaCardapio = response.data;
                } 
              );
}

 ifAdm = () => { // Em vez de repitir esse codigo, devia injetar o serviço login no serviço  
                  // menu e criar esse método no mesmo, quando precisar dele basta invoca-lo 
                   // chamando a função do serviço menu. (Farei isso qndo tiver tempo sobrando)
    if (this._loginService.logginType == "adm"){
      return true;
    } else {
      return false
    }
  } 

$onChanges (changedObjs) {

	if (changedObjs.update) {
		this.UpdateList();
	}
 }
}

ListapizzasController.$inject = ['$log','menuService', 'LoginService', '$uibModal', '$http','$state'];

export default ListapizzasController;
