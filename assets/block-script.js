cc.Class({
    extends: cc.Component,

    properties: {
        _type: null,
        _mainScript: null,
    },

    // use this for initialization
    init: function (type,mainScript) {
        this._type = type;
        this._mainScript = mainScript;
        this.node.on("touchstart",function(){
            if(this._type == "huaji"){
                console.log("hiahiahia");
            }else{
                let blockRow = this.node.name.split("#")[0];
                if(parseInt(blockRow) !== (this._mainScript._curTouchRow + 1)){
                    console.log("hiahiahia");
                }else{
                    this._mainScript.move();
                }
            }
        }.bind(this))
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
