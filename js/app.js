// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.top=[63,146,229]      //用来存储可能出现的Y轴的位置
    this.sprite = 'images/enemy-bug.png';
    this.x=-200;
    this.y= this.top[Math.floor(Math.random()*2)];
    this.speed=Math.floor(Math.random()*800+200) ;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.  
        this.x+=this.speed*dt;
        if(this.x>=505){           //当敌人运行至屏幕外面时，重新设置相应的位置和速度
            this.x=-200;
            this.y= this.top[Math.floor(Math.random()*3)];
            this.speed=Math.floor(Math.random()*800+200) ;
        }
        if(this.x>=player.x && this.x<=player.x+101  && this.y>=player.y &&this.y<=player.y+83){
            player.reset();               //发生碰撞时重置player的位置
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player=function(img){           
    this.sprite =img?img: 'images/char-pink-girl.png';      //接收一个图片的url
    this.x=202;
    this.y=394;
    this.lastX=202;       //用来存储上一次开始的x位置
};
Player.prototype.update=function(){};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(directions){     //上，右，下，左，控制键操作时的函数
    if(directions==='left'){
        this.x-=101;
        if(this.x<=0){           //边界处理
            this.x=0;
        }
    }
    if(directions==='right'){
        this.x+=101;
        if(this.x>=505){
            this.x=404;
        }
    }
    if(directions==='up'){
        if(this.y==394){
            this.lastX=this.x;        //保存刚开始往上走时，x的位置
        }
        this.y-=83;
        if(this.y<=0){
            this.reset();             //到达水域后重置
        }
    }
    if(directions==='down'){
        this.y+=83;
        if(this.y>=394){
            this.y=394;
        }
    }

};
Player.prototype.reset=function(){           //玩家位置重置
    this.y=394;
    this.x=this.lastX;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

var allEnemies=[new Enemy(),new Enemy(),new Enemy()];
var player=new Player();
document.addEventListener('keyup', function(e) {
	roles.style.opacity=0;        //当角色开始走动时隐藏选择角色的按钮
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//以下是选角色的操作
var selectorRole=document.getElementById('selectorRole');
var roles=document.getElementById('roles');
selectorRole.addEventListener('click',function(){     //角色选择按钮
    //角色列表如果已经存在就隐藏，反之出现
	roles.style.opacity==1?roles.style.opacity=0:roles.style.opacity=1;	
});
roles.addEventListener('click',function(e){          
	if(e.target.nodeName=='INPUT'){
		var x=player.x;                  //存储更换角色前角色的位置
		var y=player.y;
		var src=e.target.src;
		var imgUrl=src.split('80/')[1];	        //角色的路径
		player=new Player(imgUrl);
		player.x=x;                    //更换角色，不更换角色所在的位置
		player.y=y;
		this.style.opacity=0;	
	}		
})