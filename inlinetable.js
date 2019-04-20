(function($) {
	
	$.fn.inlineTable = function(options) {

		var defaultRoles = $.extend({
				defaultDiv : $(this).attr('id'),
				defaultClass :'table',
				defaulClassTh: 'inline-th',
				defaultClassTd: 'inline-td', 
				scopeTh: 'col',
				scopeTr: 'row',
				data: '',
				language: 'pt-BR',
				theme: '',
				retDel: '',
				retIns: '',
				selectValues: new Object(),
				selectData: '',
				tableData: new Object(),
				onDelete : function(retDel) {return},
				onInsert : function(retIns) {return},
				onEdit : function(retEdit) {return}
		}, options);

		
		var initialTable = '<table class="table '+(defaultRoles.theme == 'dark' ? 'table-dark' : '')+'"><thead class="inline-head"><tr>';
		var tableHeader = null;
		var i = 0;
		var cdt = 0;
		var cdta = 0;
		var idt = 0;
		var col = '';
		var updateQtCols = 1;
		var qtCols = defaultRoles.tabHeader.length;
		var actionTitle = (defaultRoles.language == 'pt-BR' ? 'Ação' : 'Action');
		initialTable += '<th class="inline-th" scope="'+defaultRoles.scopeTh+'">'+actionTitle+'</th>';
		$.each(defaultRoles.tabHeader, function(){
			if(defaultRoles.tabHeader[i]['type'] == 'select'){
				defaultRoles.selectValues[defaultRoles.tabHeader[i]['columnName']] =  defaultRoles.tabHeader[i]['selectData'];
			}
			initialTable += '<th class="inline-th" scope="'+defaultRoles.scopeTh+'" id="'+defaultRoles.tabHeader[i]['columnName']+'">'+defaultRoles.tabHeader[i]['columnTitle']+'</th>';
			i++;
		});
		initialTable += '<th class="inline-th" scope="'+defaultRoles.scopeTh+'">'+actionTitle+'</th>';
		initialTable += '</tr>';
		
		if(defaultRoles.data){					
			$.each(defaultRoles.data, function(){	
				initialTable += '<tr class="inline-edit" scope="'+defaultRoles.scopeTr+'">';
				initialTable += '<td>';		
				initialTable += ' <button type="button" class="btn btn-success btn-sm add-row"><span style="font-size: 1rem;"><span style="color: white;"><i class="fas fa-plus"></i></span></button>';
				initialTable += '    <button type="button" class="btn btn-primary btn-sm edit-row"><span style="color: white;"><i class="fas fa-edit"></i></span></span></button> ';
				initialTable += '    <button type="button" class="btn btn-danger btn-sm delete-row"><span style="color: white;"><i class="fas fa-trash-alt"></i></span></span></button>';
				initialTable += '</td>';
				$.each(defaultRoles.tabHeader, function(){
					col = defaultRoles.tabHeader[cdta]['columnName'];						
					initialTable += '<td class="inline-inp" data-change="N" data-action="U" data-inpType="'+defaultRoles.tabHeader[cdta]['type']+'" data-colname="'+col+'" data-title="'+defaultRoles.tabHeader[cdta]['columnTitle']+'" data-mandatory="'+(defaultRoles.tabHeader[cdta]['mandatory'] == true ? 'S' : 'N')+'" data-value="'+defaultRoles.data[idt][col]+'" data-dbkey="'+(defaultRoles.tabHeader[cdta]['databaseKey'] == true ? 'S' : 'N')+'"  scope="'+defaultRoles.scopeTh+'">'+defaultRoles.data[idt][col]+'</td>';
					cdta++;
				});
				idt++;				
				initialTable += '<td>';		
				initialTable += ' <button type="button" class="btn btn-success btn-sm  add-row"><span style="font-size: 1rem;"><span style="color: white;"><i class="fas fa-plus"></i></span></button>';
				initialTable += '    <button type="button" class="btn btn-primary btn-sm edit-row"><span style="color: white;"><i class="fas fa-edit"></i></span></span></button> ';
				initialTable += '    <button type="button" class="btn btn-danger btn-sm delete-row"><span style="color: white;"><i class="fas fa-trash-alt"></i></span></span></button>';
				initialTable += '</td>';
				initialTable += '</tr>';
				cdta = 0;
			});						
		}
		
		$(document).on('blur', '.inline-field', function(){			
			if($(this).parent().parent().parent().attr('data-mandatory') == 'S' && $(this).val() != ''){
				$(this).parent().parent().parent().attr('data-value',$(this).val());
				$(this).parent().parent().parent().attr('data-change','N');
				$(this).parent().parent().parent().attr('data-action','U');
				$(this).parent().parent().parent().attr('data-type',$(this).attr('data-type'));
				$(this).parent().parent().parent().html($(this).val());
				defaultRoles.tableData['action'] = $(this).attr('data-action');
				defaultRoles.tableData[updateQtCols] = { 				
					colname : $(this).attr('data-colname'),
					dbkey : $(this).attr('data-dbkey'),
					value : $(this).val()
				}
				if(updateQtCols == qtCols){
					if(defaultRoles.tableData['action'] == 'I'){
						defaultRoles.onInsert(defaultRoles.tableData);						
					}else{
						defaultRoles.onEdit(defaultRoles.tableData);	
					}
					updateQtCols = 1;
				}else{
					updateQtCols++;
				}
			}else{
				$(this).addClass('is-invalid');
				$(this).focus();
			}
		});
		
		$(document).on('click', '.add-row', function(){
			
				var addRow = ''
				var field = '';
				cdt = 0;
				addRow += '<tr class="inline-edit" scope="'+defaultRoles.scopeTr+'">';
				addRow += '<td>';		
				addRow += ' <button type="button" class="btn btn-success btn-sm add-row"><span style="font-size: 1rem;"><span style="color: white;"><i class="fas fa-plus"></i></span></button>';
				addRow += '    <button type="button" class="btn btn-primary btn-sm edit-row"><span style="color: white;"><i class="fas fa-edit"></i></span></span></button> ';
				addRow += '    <button type="button" class="btn btn-danger btn-sm delete-row"><span style="color: white;"><i class="fas fa-trash-alt"></i></span></span></button>';
				addRow += '</td>';		
				$.each(defaultRoles.tabHeader, function(){
					col = defaultRoles.tabHeader[cdt]['columnName'];					
					addRow += '<td class="inline-inp" data-action="I" data-change="N" data-colname="'+col+'" data-inpType="'+defaultRoles.tabHeader[cdt]['type']+'" data-title="'+defaultRoles.tabHeader[cdt]['columnTitle']+'" data-mandatory="'+(defaultRoles.tabHeader[cdt]['mandatory'] == true ? 'S' : 'N')+'" data-value="" data-dbkey="'+(defaultRoles.tabHeader[cdt]['databaseKey'] == true ? 'S' : 'N')+'"  scope="'+defaultRoles.scopeTh+'"></td>';
					cdt++;
				});
				addRow += '<td>';		
				addRow += ' <button type="button" class="btn btn-success btn-sm add-row"><span style="font-size: 1rem;"><span style="color: white;"><i class="fas fa-plus"></i></span></button>';
				addRow += '    <button type="button" class="btn btn-primary btn-sm edit-row"><span style="color: white;"><i class="fas fa-edit"></i></span></span></button> ';
				addRow += '    <button type="button" class="btn btn-danger btn-sm delete-row"><span style="color: white;"><i class="fas fa-trash-alt"></i></span></span></button>';
				addRow += '</td>';
				addRow += '</tr>';
				cdta++;
				$(".inline-head").append(addRow);
				
		});
		
		$(document).on('click', '.delete-row', function(){
			var itrash = 0;
			var retData = new Object();
			var component;
			var parentTr;
			$.each($(this).parent().parent().find('.inline-inp'), function(){
				component = $(this);
				retData[itrash] =  
					{
						colname : component.attr('data-colname'),
						dbkey : component.attr('data-dbkey'),
						value : component.attr('data-value')
					};
				itrash++;
				parentTr = $(this).parent();
			});
			defaultRoles.onDelete(retData);
			parentTr.remove();
		});
		
		$(document).on('click','.edit-row', function(){
			updateQtCols = 1;
			$.each($(this).parent().parent().find('.inline-inp'), function(){
				var field = '';
				if( $(this).attr('data-change') == 'N' ){
					$(this).attr('data-change','S');
					if($(this).attr('data-inpType') == 'select'){
						field = selectCreator(defaultRoles['selectValues'][$(this).attr('data-colname')],$(this).attr('data-dbkey'),$(this).attr('data-mandatory'),"S",$(this).attr('data-colname'),$(this).attr('data-action'), $(this).attr('data-type'));
					}else{						
						field = inputCreator($(this).attr('data-value'),$(this).attr('data-dbkey'),$(this).attr('data-mandatory'),"S", $(this).attr('data-colname'),$(this).attr('data-action'), $(this).attr('data-type'));
					}	
					$(this).html(field);
					field = '';
				}
			});
		});
		
		function selectCreator(data,dbkey,mandatory,change,colname,action,type){
			var selectField = '<div class="form-group"><label></label>';
			
			selectField += '<div id="input-group-prepend"><select  class="custom-select custom-select-sm inline-field"';
			selectField += ' data-change="'+change+'"';
			selectField += ' data-mandatory="'+mandatory+'"';
			selectField += ' data-dbkey="'+dbkey+'"';
			selectField += ' data-colname="'+colname+'"';
			selectField += ' data-action="'+action+'"';
			selectField += ' data-type="'+type+'"';
			selectField += '>';
			
			var selected;
			var hasSelected = false;
			$.each(data, function (key, entry) {
				if(entry.default == 'S'){
					selected = 'selected="true"';
					hasSelected = true;
				}else{
					selected = '';
				}
				selectField += '<option "'+selected+'" value"'+entry.value+'">'+entry.description+'</option>';
			});
			if(hasSelected == false){
				selectField += '<option selected="true"></option>';
			}
			selectField += '</select>';
			return selectField;
		}
		
		function inputCreator(value,dbkey,mandatory,change,colname,action,type){
			var field = '';
			field += '<div class="form-group"><label></label>'
			field += '<div id="input-group-prepend"><input aria-describedby="inputGroup-sizing-sm" class="inline-field form-control input-group-sm mb-3"';
			field += 'data-mandatory="'+ mandatory+'"';
			field += 'data-dbkey="'+dbkey+'"';
			field += 'data-change="'+change+'"';
			field += 'data-colname="'+colname+'"';
			field += 'data-action="'+action+'"';
			field += 'data-type="'+type+'"';
			field += 'value="'+value+'" placeholder="'+colname+'"/>';
			field += '</div></div>';
			return field;
		}

		$('input').on('keyup',function(){
			$(this).parent().data('value',$(this).val());
		});

		initialTable += '</table>';
		return this.html(initialTable);
	}
	
}(jQuery));
