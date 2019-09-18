window.onload = function () {
    let banners = document.getElementById('banner').children[0].children;
    let bannersButt = document.getElementById('banner').children[1].children;
    let bannerId = (function () {
        let bannerOn = document.getElementsByClassName('banners on')[0];
        for (let i = 0; i < banners.length; i++) {
            if (banners[i] === bannerOn)
                return i;
        }
        return 0;
    })();

    setInterval(function nextBanner() {
        let id = bannerId + 1 < banners.length ? bannerId + 1 : 0;
        updateBanner(id);
    }, 5000);
    for (let i = 0; i < bannersButt.length; i++) {
        bannersButt[i].addEventListener('click', function () { updateBanner(i); });
    }
    function updateBanner(id) {
        bannersButt[bannerId].classList.remove('on');
        bannersButt[id].classList.add('on');
        banners[bannerId].classList.remove('on');
        banners[id].classList.add('on');
        bannerId = id;
    }

    let boxs = document.getElementById('boxs');
    let boxsLeft = boxs.offsetLeft;
    let boxButt = document.getElementsByClassName('indexpro')[0].children[1].children[0].children;
    setInterval(function nextBox() {
        let target = boxsLeft - 260 < -1040 ? 0 : boxsLeft - 260;
        updateBoxButt(target);
        updateBox(target);
    }, 2000);
    for (let i = 0; i < boxButt.length; i++) {
        boxButt[i].addEventListener('click', function () {
            let target = i * -1040;
            updateBox(target);
            updateBoxButt(target);
        });
    }
    function updateBoxButt(target) {
        if (target === 0 && !boxButt[0].classList.contains('on')) {
            boxButt[0].classList.add('on');
            boxButt[1].classList.remove('on');
        } else if (target === -1040 && !boxButt[1].classList.contains('on')) {
            boxButt[0].classList.remove('on');
            boxButt[1].classList.add('on');
        };
    }
    function updateBox(targetX) {
        clearInterval(boxs.timer);
        boxs.timer = setInterval(function movBox() {
            let speed = (targetX - boxs.offsetLeft) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            boxs.style.left = boxs.offsetLeft + speed + 'px';
            if (Math.abs(targetX - boxs.offsetLeft) <= Math.abs(speed)) {
                boxs.style.left = targetX + 'px';
                boxsLeft = boxs.offsetLeft;
                clearInterval(boxs.timer);
            }
        }, 15)
    }

    document.getElementsByClassName('hamburger')[0].addEventListener('click', function () {
        let ul = document.getElementsByTagName('nav')[0].children[1];
        if (getCSS(ul, 'display') === 'none') {
            ul.style.display = 'block';
        } else {
            ul.style.display = 'none';
        }
    });

    let topButt = document.getElementsByClassName('top')[0];
    timer = null;
    topButt.addEventListener('click', function toTop() {
        clearInterval(timer);
        timer = setInterval(function scrollUp() {
            let y = scroll().top;
            let speed = Math.ceil(y / 10);
            window.scrollTo(0, y - speed);
            if (y <= speed) {
                window.scrollTo(0, 0);
                clearInterval(timer);
            }
        }, 10);
    });

    function getCSS(el, attr) {
        if (window.getComputedStyle) {
            return attr ? window.getComputedStyle(el, null)[attr] : window.getComputedStyle(el, null);
        }
        return attr ? el.currentStyle[attr] : el.currentStyle;
    }

    function scroll() {
        if (window.pageYOffset !== undefined) {
            return {
                top: window.pageYOffset,
                left: window.pageXOffset
            }
        } else if (document.compatMode === 'CSS1Compat') {
            return {
                top: document.documentElement.scrollTop,
                left: document.documentElement.scrollLeft
            }
        }
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
}