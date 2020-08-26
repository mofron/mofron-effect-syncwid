/**
 * @file mofron-effect-syncwid/index.js
 * @brief synchronize width of target component and width of effect component
 * @license MIT
 */
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     *
     * @param (mixed) targetComp config parameter
     *                dict: effect config list
     * @param (string(size)) offset config parameter
     * @short targetComp,offset
     * @type private
     */
    constructor (p1, p2) {
        try {
            super();
            this.shortForm('targetComp','offset');
            this.modname('SyncWid');
            
            /* init config */
	    this.confmng().add("targetComp", { type: "Component" });
	    this.confmng().add("offset", { type: "size" }); 
            
	    /* set config */
	    if (0 < arguments.length) {
                this.config(p1,p2);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter for width listen target component 
     * it triggers this effect when width of target component was changed.
     *
     * @param (Component) target component
     *                    undefined: call as getter
     * @return (mixed) Component: target component
     *                 null: not set
     * @type parameter
     */
    targetComp (prm) {
        try {
	    let ret = this.confmng("targetComp", prm);
	    if (undefined !== prm) {
                let syn_fnc = (p1,p2,sync) => {
                    try {
                        sync.execute();
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                prm.styleDom().style().listener('width', syn_fnc, this);
            }
	    return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset value setter/getter
     * this value is used for width adjustment
     *
     * @param (string(size)) offset value (default is '0rem')
     *                       undefined: call as getter
     * @return (mixed) string: offset value
     *                 null: not set
     * @type parameter
     */
    offset (prm) {
        try {
	    return this.confmng('offset', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     * 
     * @param (mofron.class.Component) effect target component
     * @type private
     */
    contents (cmp) {
        try {
            if (null === this.targetComp()) {
                this.targetComp(this.component().parent());
            }
            cmp.width(
                comutl.sizesum(this.targetComp().width(), this.offset())
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
