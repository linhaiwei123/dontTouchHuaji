cc.Class({
    extends: cc.Component,

    editor: {
        //executeInEditMode: true
    },

    properties: {
       movePanel: cc.Node,
       huajiPrefab: cc.Prefab,
       blackPrefab: cc.Prefab,
       initRow: 6,
       initCol: 4,
       _newTopRow: null,
       _curBottomRow: null,
       _curTouchRow: -1,
       _startPosition: null,
    },

    onLoad: function () {
        //加载 填满 屏幕中央
        this._curBottomRow = 0;
        this._newTopRow = 6;
        this._startPosition = this.movePanel.position;
        
        for(let row = 0; row < 6; row++){
            let randomBlackCol = Math.floor(Math.random() * 4);
            for(let col = 0; col < 4; col++){
                let block = null;
                if(randomBlackCol == col){
                    block = cc.instantiate(this.blackPrefab);
                    block.getComponent("block-script").init("black",this);
                }else{
                    block = cc.instantiate(this.huajiPrefab);
                    block.getComponent("block-script").init("huaji",this);
                }
                this.movePanel.addChild(block);
                block.name = row + "#" + col;
                block.position = cc.pMult(cc.v2(col,row),150);
            }
        }
    },

    move: function(){
        
        let movePosition = cc.v2(this._startPosition.x,(this._startPosition.y + (this._curBottomRow + 1) * -150));

        this.movePanel.runAction(cc.sequence(
            cc.moveTo(0.2,movePosition),
            cc.callFunc(this.updateRender.bind(this))
        ))
    },

    updateRender : function(){
            let row = this._newTopRow;
            let randomBlackCol = Math.floor(Math.random() * 4);
            for(let col = 0; col < 4; col++){
                let block = null;
                if(randomBlackCol == col){
                    block = cc.instantiate(this.blackPrefab);
                    block.getComponent("block-script").init("black",this);
                }else{
                    block = cc.instantiate(this.huajiPrefab);
                    block.getComponent("block-script").init("huaji",this);
                }
                this.movePanel.addChild(block);
                block.name = row + "#" + col;
                block.position = cc.pMult(cc.v2(col,row),150);
            }
            //remove bottom row
            let oldRow = this._curBottomRow;
            for(let col = 0; col < 4; col++){
                this.movePanel.getChildByName(oldRow + "#" + col).removeFromParent();
            }
            this._curBottomRow++;
            this._curTouchRow++;
            this._newTopRow++;
        }


});
