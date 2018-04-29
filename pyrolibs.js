/** Pyro libs 2018 */
Draw.loadPlugin(function (ui) {
 
    var sidebar_id = 'pyro';
    var sidebar_title = 'Pyro Lib';
    var pyroUtils = {};
    
    pyroUtils.is = function (cell) {
        return (cell &&
            cell.hasOwnProperty('') &&
            (cell.pyro !== null));
    };
    
    pyroUtils.isModel = function (cell) {
        return (pyroUtils.is(cell) &&
            cell &&
            cell.hasOwnProperty('value') &&
            (cell.value &&
                cell.value.hasAttribute('pyroType'))
        );
    };
    
    pyroUtils.registCodec = function (func) {
        var codec = new mxObjectCodec(new func());
        codec.encode = function (enc, obj) {
            try {
                var data = enc.document.createElement(func.name);
            } catch (e) {
                (window.console && console.error(e));
            }
            return data
        };
        codec.decode = function (dec, node, into) {
            return new func();
        };
        mxCodecRegistry.register(codec);
    };

    pyroStateHandler = function (state) {
        mxVertexHandler.apply(this, arguments);
    };
    pyroStateHandler.prototype = new mxVertexHandler();
    pyroStateHandler.prototype.constructor = pyroStateHandler;
    pyroStateHandler.prototype.domNode = null;
    pyroStateHandler.prototype.init = function () {
        mxVertexHandler.prototype.init.apply(this, arguments);
        this.domNode = document.createElement('div');
        this.domNode.style.position = 'absolute';
        this.domNode.style.whiteSpace = 'nowrap';
        if (this.custom) this.custom.apply(this, arguments);
        var img = pyroUtils.createSettingsIcon();
        mxEvent.addGestureListeners(img,
            mxUtils.bind(this, function (evt) {
                mxEvent.consume(evt);
            })
        );
        this.domNode.appendChild(img);
        this.graph.container.appendChild(this.domNode);
        this.redrawTools();
    };
    pyroStateHandler.prototype.redraw = function () {
        mxVertexHandler.prototype.redraw.apply(this);
        this.redrawTools();
    };
    pyroStateHandler.prototype.redrawTools = function () {
        if (this.state !== null && this.domNode !== null) {
            var dy = (mxClient.IS_VML && document.compatMode === 'CSS1Compat') ? 20 : 4;
            this.domNode.style.left = (this.state.x + this.state.width - this.domNode.children.length * 14) + 'px';
            this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
        }
    };
    pyroStateHandler.prototype.destroy = function (sender, me) {
        mxVertexHandler.prototype.destroy.apply(this, arguments);
        if (this.domNode !== null) {
            this.domNode.parentNode.removeChild(this.domNode);
            this.domNode = null;
        }
    };



   
 // menu
   
    //1
    pyroObject1 = function () {
    };
   
    pyroObject1.prototype.handler = pyroStateHandler;
    pyroObject1.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 0, 18, 180), 'rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=47;strokeColor=#fff444;');
        
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Object</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('Name', 'Object1');
        cell.setAttribute('Type', 'pyroObject1');
        cell.pyro = this;
        return cell;
       
    };
    pyroUtils.registCodec(pyroObject1);

    //2

        pyroObject2 = function () {
    };
    pyroObject2.prototype.handler = pyroStateHandler;
    pyroObject2.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Object</div>');
        cell.setAttribute('placeholders', '2');
        cell.setAttribute('Name', 'Object2');
        cell.setAttribute('Type', 'pyroObject2');
        cell.pyro = this;
        return cell;
    };
    pyroUtils.registCodec(pyroObject1,pyroObject2);

    // Adds custom sidebar entry
    ui.sidebar.addPalette(sidebar_id, sidebar_title, true, function (content) {
        var verticies = [pyroObject1,pyroObject2];        
        for (var i in verticies) {
            var cell = verticies[i].prototype.create();
            content.appendChild(ui.sidebar.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, cell.label));
        }
     
    });


});
