/**
 * Created by Alex.W on 2017/3/12.
 */
$(function() {
   var circle = $('#tower');
    var leftV = circle.offset().left;
    var topV = circle.offset().top;

    var distance,
        item = {},
        tower = {},
        radar = 80;

    function getRadius(point,obj) {
        distance = Math.sqrt(Math.pow(Math.abs(obj.x - point.x),2) + Math.pow(Math.abs(obj.y - point.y),2));
        if(distance < radar) {
            circle.addClass('colorChange');
        } else {
            circle.removeClass('colorChange');
        }
    }

    tower.x = leftV;
    tower.y = topV;
    console.log(tower.x + ', ' + tower.y);

    $(window).on('mousemove',function(e) {
        item.x = e.pageX;
        item.y = e.pageY;
        getRadius(item,tower);
    });

});