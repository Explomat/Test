var UI = {

    toggleClass: function(ctx, className){
        var lst = document.querySelectorAll('.'+className);
        for (var i = lst.length - 1; i >= 0; i--)
            lst[i].classList.remove(className);
        ctx.classList.add(className);
    },

    getElementByHash: function(elem, hash) {
        if (!elem) 
            return null;
        return elem.querySelector("a[href='"+hash+"']");
    },

    transitionBorder: function (menuBoxeElem, tabBorderElem, curElem, prevElem) {

        function getPostElemsWidth (menu, elemIndex) {
            var width = 0;
            var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
            for (var i = elems.length - 1; i >= 0; i--) {
                if (i === elemIndex) return width;
                width += elems[i].offsetWidth;
            };
            return width;
        }

        function getPrevElemsWidth (menu, elemIndex) {
            var width = 0;
            var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
            for (var i = 0, len = elems.length; i < len; i++) {
                if (i === elemIndex) return width;
                width += elems[i].offsetWidth;
            };
            return width;
        }

        if (!menuBoxeElem || !tabBorderElem || !curElem) return;

        var borderWidth = curElem.offsetWidth;
        var children = menuBoxeElem.children;

        if (!borderWidth || !children) return;

        var ch = Array.prototype.slice.call(children);
        var indexCurElem = ch.indexOf(curElem);
        var indexPrevElem = ch.indexOf(prevElem);
        //console.log(getPostElemsWidth(menuBoxeElem, indexElem));
        //console.log(getPrevElemsWidth(menuBoxeElem, indexElem));

        var shift = indexCurElem <= indexPrevElem ? getPrevElemsWidth(menuBoxeElem, indexPrevElem) : getPostElemsWidth(menuBoxeElem, indexPrevElem);
        tabBorderElem.style.width = borderWidth + 'px';
        tabBorderElem.style.transform = 'translateX('+ shift +'px)';
    }
}

module.exports = UI;
