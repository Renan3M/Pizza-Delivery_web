class MenuService {
	constructor($http) {
	this.http = $http;
	}

error = () => {}

getListPromisse = () => {

return this.http.get('/api/menu');
}

}

MenuService.$inject = ['$http'];

export default MenuService;