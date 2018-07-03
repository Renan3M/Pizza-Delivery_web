import template from './ComprarPizza.html';
import controller from './ComprarPizza.controller';
import './ComprarPizza.scss';

let ComprarPizzaComponent = {
  restrict: 'E',
  bindings: {
  	resolve: '<',
    close: '&',
    dismiss: '&'
  },
  transclude: true,
  template,
  controller
};

export default ComprarPizzaComponent;
