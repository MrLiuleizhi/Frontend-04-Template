let pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
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
            cell.innerHTML = pattern[i][j] == 2 ? "×" :
                pattern[i][j] ==1 ? "○" : ""
            cell.addEventListener('click',() => move(j,i));
            board.appendChild(cell);
        }
        board.appendChild(document.createElement("br"));
    }
}

/**
 * cell点击事件
 */
function move(j ,i){
    if(pattern[i][j] === 0){
        pattern[i][j] = color;
        if(check(pattern,color)){
            alert(color == 2 ? "× is winner" : "○ is winner");
        }
        color = 3 - color;
        show();
        if(willWin(pattern,color)){
            console.log(color == 2 ? "× will win" : "○ will win");
        }
    }
}
function check(pattern,color){
    for(let i = 0; i<3; i++){
        let win = true;
        for(let j = 0; j<3; j++){
            if(pattern[i][j] !== color){
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
            if(pattern[j][i] !== color){
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
            if(pattern[j][j] !== color){
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
            if(pattern[j][2-j] !== color){
                win = false;
            }
        }
        if(win){
            return true;
        }
    }
    return false;
}
function willWin(pattern,color){
    for(let i = 0; i<3 ; i++){
        for(let j = 0; j<3; j++){
            if(pattern[i][j]){
                continue;
            }
            let tmp = JSON.parse(JSON.stringify(pattern));
            tmp[i][j] = color;
            if(check(tmp,color)){
                return true;
            }
        }
    }
    return false;
}
show();