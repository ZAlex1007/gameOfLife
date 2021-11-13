let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = 700

// size of the square
let size=20;

time=300;

// Number of squares (w,h)
let w=parseInt(canvas.width/size);
let h=parseInt(canvas.height/size);

let emptyCells=new Array(h);
for (let i=0; i<emptyCells.length; i++) {
    emptyCells[i] = new Array(w).fill(0); 
}
let cells= emptyCells;

canvas.addEventListener("click",(e)=>{
    if(!paused) return;
    let x=Math.ceil(e.clientX/20)-1;
    let y=Math.ceil(e.clientY/20)-1
    cells[y][x]=1;
    ctx.beginPath();
    ctx.fillStyle = "#000000"; 
    ctx.rect(x*20, y*20, size, size)
    ctx.fill();
    ctx.stroke();
});

canvas.addEventListener("contextmenu",(e)=>{
    if(!paused) return;
    let x=Math.ceil(e.clientX/20)-1;
    let y=Math.ceil(e.clientY/20)-1
    cells[y][x]=0;

    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF"; 
    ctx.rect(x*20, y*20, size, size)
    ctx.fill();
    ctx.stroke();

    e.preventDefault()
})



function numberOfNeighbours(_cells, i, j){
    let number = 0;
    for (let a = i-1; a <= i+1; a++) {
        for (let b = j-1; b <= j+1; b++) {  
            if(a==i && b==j) continue
            if(_cells[a] != undefined)
                number+=_cells[a][b] || 0;
        }
    }
    return number
}

let generation=0;
let paused=1   
function draw(){
    let nextGen=new Array(h);
    for (let i=0; i<nextGen.length; i++) {
        nextGen[i] = new Array(w).fill(0); 
    }
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {  
            let neigh=numberOfNeighbours(cells,i,j)
            ctx.beginPath();
            if(cells[i][j]==1){
                if(neigh==2 || neigh==3) nextGen[i][j]=1   
                ctx.fillStyle = "#000000"; 
                
            } else{ 
                if(neigh==3) nextGen[i][j]=1
                ctx.fillStyle = "#FFFFFF";    
            }    
            ctx.strokeStyle = '#4a4a4a';
            ctx.lineWidth = 0.2;
            
            ctx.rect(j*20, i*20, size, size)
            ctx.fill();
            ctx.stroke();
        }
    }
    
    if(!paused){
        cells=nextGen
        // if(cells==emptyCells) pause()
        generation++
        document.getElementById("gen").innerHTML=`Generation: ${generation}`
    } 
    setTimeout(draw,time);
}

draw()


function pause(){
    paused = paused ? 0:1
    document.getElementById("pause").innerHTML = paused ? "<i class='fas fa-play'></i>": "<i class='fas fa-pause'></i>"
}

function setTime(value){
    time= (time>100) ? time+value : 100
    document.getElementById("time").innerHTML=`Time: ${time}ms`
}

function reset(){
    cells=emptyCells;
    console.log(emptyCells)
    paused=0
    pause()
    generation=0
    time=300
    setTime(0)
}