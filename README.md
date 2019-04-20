# inlineTable
Tabela com edição em lina - Grid

# Início
Depende das bibliotecas FontAwsome, Bootstrap e Jquery:
### JQuery
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
```

### Bootstrap
```html
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
```
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
```

### FontAwsome
```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css"crossorigin="anonymous">
```
```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/fontawesome.css" crossorigin="anonymous">
```

### Chamada

#### HTML
```html
<div id="inlinetable"></div>
```

#### Javascript
```javascript
  $( document ).ready(function() {
    $("#inlinetable").inlineTable({
			theme: '',
			language: 'en-US',
			tabHeader: [
			{
				columnName: 'ColunaA',
				columnTitle: 'Coluna A',
				type: 'number',
				mandatory: true,
				databaseKey: true
			},{
				columnName: 'ColunaC',
				columnTitle: 'Coluna C',
				type: 'select',
				mandatory: true,
				databaseKey: false,
				selectData: [{'value':'1','description':'texto 1', 'default':'S'},{'value':'2','description':'texto 2', 'default':'N'},{'value':'3','description':'texto 3', 'default':'N'},{'value':'4','description':'texto 4', 'default':'N'},{'value':'5','description':'texto 5', 'default':'N'}]
			}],
      data:[
				{'ColunaA':'valor a','ColunaB':'valor b','ColunaC':'valor c','ColunaD':'valor d','ColunaE':'valor e','ColunaF':'valor f'},
				{'ColunaA':'valor h','ColunaB':'valor i','ColunaC':'valor j','ColunaD':'valor k','ColunaE':'valor l','ColunaF':'valor m'}
			],
      onDelete: function(retDel){
				console.log(retDel);
			},
			onEdit: function(retEdit){
				console.log(retEdit);
			},
			onInsert: function(retEdit){
				console.log(retEdit);
			}
    });
	});
```

### Parametros
1. **language:** Selecione a linguagem de sua preferência (pt-BR - Português Brasil | en-US - Inglês)
2. **theme:** Dois temas disponível: Claro (default, basta passar '') e Escuro (valor: 'dark').
3. tabHeader: Cabeçalho das colunas da tabela e seus devidos valores:
   1. **columName:** Nome da Coluna (Necessário ser sem espaços)
   2. **columnTitle:** Título a coluna (Aparecerá no cabeçaho das colunas)
   3. **type:** Tipo dos campos que serão abertos:
      1. **text:** Abrirá um input texto
      2. **select:** abrirá uma caixa de seleção
      3. **selectData:** Valores para o campo to tipo select.
      Para montagem do select deve-se passar um objeto com as seguintes informações:
        1. **value:** Valor do option do select
        2. **description:** Descrição da opção
   4. **mandatory:** define se o campo deve ser obrigatório na edição, valores válidos: (true = Obrigatório | false: Não obrigatório)
   5. **databaseKey:** serve para identificar se faz parte da chave na tabela do banco de dados, para auxiliar nas requisições ajax, valores válidos: (true = Retorna 'S' | false: Retorna 'N')
4. **data:** Valores para montagem da tabela, devem estar dentro de um objeto
  1. [{'column':'value'}] onde:
      1. **column:** deve ser o mesmso columnTitle definido no cabeçalho
      2. **value:** valor a ser apresentado nas linhas da coluna especificada
5. **Método onDelete:** Ao clicar no ícone "lixeira", a linha específica será excluída e retorna um objeto com as informações:
  1. **colname:** Mesma informação columnName do tabHeader
  2. **dbkey:** Define se o campo é chave do banco de dados ('S' ou 'N')
  3. **value:** Valor do campo 
6. **Método onEdit:** Ao clicar no ícone "editar", serão abertos todos os campos da linha com formulário para edição. Será retornado o objeto abaixo (Atenção, para retorno é necessário passar por todos os campos da linha para que a api resgate os valores em array):
  1. **colname:** Mesma informação columnName do tabHeader
  2. **dbkey:** Define se o campo é chave do banco de dados ('S' ou 'N')
  3. **value:** Valor do campo
  4. **action:** Retorna 'I' (inserção) ou 'U' (update)
6. **Método onInsert:** Ao clicar no ícone "sinal de mais", será inserida uma linha na tabela, para preenchimento das informações é necessário clicar no ícone "edit". (Atenção, para retorno é necessário passar por todos os campos da linha para que a api resgate os valores em array):
  1. **colname:** Mesma informação columnName do tabHeader
  2. **dbkey:** Define se o campo é chave do banco de dados ('S' ou 'N')
  3. **value:** Valor do campo
  4. **action:** Retorna 'I' (inserção) ou 'U' (update)
