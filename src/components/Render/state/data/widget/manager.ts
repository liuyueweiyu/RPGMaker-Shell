// import images from ;
import images from './definition';

// const IMG_ROOT = '../../../../../images/';
class Manager {
    constructor() {
        this.initSrc();
    }
    initSrc() {
        images.forEach(v=>{
            console.log(v)
            console.log(v.src)
            // const requireContext = require.context(IMG_ROOT+v.src, true, /^\.\/.*\.png$/);
            // const images = requireContext.keys().map(requireContext);
            // console.log(images)
            // console.log(require(IMG_ROOT+v.src))
        })
    }
}


export default Manager