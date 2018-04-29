/** Plugin TT for PirotecnitaTomas  2018*/
Draw.loadPlugin(function(ui) {
//alert('Cargar Plugin TT para PirotecniaTomas');
////Sidebar libs in
var url1 = 'https://raw.githubusercontent.com/reproteq/libs_drawio_xml/master/lib1.xml';
mxUtils.get(url1, function(req){
         ui.loadLibrary(new LocalLibrary(this, req.getText(),url1));
          });
	
var url2 = 'https://raw.githubusercontent.com/reproteq/libs_drawio_xml/master/lib2.xml';
mxUtils.get(url2, function(req){
          ui.loadLibrary(new LocalLibrary(this, req.getText(),url2));
           });
	
var url3 = 'https://raw.githubusercontent.com/reproteq/libs_drawio_xml/master/lib3.xml';
mxUtils.get(url3, function(req){
          ui.loadLibrary(new LocalLibrary(this, req.getText(),url3));
           });
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
