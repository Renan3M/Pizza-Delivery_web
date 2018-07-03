import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sobreComponent from './sobre.component';
import sobreService from './sobre.service';


let sobreModule = angular.module('sobre', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('sobre', {
      url: '/sobre',
      component: 'sobre'
    });
})

.service('sobreService', sobreService)
.component('sobre', sobreComponent)
  
.name;

export default sobreModule;
