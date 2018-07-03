import angular from 'angular';
import uiRouter from 'angular-ui-router';
import menuComponent from './menu.component';
import menuService from './menu.service';

let menuModule = angular.module('menu', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";


  $stateProvider
    .state('menu', {
      url: '/menu',
      component: 'menu'
    });
})
.service('menuService', menuService)
.component('menu', menuComponent)
  
.name;

export default menuModule;