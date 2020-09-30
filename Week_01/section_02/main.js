let pattern = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

let color = 1;
 
/**
 * 初始化显示方法
 */
function show(){
    let board = document.getElementById("board");
    board.innerHTML = "";
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerHTML = pattern[i * 3 + j] == 2 ? "×" :
                pattern[i * 3 + j] ==1 ? "○" : ""
            cell.addEventListener('click',() => userMove(j,i));
            board.appendChild(cell);
        }
        board.appendChild(document.createElement("br"));
    }
}

/**
 * cell点击事件
 */
function userMove(j ,i){
    if(pattern[i * 3 + j] === 0){
        pattern[i * 3 + j] = color;
        if(check(pattern,color)){
            alert(color == 2 ? "× is winner" : "○ is winner");
        }
        color = 3 - color;
        console.log(bestChoice(pattern, color));
        show();
        computerMove();
    }
}
function check(pattern,color){
    for(let i = 0; i<3; i++){
        let win = true;
        for(let j = 0; j<3; j++){
            if(pattern[i * 3 + j] !== color){
                win = false;
            }
        }
        if(win){
            return true;
        }
    }
    for(let i = 0; i<3; i++){
        let win = true;
        for(let j = 0; j<3; j++){
            if(pattern[j * 3 + i] !== color){
                win = false;
            }
        }
        if(win){
            return true;
        }
    }
    {
        let win = true;
        for(let j = 0; j<3; j++){
            if(pattern[j * 3 + j] !== color){
                win = false;
            }
        }
        if(win){
            return true;
        }
    }
    {
        let win = true;
        for(let j = 0; j<3; j++){
            if(pattern[j * 3 + 2 -j] !== color){
                win = false;
            }
        }
        if(win){
            return true;
        }
    }
    return false;
}
function clone(pattern){
   return Object.create(pattern);
}
function willWin(pattern,color){
    for(let i = 0; i<3 ; i++){
        for(let j = 0; j<3; j++){
            if(pattern[i * 3 + j]){
                continue;
            }
            let tmp = clone(pattern);
            tmp[i * 3 + j] = color;
            if(check(tmp,color)){
                return [j, i];
            }
        }
    }
    return null;
}
function bestChoice(pattern, color){
    let point = willWin(pattern,color);
    if(point){
        return {
            point: point,
            result: 1
        }
    } 
   let result = -1;
   outer:for(let i = 0; i<3; i++){
    for(let j = 0; j<3; j++){
        if(pattern[i * 3 + j] !== 0){
            continue;
        }
        let tmp = clone(pattern);
        tmp[i * 3 + j] = color;
        let opp = bestChoice(tmp, 3 - color);
        if(-opp.result >= result){
            point = [j,i];
            result = -opp.result;
        }
        if(result == 1){
            break outer;
        }
    }
   }
    return {
        point: point,
        result: point ? result : 0
    }
}
function computerMove(){
    let choice = bestChoice(pattern, color);
    if(choice.point){
        pattern[choice.point[1] * 3 + choice.point[0]] = color;
    }
    if(check(pattern, color)){
        alert(color == 2 ? "× is winner" : "○ is winner!");
    }
    color = 3-color;
    show();
}
show();