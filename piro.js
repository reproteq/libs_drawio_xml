
/////////////// Plugin TT for PirotecnitaTomas  2019*/////////////////////////////////////////////////////////////////////////
/*
plugins para usar por url agregar al directorio y registrar en app.js  code >>> App.pluginRegistry=   pyro1:"/plugins/pyro1.js",pyro2:"/plugins/pyro2.js",
ruta para las librerias ejemplo 'Lib/baterias.xml para ello cro dir en ruta webapp
para crear una figura o stencil-shape es usar escala 10mm = 2px  , ejemplo bat75mm sera de 150px
<shape name="Bat75" h="150" w="15" aspect="variable" strokewidth="inherit">

solucion para reajustar contonrno shapes  es darle valor variable  y ajustar manualmente una vez creado editando darle medidas
que pusimos en la creacion del shape i guardar en la libreria, no olvidarnos de cambiar le el nombre en la libreria i darle atributos
tipos de atributos: Name,Disparos,Efecto,Cadencia,Cadencia

graph.getChildVertices(graph.getDefaultParent()); para no cojer flechas i otra
las figuras se intancian i pueden recoger atributos si estan selecionados ambos
click menu funcion 1 procesar , vacia array_name y empuja todos las figuas de pagina-actual dentro del array
click menu funcion 2  muestra cuantos names hay diferentes y que numero de ellos hay en el array-name de  pagina-actual

para mejorar///
1-contar todas las paginas y no solo la actual
  if un cell tiene parent=cell.id 

  <mxGraphModel dx="717" dy="859" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
  </root>
</mxGraphModel>

  
  
<mxGraphModel dx="717" dy="859" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-0"/>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-1" parent="r-UZ8igVGSpfonwKMBKW-0"/>
  </root>
</mxGraphModel>


<mxGraphModel dx="717" dy="859" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-0"/>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-1" parent="r-UZ8igVGSpfonwKMBKW-0"/>
    <object label="" placeholders="1" Name="Bateria_60mm" Efecto="" Disparos="10" Cadencia="" Linea="" id="OLUTDO3E-KnrEg16JvGu-0">
      <mxCell style="shape=stencil(xVTLTsMwEPwaH0GuHZVwhJT+h5tuGqvGjuylD76epGujJkCQEKpP0cxaM7vjjZmsQqs6YIJb9QpMrpgQzwqXvP/2ZEvMQkR8TJigCh3USNxBea02BqgS0Ls9HPUWo4S2LXiNQ1W+MP7EBknOZLVR9X7n3Zvdjgqp7AcDwU+kEts4j9CkqUnP64lfz/xgKavGeZjppdHG0GBT2XQC4TR02ziLQb/HPMvPSAincNNM98V4qoSV0TtLnIEGiTxcsei6SIJHXSszisU7VKidTar8SvWObp2C+iamNA8Yo7sAf7yAGeH5GH+xTUa39hVFHl+5zONblHl80w9ya9+HTHtVZtqrx0x7teD/vViXZ/3L631h40s3EB8=);whiteSpace=wrap;html=1;horizontal=0;" vertex="1" parent="r-UZ8igVGSpfonwKMBKW-1">
        <mxGeometry x="20" y="20" width="12" height="120" as="geometry"/>
      </mxCell>
    </object>
  </root>
</mxGraphModel>



2-generar una pagina de listado con toda info parseada piruli


bug/////
1-si clikamos procesar i estan atributos selecionados se cambiaran todos los de las fijuras a dichos valores
solucion poner alert i un if

*/

