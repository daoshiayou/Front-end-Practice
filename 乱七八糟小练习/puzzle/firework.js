function randomColor() {
    var color = 'rgb(';
    var r = parseInt(Math.random() * 256);
    var g = parseInt(Math.random() * 256);
    var b = parseInt(Math.random() * 256);
    color += r + ',' + g + ',' + b + ')';
    return color;
}

function Firework(div) {
    div.style.backgroundColor = randomColor();
    div.className = 'fireworks';

    var x = Math.random() * document.querySelector('body').offsetWidth;
    var y = Math.random() * document.querySelector('body').offsetHeight;
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    document.body.appendChild(div);

    var speedX = (parseInt(Math.random() * 2) == 0 ? 1 : -1) * parseInt(Math.random() * 16 + 1);
    var speedY = (parseInt(Math.random() * 2) == 0 ? 1 : -1) * parseInt(Math.random() * 20 + 1);
    this.move = function () {
        var i = 3;
        var ctrlTimer = setInterval(function () {
            i++;
            div.style.left = div.offsetLeft + speedX + 'px';
            div.style.top = div.offsetTop + speedY + i + 'px';
            if (div.offsetLeft + div.offsetWidth > window.innerWidth || div.offsetLeft < 2 || div.offsetTop + div.offsetHeight > window.innerHeight || div.offsetTop < 2) {
                div.remove();
                clearInterval(ctrlTimer);
            }
        }, 100);
    }
}

function randomFireworks() {
    for (let i = 0; i < 80; i++) {
        var div = document.createElement('div');
        var boom = new Firework(div);
        boom.move();
    }
}

// module.exports = randomFireworks;