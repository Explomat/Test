var UI = {

    toggleList: function(ctx, className){
        var lst = document.querySelectorAll('.'+className);
        for (var i = lst.length - 1; i >= 0; i--)
            lst[i].classList.remove(className);
        ctx.classList.add(className);
    },

    getElementByHash: function(elem, hash) {
        if (!elem) 
            return null;
        return elem.querySelector("a[href='"+hash+"']");
    }
}

module.exports = UI;