// FUNCION UI MAIN //////////////////////////////////////////////////////////////////////////////////////
Draw.loadPlugin(function(ui) {
 mxLog.show();//mostrar consola mxgraph modo debuger
  mxLog.debug('Modo dbg Plugin piro for PirotenciaTomas by TT 2019');
  mxLog.debug('Start ...  ');
//// cargar Sidebar libs xml ///////////////////////////////////////////////
var url1 = 'Lib/baterias.xml';
var url2 = 'Lib/abanicos.xml';
var url3 = 'Lib/canones.xml';
//var url4 = 'Lib/varios.xml';
mxUtils.get(url1, function(req){ ui.loadLibrary(new LocalLibrary(this, req.getText(),url1));   });
mxUtils.get(url2, function(req){ ui.loadLibrary(new LocalLibrary(this, req.getText(),url2));   });
//mxUtils.get(url3, function(req){ ui.loadLibrary(new LocalLibrary(this, req.getText(),url3));   });
//// fin cargar Sidebar libs xml  ///////////////////////////////////////////

/////variables y arrays /////////////////////////////////////////////////////
var graph = ui.editor.graph;
var piro_name = [];
var piro_disparos = ['1','3','5','10','20','30','50'];
var piro_linea = [];

var array_piro_id = []; //declaramos array gloval id de fiuguras
var array_piro_name = []; //declaramos array gloval name de figuras
var array_pagina_id = [];

/////fin variables y arrays /////////////////////////////////////////////////



 
////panel PiroDivPanelTag /////////////////////////////////////////////////
var div_tag = document.createElement('div');
div_tag.id = 'PiroDivPanelTag';
div_tag.style.background = '#ffffff';
div_tag.style.border = '1px solid gray';
div_tag.style.opacity = '0.8';
div_tag.style.position = 'absolute';
div_tag.style.padding = '10px';
div_tag.style.paddingTop = '0px';
div_tag.style.width = '20%';
div_tag.style.minWidth = '200px';
div_tag.style.top = '100px';
div_tag.style.right = '20px';
// Made for chromeless mode
    if (!ui.editor.chromeless)
    {
	    div_tag.style.top = '180px';
	    div_tag.style.right = '260px';
    }
  
div_tag.innerHTML = '<p><i>Selecciona un objeto ...</i></p>';
document.body.appendChild(div_tag);
////fin PiroDivPanelTag ///////////////////////////////////////////////
	
	
////panel PiroDivPanelEfectos /////////////////////////////////////////////////
var div_efectos = document.createElement('div');
div_efectos.id = 'PiroDivPanelEfectos';
div_efectos.innerText = "Efectos";
div_efectos.style.background = '#ffffff';
div_efectos.style.border = '1px solid gray';
div_efectos.style.opacity = '0.8';
div_efectos.style.position = 'absolute';
div_efectos.style.padding = '10px';
div_efectos.style.paddingTop = '0px';
div_efectos.style.width = '20%';
div_efectos.style.minWidth = '200px';
div_efectos.style.top = '40px';
div_efectos.style.right = '20px';	
//var graph = ui.editor.graph;
	// Made for chromeless mode
	if (!ui.editor.chromeless)
	{
		div_efectos.style.top = '100px';
		div_efectos.style.right = '260px';
	}
document.body.appendChild(div_efectos);
/////fin PiroDivPanelEfectos /////////////////////////////////////////////////
   
///////PiroDivPanelEfectos select efectos y checkbox ////////////////////////
var PiroDivPanelEfectos = document.getElementById("PiroDivPanelEfectos");
var checkbox_selectList_piro_efectos = document.createElement("input");
checkbox_selectList_piro_efectos.setAttribute("type", "checkbox");
checkbox_selectList_piro_efectos.setAttribute("id", "idcheckbox_selectList_piro_efectos");
checkbox_selectList_piro_efectos.setAttribute("name", "checkbox_selectList_piro_efectos");
checkbox_selectList_piro_efectos.setAttribute("value", "ff");
// cambiar a true para que salga por defetcto activado
checkbox_selectList_piro_efectos.checked = false; 
PiroDivPanelEfectos.appendChild(checkbox_selectList_piro_efectos); 
//array de options
var array_piro_efectos = ['TTT','BC','TRUENO','KAMURO','COLOR','CRACK','RONCADOR',''];
//Create and append select list
var selectList_piro_efectos = document.createElement("select");
selectList_piro_efectos.setAttribute("id", "Select_piro_efectos");
PiroDivPanelEfectos.appendChild(selectList_piro_efectos);
//Create and append the options
for (var i = 0; i < array_piro_efectos.length; i++)
	{
		var option = document.createElement("option");
		option.setAttribute("value", array_piro_efectos[i]);
		option.text = array_piro_efectos[i];
		selectList_piro_efectos.appendChild(option);
	}
///////fin PiroDivPanelEfectos select efectos y checkbox ////////////////////////
    


////panel PiroDivPanel cadencia /////////////////////////////////////////////////
var div_cadencia = document.createElement('div');
div_cadencia.id = 'PiroDivPanelCadencia';
div_cadencia.innerText = "Cadencia";
div_cadencia.style.background = '#ffffff';
div_cadencia.style.border = '1px solid gray';
div_cadencia.style.opacity = '0.8';
div_cadencia.style.position = 'absolute';
div_cadencia.style.padding = '10px';
div_cadencia.style.paddingTop = '0px';
div_cadencia.style.width = '20%';
div_cadencia.style.minWidth = '200px';
div_cadencia.style.top = '40px';
div_cadencia.style.right = '20px';	
//var graph = ui.editor.graph;
	// Made for chromeless mode
	if (!ui.editor.chromeless)
	{
		div_cadencia.style.top = '130px';
		div_cadencia.style.right = '260px';
	}
document.body.appendChild(div_cadencia);
/////fin PiroDivPanelCadencia /////////////////////////////////////////////////
   
///////PiroDivPanelCadencia select cadencia y checkbox ////////////////////////
var PiroDivPanelCadencia = document.getElementById("PiroDivPanelCadencia");
var checkbox_selectList_piro_cadencia = document.createElement("input");
checkbox_selectList_piro_cadencia.setAttribute("type", "checkbox");
checkbox_selectList_piro_cadencia.setAttribute("id", "idcheckbox_selectList_piro_cadencia");
checkbox_selectList_piro_cadencia.setAttribute("name", "checkbox_selectList_piro_cadencia");
checkbox_selectList_piro_cadencia.setAttribute("value", "ff");
// cambiar a true para que salga por defetcto activado
checkbox_selectList_piro_cadencia.checked = false; 
PiroDivPanelCadencia.appendChild(checkbox_selectList_piro_cadencia); 
//array de options
var array_piro_cadencia = ['1','2','3','4','5'];
//Create and append select list
var selectList_piro_cadencia = document.createElement("select");
selectList_piro_cadencia.setAttribute("id", "Select_piro_cadencia");
PiroDivPanelCadencia.appendChild(selectList_piro_cadencia);
//Create and append the options
for (var i = 0; i < array_piro_cadencia.length; i++)
	{
		var option = document.createElement("option");
		option.setAttribute("value", array_piro_cadencia[i]);
		option.text = array_piro_cadencia[i];
		selectList_piro_cadencia.appendChild(option);
	}
///////fin PiroDivPanelCadencia select cadencia y checkbox ////////////////////////



//funciones recount alls objects///////////////////////////////////////////////////////
//funcion que recorera todos los objetos recogera en arrays los valores



//funciones para current cell  //////////////////////////////////////////////////////
var highlight = new mxCellHighlight(graph, '#00ff00', 8);

function cellClicked(cell)
	{
		// Forces focusout in IE
		graph.container.focus();
        
		// Gets the selection cell
		if (cell == null)
		{
			highlight.highlight(null);
			div_tag.innerHTML = '<p><i>Selecciona un objeto ...</i></p>';
		}
		else
		{                                  
  //show id propia cell  IMPORTANTE tiene forma de hash autoincrement cambia si cambiamos de pagina
  //lo que no cambia es el id del stencil-shape osea el objeto o figura xml importado e instanciado 
  //podemos asi diferenciar o agrupar para poder contar nuestras figuras  ejemplo para filtrado  shape=stencil
  var styleshape = cell.style;
 // var patron = "shape=stencil(";// patro para difenciar los objetos de drawio de los nuestros
 // if (styleshape.indexOf(patron) > -1){ styleshape = styleshape.substr(380,7) ;} // esto acorta el id de nuestro objeto xml
  var selfId =  cell.id;
 // alert(selfId);
   ///////////////////////////////////////////////////obteniendo attributos de los custom-shapes y guardando en vars  
 var cellgetatlab = cell.getAttribute('label'); //obtine el label del shape
 var cellgetatName = cell.getAttribute('Name');
 var cellgetatEfecto = cell.getAttribute('Efecto');
 var cellgetatCadencia  = cell.getAttribute('Cadencia');
 var cellgetatLinea  = cell.getAttribute('Linea');
 var cellgetatDisparos  = cell.getAttribute('Disparos');
 ///////////// agrupar los tipos de Name para contar cuantos hay de cada uno
 //// array con los diferentes names y un contador para cada name repetido
//array_piro_id = [];//vaciamos el array de id de figuras que declaramos priviamente fuera de function cellClicked(cell)
//array_piro_name = [];//vaciamos el array de name de figuras que declaramos previamente fuera de esta function cellClicked(cell)
var add_array_piro_name = array_piro_name.push(cellgetatName); // empujamos nuevo valor name al array de names 

var add_array_piro_id = array_piro_id.push(selfId); // empujamos nuevo valor name al array de names


//var array_piro_name_count = [];
  
// alert(contadorNombre);
     	for (var i = 0; i < array_piro_name.length; i++){
       //if (array_piro_name == array_piro_name ){ array_piro_name_count.push(); };
//alert(cantidadNombres);

      };
 
 ////////////////////////////////// log de variables

 //mxLog.debug(array_piro_id);
  // mxLog.debug(selfId);
  // mxLog.debug(styleshape);
  // mxLog.debug(cellgetatName);
  // mxLog.debug(cellgetatDisparos);
  // mxLog.debug(cellgetatEfecto);
  // mxLog.debug(cellgetatCadencia);
  // mxLog.debug(cellgetatLinea);
  //mxLog.debug(cellgetatlab);
  ////fin show id
  
			var attrs = (cell.value != null) ? cell.value.attributes : null;
   

            if (attrs != null)
			{
                   ///////////// cambiar atributo efecto segun select y checkbox
                    var rec_piro_efecto = document.getElementById("Select_piro_efectos").value;
                    var rec_piro_efecto_check = document.getElementById("idcheckbox_selectList_piro_efectos").checked;
                    if (rec_piro_efecto_check == true)               
                   {
                      // var cell = evt.getProperty("cell");

                       cell.setAttribute("Efecto", rec_piro_efecto);
                       cell.setAttribute('label', rec_piro_efecto);
                       graph.refresh();
					   
                   }
                   //////////////fin cambiar atributo efecto segun select y checkbox
				   
				    ///////////// cambiar atributo cadencia segun select y checkbox
                    var rec_piro_cadencia = document.getElementById("Select_piro_cadencia").value;
                    var rec_piro_cadencia_check = document.getElementById("idcheckbox_selectList_piro_cadencia").checked;
                    if (rec_piro_cadencia_check == true)               
                   {
                      // var id =  cell.id;
                       cell.setAttribute("Efecto", rec_piro_cadencia);
                       cell.setAttribute('label', rec_piro_cadencia);
                       graph.refresh();
					   
                   }
                   //////////////fin cambiar atributo cadencia segun select y checkbox   
                
				var ignored = ['label', 'tooltip', 'placeholders'];
				highlight.highlight(graph.view.getState(cell));
				var label = graph.sanitizeHtml(graph.getLabel(cell));
				 				
				if (label != null && label.length > 0)
				{
					div_tag.innerHTML = '<h3>' + label + '</h3>';
					
					
				}
				else
				{
					div_tag.innerHTML = '';
					 
				}
				
				for (var i = 0; i < attrs.length; i++)
				{
					if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 &&
						attrs[i].nodeValue.length > 0)
					{
						div_tag.innerHTML += '<h4>' + graph.sanitizeHtml(attrs[i].nodeName) + '</h4>' +
							'<p>' + graph.sanitizeHtml(attrs[i].nodeValue) + '</p>';
					}
				}
			}
		}
	};

	/**
	 * Creates the textfield for the given property.
	 */
	function createTextField(graph, form, cell, attribute)
	{
		var input = form.addText(attribute.nodeName + ':', attribute.nodeValue);

		var applyHandler = function()
		{
			var newValue = input.value || '';
			var oldValue = cell.getAttribute(attribute.nodeName, '');

			if (newValue != oldValue)
			{
				graph.getModel().beginUpdate();
                
                try
                {
                	var edit = new mxCellAttributeChange(
                           cell, attribute.nodeName,
                           newValue);
                   	graph.getModel().execute(edit);
                   	graph.updateCellSize(cell);
                }
                finally
                {
                    graph.getModel().endUpdate();
                }
			}
		}; 

		mxEvent.addListener(input, 'keypress', function (evt)
		{
			// Needs to take shift into account for textareas
			if (evt.keyCode == /*enter*/13 &&
				!mxEvent.isShiftDown(evt))
			{
				input.blur();
			}
		});

		if (mxClient.IS_IE)
		{
			mxEvent.addListener(input, 'focusout', applyHandler);
		}
		else
		{
			// Note: Known problem is the blurring of fields in
			// Firefox by changing the selection, in which case
			// no event is fired in FF and the change is lost.
			// As a workaround you should use a local variable
			// that stores the focused field and invoke blur
			// explicitely where we do the graph.focus above.
			mxEvent.addListener(input, 'blur', applyHandler);
		}
	};
	
	graph.click = function(me)
	{
		// Async required to enable hyperlinks in labels
		window.setTimeout(function()
		{
			cellClicked(me.getCell());
		}, 0);
	};
//fin funciones para current cell  //////////////////////////////////////////////////////





////Custom menu ////////////////////////////////////////////////////////////////////////////////////////
//// Adds resource for action
mxResources.parse('pyroAction1=Procesar');
mxResources.parse('pyroAction2=PyroAction2');
mxResources.parse('pyroAction3=PyroAction3');
///accion botton1
ui.actions.addAction('pyroAction1', function() {
//var patron = "shape=stencil(";  ///patron que usan los objetos creados
//var styleshape = cell.style;  ///
//if (styleshape.indexOf(patron) > -1){ var styleshape = styleshape.substr(380,6) ;}
//var  cellsdetect = graph.getChildCells(graph.getDefaultParent());  // muestra tantos objetos como haya en la pagina donde estemos , tiene q ser de todas paginas
//var  cellsdetect = graph.getChildVertices(graph.getDefaultParent());  // muestra tantos objetos como haya
// var totalcellsdetect = 0;
	//for (var i = 0; i < cellsdetect.length; i++)
	  //{
		//totalcellsdetect++;    
	 // }
   //mxLog.show();
   //mxLog.debug(totalcellsdetect);
   //mxUtils.alert("Se detectaron " + totalcellsdetect + " objetos ");
      
var model = graph.getModel();
var parent = graph.getDefaultParent();
var index = model.getChildCount(parent);
var labelcell = graph.getChildVertices(graph.getDefaultParent()); //devuelve tantos objetos como hijos tiene un parent
//IMPORTANTE llama ala funcion cell desde aqui manejar los objetos de un padre sacar id y shape para agrupar i contar cada tipo 
// graph.getChildVertices(graph.getDefaultParent()).forEach(cellClicked); //clase que llama a funcion cell para cada hijo de defaultparent
array_piro_id = [];//vaciamos el array de id de figuras que declaramos priviamente fuera de function cellClicked(cell)
array_piro_name = [];//vaciamos el array de name de figuras que declaramos previamente fuera de esta function cellClicked(cell)
var  analizaHijos = graph.getChildVertices(graph.getDefaultParent()).forEach(cellClicked);
//var idIndex = model.getId(parent);
//alert(idIndex);
//mxLog.debug(labelcell);
// mxLog.debug(array_piro_id);
//array_piro_id = selfId;    
//alert(array_piro_name);  
   
   
 });
///fin accion botton1

///accion botton2	
ui.actions.addAction('pyroAction2', function() {
  // mxUtils.alert('Pyro Menu vacio2');
    /////funcion repetidos que busca nombres iguales dentro de un array y nos dice cuantos hay de cada uno  
    function buscarRepes(para) {
      var countRepes = {};
      para.forEach(function(para) {
      countRepes[para] = (countRepes[para] || 0) + 1;
      });
      return countRepes;
    }   
     
  // mxLog.debug(buscarRepes(array_piro_name));
   // console.log(buscarRepes(str));
    console.log(buscarRepes(array_piro_name));//muestra en un array todos los names y cuantos de cada uno
    ////////////////////////////////////////////////////////////////
    var array_piro_name_unicos = [buscarRepes(array_piro_name)];
    
     mxLog.debug(array_piro_name_unicos);
     
     for (var i = 0; i < array_piro_name_unicos.length; i++){
       //if (array_piro_name == array_piro_name ){ array_piro_name_countRepes.push(); };
//alert(cantidadNombres);
  mxLog.debug('names ' +  array_piro_name_unicos);

      };
  
     
     
     
  /////////fin funcion repetidos que busca nombres iguales dentro de un array y nos dice cuantos hay de cada uno
   
   });
///fin accion botton2

///accion botton3	
ui.actions.addAction('pyroAction3', function() {
  //  mxUtils.alert('Pyro Menu vacio3');

 // var graph = ui.editor.graph;
		//var pages = ui.pages;
		

  
   });
///fin accion botton3
 
//// Adds menu
ui.menubar.addMenu('PyroMenu', function(menu, parent) {
    ui.menus.addMenuItem(menu, 'pyroAction1');
			 ui.menus.addMenuItem(menu, 'pyroAction2');
			 ui.menus.addMenuItem(menu, 'pyroAction3');
			 
   });
//// fin Adds menu

//// Reorders menubar
    ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
    ui.menubar.container.lastChild.previousSibling.previousSibling);
////fin Custom menu //////////////////////////////////////////////////////////////////////////////////////




	
});
// FIN FUNCION UI MAIN //////////////////////////////////////////////////////////////////////////////////////
