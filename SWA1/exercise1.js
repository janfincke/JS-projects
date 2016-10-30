/**
 * Created by Jan on 20.9.2016.
 */
// 1.1(a)
for(var i = 1; i <= 10; i++) {
    console.log(i);
}

// 1.1(b)
var sum = 0;
for(var i = 1; i <= 10; i++) {
    sum += i;
}
console.log(sum);

// 1.1 (c)
var fac = 1;
for(var i = 1; i <= 10; i++) {
    fac *= i;
}
console.log(fac);

// 1.2 (a)
function factorial(n) {
    var fac = 1;
    for(var i = 1; i <= n; i++) {
        fac *= i;
    }
    return fac;
}

// 1.2 (b)
function power(m, n) {
    var pow = 1;
    for(var i = 1; i <= n; i++) {
        pow *= m;
    }
    return pow;
}

// 1.3
var a = [1, 2, 3, 5, 8];

// (a)
for(var i = 0; i < a.length; i++) {
    console.log(a[i]);
}

// (b)
var sum = 0;
for(var i = 0; i < a.length; i++) {
    sum += a[i];
}
console.log(sum);

// (c)
function sumArray(a) {
    var sum = 0;
    for(var i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}

// 1.4
function advanced(m, n) {
    if (n)
        return power(m, n)
    else
        return factorial(m);
}

// 1.5(a)
function curryPow(n) {
    function pow(m) {
        return power(m, n);
    }
    return pow;
}

// 1.5(b)
// Let's first make the version that returns the proper Fibonacci sequence
function properFib() {
    var previous = 1;
    var current = 0;

    function nextFib() {
        var temp = current;
        current += previous;
        previous = temp;
        return current;
    }

    return nextFib();
}

// The full one is only a slight change:
function fibonacci(m, n) {
    var previous = m;
    var current = n;

    function nextFib() {
        var temp = current;
        current += previous;
        previous = temp;
        return current;
    }

    return nextFib();
}

// 1.5(c)
function apply(a, f) {
    for(var i = 0; i < a.length; i++) {
        a[i] = f(a[i]);
    }
}

// Test: Add 4 to all elements of an array
function add(n) {
    return function(m) {
        return n + m;
    };
}

var a = [1, 3, 8, 12];
apply(a, add(4));
console.log(a);