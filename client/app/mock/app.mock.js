import angular from 'angular';
import angularMocks from 'angular-mocks';
import appModule from '../app';
import storageService from './storage.service';
import usuariosMock from './usuarios/usuarios';
import carrinhoMock from './carrinho/carrinho';
import menuMock from './menu/menu';

let appMockModule = angular.module('appMock', [
  appModule,
  'ngMockE2E'
])

.service('StorageService', storageService)

.run(usuariosMock)
.run(menuMock)
.run(carrinhoMock)

.name;

export default appMockModule;