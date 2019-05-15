
/////////////// Plugin TT for PirotecnitaTomas  2019*/////////////////////////////////////////////////////////////////////////
// FUNCION UI MAIN //////////////////////////////////////////////////////////////////////////////////////
Draw.loadPlugin(function(ui) {
  
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
/////fin variables y arrays /////////////////////////////////////////////////

////Custom menu ////////////////////////////////////////////////////////////////////////////////////////
//// Adds resource for action
mxResources.parse('pyroAction1=PyroAction1');
mxResources.parse('pyroAction2=PyroAction2');
mxResources.parse('pyroAction3=PyroAction3');
///accion botton1
ui.actions.addAction('pyroAction1', function() {
var patron = "shape=stencil(";  ///patron que usan los objetos creados
//var styleshape = cell.style;  ///
//if (styleshape.indexOf(patron) > -1){ var styleshape = styleshape.substr(380,6) ;}

  var  cellsdetect = graph.getChildCells(graph.getDefaultParent());  // muestra tantos objetos como haya en la pagina donde estemos , tiene q ser de todas paginas
  //var  cellsdetect = graph.getChildVertices(graph.getDefaultParent());  // muestra tantos objetos como haya
  var totalcellsdetect = 0;
	for (var i = 0; i < cellsdetect.length; i++)
	  {
		totalcellsdetect++;    
	  }

   mxLog.show();
   mxLog.debug(totalcellsdetect);
   mxUtils.alert("Se detectaron " + totalcellsdetect + " objetos ");
 });
///fin accion botton1

///accion botton2	
ui.actions.addAction('pyroAction2', function() {
   mxUtils.alert('Pyro Menu vacio2');
   });
///fin accion botton2

///accion botton3	
ui.actions.addAction('pyroAction3', function() {
    mxUtils.alert('Pyro Menu vacio3');
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
function recount(){
 
 
var arrayPag = [];
var arrayCellid = [];
var arrayCellValue = [];
var arrayCellName = [];
var arrayCellAtt1 = [];
var arrayCellAtt2 = [];

var  cellsdetect = graph.getChildCells(graph.getDefaultParent());  // muestra tantos objetos como haya en la pagina donde estemos , tiene q ser de todas paginas
for (var i = 0; i < cellsdetect.length; i++) {
  // arrayCellid = cellsdetect.cell.id[i];
		//totalcellsdetect++;
  
	}

 
  // var model = graph.getModel();
  //var childCount = model.getChildCount(model.root);
  //for (var e = 0; e < childCount; e++){
  // model.setVisible(model.getChildAt(model.root, e), false); //setea visible a todos los childs de modelo graph es un ejemplo
  //}
  

   mxLog.show();

    mxLog.debug(i);
   //alert("recount " + cellsdetect + " id ");
   //mxUtils.alert("Se detectaron " + i + " objetos ");
   
   
   
}

//fin de funciones recount alls objectcs



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
  var patron = "shape=stencil(";// patro para difenciar los objetos de drawio de los nuestros
  if (styleshape.indexOf(patron) > -1){ styleshape = styleshape.substr(380,7) ;} // esto acorta el id de nuestro objeto xml
  var selfId =  cell.id;
 // alert(selfId);
  mxLog.show();
  mxLog.debug(selfId);
   mxLog.debug(styleshape);
  ////fin show id
  
			var attrs = (cell.value != null) ? cell.value.attributes : null;
   
   //funcion recount alls objects
   recount();
   //fin funcion recount
			
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

	
});
// FIN FUNCION UI MAIN //////////////////////////////////////////////////////////////////////////////////////
