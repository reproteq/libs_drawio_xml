/**
 * Sample plugin.
 */




Draw.loadPlugin(function(ui) {
	//MENU CUSTOM SIDEBAR
	

	
	var url1 = 'https://raw.githubusercontent.com/reproteq/libs_drawio_xml/master/lib1.xml';
mxUtils.get(url1, function(req){
         ui.loadLibrary(new LocalLibrary(this, req.getText(),url1));
          });
	
		var url2 = 'https://raw.githubusercontent.com/reproteq/libs_drawio_xml/master/lib2.xml';
mxUtils.get(url2, function(req){
          ui.loadLibrary(new LocalLibrary(this, req.getText(),url2));
           });
	
			 var url3 = 'https://pyrotronika.com/clibs/lib_bat1.xml';
			//var url3 = 'http://www.alderg.com/voyage-icons.xml';
mxUtils.get(url3, function(req){
          ui.loadLibrary(new LocalLibrary(this, req.getText(),url3));
           });
 ////FIN MENU SIDEBAR
	
    // Adds logo to footer
    ui.footerContainer.innerHTML = '<img width=50px height=17px align="right" style="margin-top:14px;margin-right:12px;" ' + 'src="http://download.pyro.net.s3.amazonaws.com/img/pyro-Logo-Color.svg"/>';

	// Adds variables in labels (%today, %filename%)
	var superGetLabel = ui.editor.graph.getLabel;
	
	ui.editor.graph.getLabel = function(cell)
	{
		var result = superGetLabel.apply(this, arguments);
		
		if (result != null)
		{
			var today = new Date().toLocaleString();
			var file = ui.getCurrentFile();
			var filename = (file != null && file.getTitle() != null) ? file.getTitle() : '';
			
			result = result.replace('%today%', today).replace('%filename%', filename);
		}
		
		return result;
	};
    
//    // Adds resource for action
    mxResources.parse('pyroAction=PyroAction');
//
//    // Adds action
  ui.actions.addAction('pyroAction', function() {
        var ran = Math.floor((Math.random() * 100) + 1);
       mxUtils.alert('Pyro Menu vacio');
   });
//
//    // Adds menu
    ui.menubar.addMenu('PyroMenu', function(menu, parent) {
       ui.menus.addMenuItem(menu, 'pyroAction');
   });
//
//    // Reorders menubar
    ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
       ui.menubar.container.lastChild.previousSibling.previousSibling);
//
//    // Adds toolbar button
   ui.toolbar.addSeparator();
   var elt = ui.toolbar.addItem('', 'pyroAction');
//
//    // Cannot use built-in sprites
   elt.firstChild.style.backgroundImage = 'url(https://www.draw.io/images/logo-small.gif)';
   elt.firstChild.style.backgroundPosition = '2px 3px';
});
