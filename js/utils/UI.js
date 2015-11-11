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

    getElementCoordinates: function(elem){
        if (!elem) return {};

        var elemRect = elem.getBoundingClientRect();
        /*var scrollTop = document.documentElement.scrollTop? document.documentElement.scrollTop : document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft? document.documentElement.scrollLeft : document.body.scrollLeft;

        return {
            positionX: elemRect.left + scrollLeft,
            positionY: elemRect.top + scrollTop
        }*/

        return {
            positionX: elemRect.left,
            positionY: elemRect.top,
            width: elemRect.width,
            height: elemRect.height
        }
    },

    transitionBorder: function (menuBoxeElem, tabBorderElem, curElem) {

        function getShift(menu, indexCurElem) {
            var width = 0;
            var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
            for (var i = 0; i < indexCurElem; i++) {
                width += elems[i].offsetWidth;
            }
            return width;
        }

        function getElemsWidth(menu, indexCurElem, indexPrevElem) {
            indexPrevElem = indexPrevElem !== -1 ? indexPrevElem : indexCurElem;
            var width = 0;
            var i = indexCurElem >= indexPrevElem ? indexPrevElem : indexCurElem;
            var count = indexCurElem >= indexPrevElem ? indexCurElem : indexPrevElem;
            var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
            for (i; i <= count; i++) {
                width += elems[i].offsetWidth;
            }
            return width;
        }

        if (!menuBoxeElem || !tabBorderElem || !curElem) return;
        var borderWidth = curElem.offsetWidth;
        var children = menuBoxeElem.children;
        if (!borderWidth || !children) return;

        var indexCurElem = Array.prototype.slice.call(children).indexOf(curElem);
        var indexPrevElem = Array.prototype.slice.call(children).indexOf(menuBoxeElem.querySelector('.menu-box__item_active'));
        var shift = getShift(menuBoxeElem, indexCurElem);
        tabBorderElem.style.width = getElemsWidth(menuBoxeElem, indexCurElem, indexPrevElem) + 'px'; //tabBorderElem.offsetWidth + borderWidth + 'px';
        if (indexCurElem < indexPrevElem) tabBorderElem.style.left = shift + 'px';

        tabBorderElem.classList.remove('menu-box__item_border_contract');
        tabBorderElem.classList.add('menu-box__item_border_expand');
        setTimeout(function(){
            tabBorderElem.classList.remove('menu-box__item_border_expand');
            tabBorderElem.classList.add('menu-box__item_border_contract');
            tabBorderElem.style.width = borderWidth + 'px';
            tabBorderElem.style.left = shift + 'px';
        }, 250);
        this.toggleClass(curElem, 'menu-box__item_active');

        /*function getElemsWidth (menu, indexCurElem) {
            var width = 0;
            var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
            for (var i = 0; i < indexCurElem; i++) {
                width += elems[i].offsetWidth;
            }
            return width;
        }

        if (!menuBoxeElem || !tabBorderElem || !curElem) return;
        var borderWidth = curElem.offsetWidth;
        var children = menuBoxeElem.children;
        if (!borderWidth || !children) return;

        var indexCurElem = Array.prototype.slice.call(children).indexOf(curElem);
        var shift = getElemsWidth(menuBoxeElem, indexCurElem);
        tabBorderElem.style.width = borderWidth + 'px';
        tabBorderElem.classList.add('menu-box__item_border_expand');
        tabBorderElem.style.left = shift + 'px'*/
        //tabBorderElem.style.left = shift + 'px';
    }
}

module.exports = UI;