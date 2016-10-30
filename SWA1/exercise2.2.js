/**
 * Created by Jan on 20.9.2016.
 */
function Point(x, y) {
    this.getX = function () {
        return x;
    }
    this.getY = function () {
        return y;
    }
    this.moveTo = function (newX, newY) {
        x = newX;
        y = newY;
    }
    this.toString = function () {
        return '(' + x + ', ' + y + ')';
    }
    this.copy = function () {
        return new Point(x, y);
    }
}

function Circle() {
    var center, radius;
    if (arguments.length === 2) {
        center = arguments[0];
        radius = arguments[1];
    } else {
        center = new Point(arguments[0], arguments[1]);
        radius = arguments[2];
    }
    this.getCenter = function () {
        return center;
    }
    this.getRadius = function () {
        return radius;
    }
    this.moveTo = function (x, y) {
        center.moveTo(x, y);
    }
    this.toString = function () {
        return '' + center.toString() + ' r = ' + radius;
    }
}
