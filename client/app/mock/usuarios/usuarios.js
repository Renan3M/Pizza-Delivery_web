import angular from 'angular';
import _usuarios from './usuarios-data';

function UsuariosMock($httpBackend, $log, storage) {

 let usuarios = storage.load('usuarios', _usuarios); // Vai tentar carregar um novo se disponivel, caso não haja pega o nosso.
  let _id = storage.load('usuarios-index', _usuarios.length+1);
  let _log = $log;

	$httpBackend.whenGET('/api/usuarios').respond( () => {
		console.log(usuarios);

    	return [200, usuarios, {}];
  });

    $httpBackend.whenPOST('/api/usuarios').respond( (method, url, data) => {

		let _data = JSON.parse(data);
		_data.id = _id++;
	    usuarios.push(_data);
	    storage.save('usuarios', usuarios);
	    storage.save('usuarios-index', _id);

	   	console.log('inserido com sucesso' + _data);
	   	console.log(usuarios);
	    return [200, usuarios, {}];

    });

$httpBackend.whenRoute('PUT','/api/usuarios/:id').respond(function(method, url, data, headers, params) {
    console.log('Dados recebidos: ' + data +', '+ params.id);
    let id = params.id;
    let _data = JSON.parse(data);

    if (url === '/api/usuarios') {// atualiza toda a coleção
      usuarios = _data;
    } else { //atualiza um item da coleção

      for(let i=0; i<usuarios.length; i++) {
        if(usuarios[i].id == id){
          usuarios[i].username = _data.username;
          usuarios[i].email = _data.email;
          usuarios[i].endereco = _data.endereco;
          usuarios[i].telefone = _data.telefone;
          usuarios[i].password = _data.password;

          break;
        }
      }
    }
    storage.save('usuarios', usuarios);
    return [200, usuarios, {}];
  });

    $httpBackend.whenRoute('DELETE','/api/usuarios/:id').respond(function(method, url, data, headers, params) {
     console.log('Funcao delete');
     let id = params.id;
   
      for(let i=0; i<usuarios.length; i++) {
        if(usuarios[i].id == id){
          usuarios.splice(i, 1);

          storage.save('usuarios', usuarios);
          storage.save('usuarios-index', --_id);
          console.log('Deletado com sucesso');
          break;
        }
      }

     return [200, {item1:'dados', item2:550}, {}, "TUDO OK."];
   });

}

UsuariosMock.$inject = ['$httpBackend','$log', 'StorageService'];

export default UsuariosMock;
