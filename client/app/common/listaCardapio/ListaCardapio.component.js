import template from './ListaCardapio.html';
import controller from './ListaCardapio.controller';
import './ListaCardapio.scss';

let ListaCardapioComponent = {
  restrict: 'E',
  bindings: {
  	update: '<',
  	save: '&',
  	remove: '&'
  },
  transclude: true,
  template,
  controller
};

export default ListaCardapioComponent;
