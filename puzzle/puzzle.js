var time = 0;
var pause = false;
var start = false;

var startButtom;
var record;
var pauseButtom;
var puzzle;
var restartButtom;
var showTime;
var puzzleArr = [];
var blank;

window.onload = function () {

    startButtom = document.getElementById('start');
    record = document.getElementById('record');
    pauseButtom = document.getElementById('pause');
    puzzle = document.querySelector('.puzzle');
    restartButtom = document.getElementById('restart');
    showTime = record.firstElementChild.lastElementChild;
    blank = document.querySelector('.blank');

    initialize(puzzle);

    startButtom.onclick = startGame;
    pauseButtom.onclick = pauseGame;
    restartButtom.onclick = restartGame;
    for (let i = 0; i < 9; ++i) {
        puzzle.children[i].onclick = removePuzzle;
    }
    setInterval(count, 1000);
}

function initialize(puzzleArea) {
    puzzleArr.splice(0, puzzleArr.length);
    for (let i = 0; i < 9; ++i) {
        puzzleArr.push(puzzleArea.children[i]);
    }
    puzzleArr.sort(() => 0.5 - Math.random());
    puzzleArr.forEach(element => puzzleArea.append(element));
    for (let i = 0; i < 9; ++i) {
        puzzleArea.children[i].style.left = (i % 3) * 150 + 'px';
        puzzleArea.children[i].style.top = Math.floor(i / 3) * 150 + 'px';
    }
}

function startGame() {
    start = true;
    pause = false;
    startButtom.setAttribute('hidden', true);
    record.removeAttribute('hidden');
    count();
}

function pauseGame() {
    pause = !pause;
    //a cover to stop player removing the puzzle
    if (pause) {
        for (let i = 8; i >= 0; --i) {
            puzzle.children[i].remove();
        }
        puzzle.innerHTML = '<b> (´・ω・)つ旦</b>';
    } else {
        puzzle.innerText = '';
        puzzleArr.forEach(element => puzzle.append(element));
    }
}

function restartGame() {
    initialize(puzzle);
    time = 0;
    start = false;
    pause = false;
    record.setAttribute('hidden', true);
    startButtom.removeAttribute('hidden');
    var del = document.querySelector('#congratulations');
    if (del) {
        del.remove();
    }
}

function count() {
    if (!pause && start) {
        updateTime();
        time++;
    }
}

function updateTime() {
    var string;
    var hour = Math.floor(time / 3600);
    var minute = Math.floor(time % 3600 / 60);
    if (time < 60) {
        string = time + '秒';
    } else if (time < 3600) {
        string = minute + '分' + time % 60 + '秒';
    } else {
        string = hour + '时' + minute + '分' + time % 3600 % 60 + '秒';
    }
    showTime.innerHTML = string;
}

function removePuzzle() {
    if (start && !pause) {
        var index = puzzleArr.indexOf(this);
        var blankInd = puzzleArr.indexOf(blank);
        if (blankInd == index + 1 || blankInd == index - 1 || blankInd == index + 3 || blankInd == index - 3) {
            [puzzleArr[index], puzzleArr[blankInd]] = [puzzleArr[blankInd], puzzleArr[index]];
            [blank.style.top, this.style.top] = [this.style.top, blank.style.top];
            [blank.style.left, this.style.left] = [this.style.left, blank.style.left];
            check();
        }
    } else {
        var info = document.createElement('p');
        info.style.marginLeft = '15px';
        info.style.fontSize = '20px';
        if (Math.random() < 0.5) {
            info.innerText = '\\屠龙宝刀点击就送/';
        } else {
            info.innerText = '\\是兄弟就来砍我!/';
        }
        document.querySelector('.menu').insertBefore(info, startButtom);
        setTimeout('document.querySelector(".menu").children[0].remove();', 600);
    }
}

function check() {
    var checkArr = [];
    puzzleArr.forEach(element => checkArr.push(element.innerText));
    if (checkArr.join('-') == '1-2-3-4-5-6-7-8-') {
        congra = document.createElement('p');
        congra.innerHTML = '恭喜你完成了这个无聊的游戏！';
        congra.setAttribute('id', 'congratulations');
        start = false;
        congra.style.color = 'red';
        record.firstElementChild.append(congra);
    }
}