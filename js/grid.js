var pubRow =0;
var pubCol = 0; 
var newRow = 0; 
var newCol = 0; 
var total = 0; //Total number of path cells. 
var publicMaze = cellArray(20);

var playerColumn= 0;
var playerRow = 0;

var canvas;
var ctx;
var WIDTH;
var HEIGHT;

var TurnDif = { //Randomness of turns.
min :1,
max :3
};

var downDif = { //Easy difficulty are large numbers. 
min : 19,
max : 20
};

function setP_Location(difLevel)
{
//change sizes every 2 levels. 


}

//timer code
var totalTime = 60;
var count=0;
var x;

function timer(){
x=setTimeout("timer()",1000);
totalTime-=1;
document.getElementById("timeText").innerHTML= totalTime;
}

function stoptimer(){
clearTimeout(x);
}
function clear(c) {
    c.clearRect(0, 0, WIDTH, HEIGHT);
}
var enumDirection = {

	LEFT: 1,
	RIGHT: 2,
	DOWN: 3
}

var cell = { //Cell object holding all propeties. 
 x: 0,
 y: 0,
 val: 0,
	printPos:function(){
		console.log(this.x + ":" + this.y);
	}
};

function ranVal( min,  max){
var randPoints = Math.round(Math.random() * (+max - +min) + +min); 
return randPoints;
}

function cellArray(size)
{
var maze =[];
var max = 1;
var min = 2;
	for(var i = 0; i< size; i++)
	{
	let row =[];
	var cells = {}; //Allows dynamic object creation inside a loop.
		for(var j = 0; j< size; j++)
		{
			var cellObj = cell;
			var random = Math.round(Math.random() * (+max - +min) + +min); 
			cells[j] = {x: i, y:j, val:0};
			row.push(cells[j]);
	 	}
	maze.push(row);	
	}
return maze;
}

function mv(x, direction)
{
	 	clear(ctx);
		var index = playerColumn + Number(x);
		console.log("x:" + x);
		publicMaze[playerColumn][playerRow].val = 1;
		
		console.log("PC: " + playerColumn + " PR:" + playerRow)
		publicMaze[index][playerRow].val = 6;
		playerColumn = index;
		createTable();
/*	switch(direction)
	{
		
		case 2:
	for(int i =playerColumn; i < playerColumn + points; i++ )
		{

		}

	}
	*/

}

function setPortals() //pass total number of available paths
{
var max = Math.round(total/2); 
var min = Math.round(max /2);
var randEnd = ranVal(min, max ); 
var count =0; //path occurence count. 
var endPortal = ranVal(randEnd, total);
//console.log("End Portal: "+ endPortal);
//grab 2 random points on a valid path. 
//place portals as id 4.
for(var y = 0; y < publicMaze.length; y++){
			for(var x= 0; x < publicMaze.length;x++)
			{

				if(publicMaze[x][y].val === 1)
				{
					if(count === min)
					{
					publicMaze[x][y].val = 4; //portal start
					}
					if(count === randEnd)
					{
					publicMaze[x][y].val = 4; //portal green arrow
					}
					
					if (count === endPortal) {
					publicMaze[x][y].val = 5; //portal end
					}
					count++;
				}
			}
		}
publicMaze[0][0].val = 6;
}

function createTable()
{
	canvas = document.getElementById("cnv");
	 ctx = canvas.getContext('2d');
	 HEIGHT = canvas.height;
    WIDTH = canvas.width;
	for(var y = 0; y < publicMaze.length; y++){
			for(var x= 0; x < publicMaze.length;x++)
			{
				if(publicMaze[x][y].val == 6) //Player
					{
					console.log("Player at " + x + ":" + y)
					ctx.fillStyle = "#000066";	
					ctx.fillRect(x*50, y*50, 50, 50);
					}
					else if(publicMaze[x][y].val == 1)
					{
						ctx.strokeStyle = "#003300";
						//console.log("White at " + x + ":" + y)
						//ctx.fillStyle = "white";
						//ctx.fillRect(x*50, y*50, 50, 50);
						ctx.strokeRect(x*50, y*50, 50, 50);
					}
					else if(publicMaze[x][y].val == 3)
					{
						ctx.fillStyle = "red";
						ctx.fillRect(x*50, y*50, 50, 50);
					}
					else if(publicMaze[x][y].val == 4)
					{
						ctx.fillStyle = "purple";
						ctx.fillRect(x*50, y*50, 50, 50);
					}
						else if(publicMaze[x][y].val == 5)
					{
					ctx.fillStyle = "#ccffff";	
						ctx.fillRect(x*50, y*50, 50, 50);
					}
					
					else
					{
						ctx.fillStyle = "black";
						ctx.fillRect(x*50, y*50, 50, 50);
					}
			}
		
		}
		
}

function genMaze() //Main method for creating random mazes
{
console.log(publicMaze)
	var status = false;
	while(!status)
	{
		var direction = enumDirection.RIGHT;
		itterateMaze(ranVal(1,15), direction);
		pubCol = newCol;
	 	
	 	direction = enumDirection.DOWN;
		status = itterateMaze(ranVal(3,5), direction);
		pubRow = newRow;

		if(status)
		return;

		//pubRow = newRow;
		direction = enumDirection.LEFT;
		itterateMaze(ranVal(1,10), direction);
		pubCol = newCol;

		direction = enumDirection.DOWN;
		status = itterateMaze(ranVal(3,5), direction);
		pubRow = newRow;
	if(status)
		return;
	}
		

}


function itterateMaze( points, direction) 
{
switch (direction)
{
	case 2:  //Right column movement. 

		for(var i = pubCol; i< points + pubCol; i++)
		{
			if(i > 19)
			{
				return false;
			}
			else
			{
				publicMaze[i][pubRow].val = 1;
				total++;
				newCol=i;
			}
		}
	break;

	case 3: //DOWN row movement. 
		for(var j = pubRow; j< points + pubRow; j++)
		{
			if(j > 19) //generation finished.
			{
				//alert("Finished Generating...");
				publicMaze[pubCol][j-1].val = 3; //End
				total++;
				return true;
			}
			else
			{
				publicMaze[pubCol][j].val = 1;
				total++;
				newRow =j;
			}
		}
	break;

	case 1: //LEFT column movement.
	for(var x = pubCol; x > pubCol - points; x--)
		{
			if(x < 1)
			{
				//newCol++;
				return false;
			}
			else
			{
				publicMaze[x][pubRow].val = 1;
				total++;
				newCol=x;
			}
		}
	break;
	}
}

genMaze(); //Generate the random maze. 
setPortals();
createTable();