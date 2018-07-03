import angular from 'angular';
import uiRouter from 'angular-ui-router';
import carrinhoComponent from './carrinho.component';

let carrinhoModule = angular.module('carrinho', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('carrinho', {
      url: '/carrinho',
      component: 'carrinho'
    });
})

.component('carrinho', carrinhoComponent)
  
.name;

export default carrinhoModule;
