import angular from 'angular';
import alertComponent from './alert.component';

let alertModule = angular.module('alert', [
])

.component('alert', alertComponent)

.name;

export default alertModule;
