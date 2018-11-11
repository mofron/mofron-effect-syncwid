/**
 * @file mofron-effect-syncwid/index.js
 * @brief synchronize width of target component and width of effect component
 * @author simpart
 */
const mf = require('mofron');
mf.effect.SyncWid = class extends mf.Effect {
    /**
     * initialize effect
     *
     * @param p1 (object) effect option
     * @param p1 (Component) sync target component
     * @param p2 (string) offset size (css value)
     */
    constructor (po, p2) {
        try {
            super();
            this.prmMap(['targetComp', 'offset']);
            this.name('SyncWid');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter for width listen target component
     * it triggers this effect when width of target component was changed.
     *
     * @param prm (Component) target component
     * @param prm (undefined) call as getter
     * @return (Component) target component
     * @return (null) not set yet
     */
    targetComp (prm) {
        try {
            let ret = this.member('targetComp', 'Component', prm);
            if (undefined !== prm) {
                let syn_fnc = (p1,p2,sync) => {
                    try { sync.execute(true); } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                prm.styleTgt().styleListener('width', syn_fnc, this);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter offset value
     * this value is used for width adjustment
     *
     * @param prm (string) css style size value (default is '0rem')
     * @param prm (undefined) call as getter
     * @return (string) offset value
     */
    offset (prm) {
        try { return this.member('offset', 'string', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * synchronize width size
     *
     * @note private method
     */
    enable (cmp) {
        try {
            if (null === this.targetComp()) {
                this.targetComp(this.component().parent());
            }
            
            let tgt_wid = this.targetComp().sizeValue('width');
            if (null === tgt_wid) {
                return;
            }
            
            if ( (null === this.offset()) ||
                 (tgt_wid.type() !== mf.func.getSize(this.offset()).type()) ) {
                cmp.width(tgt_wid.toString());
            } else {
                cmp.width(
                    mf.func.sizeSum(this.targetComp().width(), this.offset())
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable () {}
}
module.exports = mf.effect.SyncWid;
/* end of file */
