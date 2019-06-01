var time = 0;
var pause = true;
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
    //todo: a cover to stop player removing the puzzle
    // var cover = document.createElement('span');
    // cover.innerHTML='<span style="background-color: while width:450px height:450px">暂停中</span>';
    // if (pause) {
        //     puzzle.append(cover);
        // }
    }
    
    function restartGame() {
        initialize(puzzle);
        time = 0;
        record.setAttribute('hidden', true);
        startButtom.removeAttribute('hidden');
        var del = document.querySelector('#congratulations');
        if(del){
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
        // console.log(index+','+blankInd);
        if (blankInd == index + 1 || blankInd == index - 1 || blankInd == index + 3 || blankInd == index - 3) {
            [puzzleArr[index], puzzleArr[blankInd]] = [puzzleArr[blankInd], puzzleArr[index]];
            puzzleArr.forEach(element => puzzle.append(element));
            check();
        }
    }
}

function check() {
    var checkArr = [];
    puzzleArr.forEach(element => checkArr.push(element.innerText));
    console.log(checkArr);
    if (checkArr.join('-') == '1-2-3-4-5-6-7-8-') {
        congra = document.createElement('p');
        congra.innerHTML = '恭喜你完成了这个无聊的游戏！';
        congra.setAttribute('id','congratulations');
        start = false;
        congra.style.color = 'red';
        record.firstElementChild.append(congra);
    }
}