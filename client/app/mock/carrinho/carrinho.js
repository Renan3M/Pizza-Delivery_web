import angular from 'angular';
import _carrinho from './carrinho-data';

function carrinhoMock($httpBackend, $log, storage) {


  let carrinho = storage.load('carrinho', _carrinho); // Vai tentar carregar um novo se disponivel, caso não haja pega o nosso.
  let _id = storage.load('carrinho-index', _carrinho.length+1);
  let _log = $log;

	$httpBackend.whenGET('/api/carrinho').respond( () => {
		console.log(carrinho);

    	return [200, carrinho, {}];
  });

    $httpBackend.whenPOST('/api/carrinho').respond( (method, url, data) => {

		let _data = JSON.parse(data);
		_data.id = _id++;
	    carrinho.push(_data);
	    storage.save('carrinho', carrinho);
	    storage.save('carrinho-index', _id);

	   	console.log('inserido com sucesso' + _data);
	    return [200, carrinho, {}];

    });

$httpBackend.whenRoute('PUT','/api/carrinho/:id').respond(function(method, url, data, headers, params) {
    console.log('Dados recebidos: ' + data +', '+ params.id);
    let id = params.id;
    let _data = JSON.parse(data);

    if (url === '/api/carrinho') {// atualiza toda a coleção
      carrinho = _data;
    } else { //atualiza um item da coleção

/*			  nome: this.nome,
          descricao: this.descricao,
          tipo: this.tipo,
          imagem: this.img_src,
          preco: this.preco */

      for(let i=0; i<carrinho.length; i++) {
        if(carrinho[i].id == id){
          carrinho[i].nome = _data.nome;
          carrinho[i].descricao = _data.descricao;
          carrinho[i].tipo = _data.tipo;
          carrinho[i].preco = _data.preco;
          carrinho[i].quantidade = _data.quantidade;
          carrinho[i].observacoes = _data.observacoes;


          break;
        }
      }
    }
    storage.save('carrinho', carrinho);
    return [200, carrinho, {}];
  });

    $httpBackend.whenRoute('DELETE','/api/carrinho/:id').respond(function(method, url, data, headers, params) {
     console.log('Funcao delete');
     let id = params.id;
   
      for(let i=0; i<carrinho.length; i++) {
        if(carrinho[i].id == id){
          carrinho.splice(i, 1);

          storage.save('carrinho', carrinho);
          storage.save('carrinho-index', --_id);
          console.log('Deletado com sucesso');
          break;
        }
      }

     return [200, {item1:'dados', item2:550}, {}, "TUDO OK."];
   });
 
}

carrinhoMock.$inject = ['$httpBackend','$log','StorageService'];

export default carrinhoMock;
