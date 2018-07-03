import angular from 'angular';
import _menu from './menu-data';

function menuMock($httpBackend, $log, storage) {


  let menu = storage.load('menu', _menu); // Vai tentar carregar um novo se disponivel, caso não haja pega o nosso.
  let _id = storage.load('menu-index', _menu.length+1);
  let _log = $log;

	$httpBackend.whenGET('/api/menu').respond( () => {
		console.log(menu);

    	return [200, menu, {}];
  });

    $httpBackend.whenPOST('/api/menu').respond( (method, url, data) => {

		let _data = JSON.parse(data);
		_data.id = _id++;
	    menu.push(_data);
	    storage.save('menu', menu);
	    storage.save('menu-index', _id);

	   	console.log('inserido com sucesso' + _data);
	    return [200, menu, {}];

    });

$httpBackend.whenRoute('PUT','/api/menu/:id').respond(function(method, url, data, headers, params) {
    console.log('Dados recebidos: ' + data +', '+ params.id);
    let id = params.id;
    let _data = JSON.parse(data);

    if (url === '/api/menu') {// atualiza toda a coleção
      menu = _data;
    } else { //atualiza um item da coleção

/*			  nome: this.nome,
          descricao: this.descricao,
          tipo: this.tipo,
          imagem: this.img_src,
          preco: this.preco */

      for(let i=0; i<menu.length; i++) {
        if(menu[i].id == id){
          menu[i].nome = _data.nome;
          menu[i].descricao = _data.descricao;
          menu[i].tipo = _data.tipo;
          menu[i].preco = _data.preco;
          menu[i].imagem = _data.imagem;

          break;
        }
      }
    }
    storage.save('menu', menu);
    return [200, menu, {}];
  });

    $httpBackend.whenRoute('DELETE','/api/menu/:id').respond(function(method, url, data, headers, params) {
     console.log('Funcao delete');
     let id = params.id;
   
      for(let i=0; i<menu.length; i++) {
        if(menu[i].id == id){
          menu.splice(i, 1);

          storage.save('menu', menu);
          storage.save('menu-index', --_id);
          console.log('Deletado com sucesso');
          break;
        }
      }

     return [200, {item1:'dados', item2:550}, {}, "TUDO OK."];
   });
 
}

menuMock.$inject = ['$httpBackend','$log','StorageService'];

export default menuMock;
