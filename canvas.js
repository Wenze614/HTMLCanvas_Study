var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillStyle = "rgba(142, 235, 214, 0.7)"
// c.fillRect(100,100,100,100)
// c.fillStyle = "rgba(142, 133, 114, 0.7)"
// c.fillRect(200,200,100,100)
// c.fillStyle = "rgba(242, 235, 114, 0.7)"
// c.fillRect(300,300,100,100)

// line
// c.beginPath();
// c.moveTo(0, 0);
// c.lineTo(1000, 1000);
// c.lineTo(150, 450);
// c.lineTo(900, 900);
// c.strokeStyle = "#243524";
// c.stroke();

//arc
// c.beginPath();
// c.arc(500, 500, 30, 0, Math.PI*2)
// c.strokeStyle = "red"
// c.stroke();

// var i = 0;
// var x = 400;
// var y = 400;

// for (;i<10;i++) {
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI*2);
//     c.strokeStyle = "red";
//     c.stroke();
//     x += 100;
//     y += 100;
// }

var mouse = {
    x:undefined,
    y:undefined
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
window.addEventListener('click', function(){
    init();
})
function Circle(x, y, radius, vx, vy, color, gravity,fraction){
    this.x = x;
    this.y = y;
    this.ori_x = x;
    this.ori_y = y;
    this.ori_radius = radius;
    this.radius = this.ori_radius;
    this.ori_vx = vx;
    this.ori_vy = vy;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.active = false;
    this.gravity = gravity;
    this.fraction = fraction;
    this.reset = function(){
        this.x = this.ori_x;
        this.y = this.ori_y;
        this.vx = this.ori_vx;
        this.vy = this.ori_vy;
        this.radius = this.ori_radius;
    }
    this.draw = function (){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    // this.get_distance = function(){
    //     var distance = Math.sqrt((mouse.x-this.x)**2+(mouse.y-this.y)**2);
    //     console.log(distance)
    //     return distance
    // }
    this.update = function(){
        this.draw();
        var distance = Math.sqrt((mouse.x-this.x)**2+(mouse.y-this.y)**2);
        // var condition = (mouse.x - this.x)<50 && (mouse.x - this.x) > -50 && (mouse.y -this.y) <50 && (mouse.y - this.y) > -50;
        if(distance < 100){
            if(this.radius < 50){
                this.radius += 3;
            }
        }
        else if(this.radius > this.ori_radius){
            this.radius -= 1;
        }
        if(this.x+this.radius > innerWidth||this.x-this.radius < 0){
            this.vx = -this.vx
        }
        if(this.y+this.radius>innerHeight||this.y-this.radius<0){
            this.vy = -this.vy
        }    
        this.x += this.vx;
        this.y += this.vy;

    }
    this.dropDown = function(){
        this.draw();
        if(this.y+this.radius+this.vy>innerHeight||this.y-this.radius<0){
            this.vy = -this.vy*(1-this.fraction)
        }
        else{
            this.vy += this.gravity
        }
        if(this.x+this.radius + this.vx > innerWidth||this.x-this.radius < 0){
            this.vx = -this.vx*(1-this.fraction)
        }
        if (this.vy <=0.1 && this.vy >= -0.1){
            this.vx *= 0.99
        }
        this.y += this.vy;  
        this.x += this.vx;

    }
}


const colors = ["#FBA922", "#F0584A", "#2B5877", "#1194A8", "#1FC7B7"];

function new_circle(){
    var radius = 1+Math.random()*10;
    var x = radius+Math.random()*(innerWidth-2*radius);
    var y = radius+(Math.random()*(innerHeight-2*radius))*0.1  ;
    var vx = (Math.random()-0.5)*3;
    var vy = 1+Math.random()*5;
    var gravity = 1;
    var fraction = 0.2;
    var color = colors[Math.floor(Math.random()*colors.length)]
    var my_circle = new Circle(x, y, radius, vx, vy,color,gravity,fraction)
    return my_circle;
}
function circle_group(num){
    var circles = []
    for (i=0;i<=num;i++){
        var circle = new_circle();
        circles.push(circle)
    }
    return circles
}
var circles = [];
function init(){
    circles = [];
    circles = circle_group(400);
}
// var circles = circle_group(500);
init();
function anime(){
    requestAnimationFrame(anime);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circles.forEach(function(circle){
        circle.update();
    })
}
anime();
// function anime(){
//     requestAnimationFrame(anime);
//     c.clearRect(0, 0, innerWidth, innerHeight);
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI*2);
//     c.strokeStyle = 'black'
//     c.stroke();
//     if(x+radius > innerWidth||x-radius < 0){
//         vx = -vx
//     }
//     if(y+radius>innerHeight||y-radius<0){
//         vy = -vy
//     }
//     x += vx;
//     y += vy;
// }

// anime()