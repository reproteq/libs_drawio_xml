/** Plugin TT for PirotecnitaTomas  2019*/
Draw.loadPlugin(function(ui) {
//alert('Cargar Plugin TT para PirotecniaTomas');
// panel recuento
var div = document.createElement('div');
	div.style.background = '#ffffff';
	div.style.border = '1px solid gray';
	div.style.opacity = '0.8';
	div.style.position = 'absolute';
	div.style.padding = '10px';
	div.style.paddingTop = '0px';
	div.style.width = '20%';
	div.style.minWidth = '200px';
	div.style.top = '40px';
	div.style.right = '20px';
	
	var graph = ui.editor.graph;
//

////Sidebar libs in

////Sidebar libs out
	
////Custom Menu in    
//    // Adds resource for action
    mxResources.parse('pyroAction1=PyroAction1');
		mxResources.parse('pyroAction2=PyroAction2');
		mxResources.parse('pyroAction3=PyroAction3');
//
//    // Adds action
  ui.actions.addAction('pyroAction1', function() {
       mxUtils.alert('Pyro Menu vacio1');
   });
	
	  ui.actions.addAction('pyroAction2', function() {
       mxUtils.alert('Pyro Menu vacio2');
   });
		
		  ui.actions.addAction('pyroAction3', function() {
       mxUtils.alert('Pyro Menu vacio3');
   });
//
//    // Adds menu
    ui.menubar.addMenu('PyroMenu', function(menu, parent) {
       ui.menus.addMenuItem(menu, 'pyroAction1');
			 ui.menus.addMenuItem(menu, 'pyroAction2');
			 ui.menus.addMenuItem(menu, 'pyroAction3');
			 
   });
//
//    // Reorders menubar
    ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
    ui.menubar.container.lastChild.previousSibling.previousSibling);
//
 
////Custom Menu 

 
});
