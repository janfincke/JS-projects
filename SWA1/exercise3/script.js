var ind = 1;
showDivs(ind);

function plusDivs(n) {
    showDivs(ind += n);
}

function showDivs(n) {
    
    var i;

    var x = document.getElementsByClassName("images");
    if (n > x.length) {ind = 1}
        if (n < 1) {ind = x.length}

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    };

    x[ind-1].style.display = "block";
}

function setupGallery() {
    var div = document.getElementById("gallery"),
        img = new Array(),
        images = new Array();
        
    img[0] = '<a href="flower.jpg"><img src=flower_t.jpg alt="flower"></a>';
    img[1] = '<a href="animal.jpg"><img src=animal_t.jpg alt="animal"></a>';
    img[2] = '<a href="kappa.jpg"><img src=kappa_t.jpg alt="emote"></a>';
        
    for (var i = 0; i < 3; i++) {
                images.push(img[i]);
                div.innerHTML+=(images[i])
    }
}

