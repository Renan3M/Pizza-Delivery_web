import angular from 'angular';
import sobreModule from './sobre/sobre';
import loginModule from './login/login';
import menuModule from './menu/menu';
import carrinhoModule from './carrinho/carrinho';

let componentModule = angular.module('app.components', [
  sobreModule,
  loginModule,
  menuModule,
  carrinhoModule
])

.name;

export default componentModule;