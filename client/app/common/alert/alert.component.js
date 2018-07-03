import template from './alert.html';
import controller from './alert.controller';
import './alert.scss';

let alertComponent = {
  bindings: {
  	message: '<'
  },
  template,
  controller
};

export default alertComponent;
