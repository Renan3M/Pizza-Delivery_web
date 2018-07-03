function ComprarPizzaController () {

  this.btnAdicionalClicked = false;
  this.adicionais = [];

  this.$onInit = function () {
    this.pizza = angular.copy(this.resolve.pizzaEscolhida);
    console.log(this.pizza);
  };

  this.ok = function () {

    this.adicionais.push(this.adicional_value1); this.adicionais.push(this.adicional_value2); 
    this.adicionais.push(this.adicional_value3); this.adicionais.push(this.adicional_value4);  
    this.adicionais.push(this.adicional_value5); this.adicionais.push(this.adicional_value6); 

    for (var i = 0; i < this.adicionais.length; i++) {
      if(this.adicionais[i] == undefined){this.adicionais.splice(i,i+1);}
    }

  console.log(this.adicionais);
    this.pizza.adicionais = this.adicionais;
    this.close({$value: this.pizza});

  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

  this.showAdicionais = () => {
    if (this.btnAdicionalClicked) { this.btnAdicionalClicked = false; return;}
    this.btnAdicionalClicked = true;
  }
}

export default ComprarPizzaController;