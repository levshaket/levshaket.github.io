(function($) {

    var SekKeyboard = {
        stdAngle : 45,
        xAngle : 75,
        angleStep : 40,
        scale : 1,
        scaleStep : 0.2,
        initialized:false,
        element:null,
        init:function(element) {
            var self = SekKeyboard;
            if(self.initialized) {return}
            self.element = element;
            self.initialized = true;

            $('body').keydown(function(evt) {
                switch(evt.keyCode) {
                case 37: // arrow left
                case 100: // 4 pad
                    evt.preventDefault();
                    self.stdAngle -= self.angleStep;
                    break;
                case 38: // arrow up
                case 104: // 8 numeric pad
                    evt.preventDefault();
                    self.xAngle += self.angleStep;
                    break;
                case 39: // arrow right
                case 102: // 6 numeric pad
                    evt.preventDefault();
                    self.stdAngle += self.angleStep;
                    break;
                case 40: // arrow down
                case 98: // 2 numeric pad
                    evt.preventDefault();
                    self.xAngle -= self.angleStep;
                    break;
                case 107: // + numeric pad
                    evt.preventDefault();
                    self.scale += self.scaleStep;
                    break;
                case 109: // - numeric pad
                    evt.preventDefault();
                    self.scale -= self.scaleStep;
                    break;
                };
                $.rotate3d(self.element, self.xAngle, self.stdAngle, self.scale);
            });
        },
    };
    $.fn.keyboard_controls = function() {
        // KEYBOARD COMMAND - GRID VIEW ORIENTATION
        SekKeyboard.init(this);
    }
    $.rotate3d = function(element, xAngle, stdAngle, scale) {
        element.attr('style', 'transform: rotateX('+xAngle+'deg) rotate('+stdAngle+'deg) scale('+scale+');');
    }
})(jQuery);


$(document).ready(function() {
    $('.pyramid3d').keyboard_controls();
	$.rotate3d($('.pyramid3d'), 75, 45, 1);
});
