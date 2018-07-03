import './common.scss'; //css comum a todas as views comuns
import angular from 'angular';
import navbarModule from './navbar/navbar';
import footerModule from './footer/footer';
import listaCardapioModule from './listaCardapio/ListaCardapio';
import comprarPizzaModule from './comprarPizza/ComprarPizza';
import alertModule from './alert/alert';

let commonModule = angular.module('app.common', [
  navbarModule,
  footerModule,
  listaCardapioModule,
  alertModule,
  comprarPizzaModule
])

.name;

export default commonModule;
