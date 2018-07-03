class LoginService {

constructor($http) {
	this.logginType = '';
	this.userLogged = {};
	this.http = $http;
}

getListPromisse = () => {

	return this.http.get('/api/usuarios');
  }
}

LoginService.$inject = ['$http'];

export default LoginService;