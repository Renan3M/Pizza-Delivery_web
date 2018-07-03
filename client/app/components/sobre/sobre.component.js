import template from './sobre.html'; // !text é um artifício do systemjs no plunker para carregar html
import controller from './sobre.controller';
import './sobre.scss'; // !css é um artifício do systemjs no plunker para carregar arquivos css ou scss ou sass

let sobreComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default sobreComponent;
