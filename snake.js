Snake = function () {
    this.init();
};

Snake.prototype = {
    wholeSnake: {},
    snakeHead: {},
    snakeRoute: [],
    snakeLength: 0,
    food: {},
    movementDirection: 39,
    movementInterval: null,
    scoreBoard: {},
    app: document.getElementById('app'),

    createParticle: function () {
        var newParticle = document.createElement('div');
        newParticle.classList.add('snake-particle');
        this.snakeLength++;
        if(this.snakeRoute.length === 0){
            this.snakeRoute.push(this.movementDirection);
        } else{
            this.snakeRoute.push(this.snakeRoute[this.snakeRoute.length-1]);
        }
        return newParticle;
    },
    createSnake: function () {
        this.wholeSnake = document.createElement('div');
        this.wholeSnake.classList.add('whole-snake');
        this.addSnakeParticle();
        this.app.appendChild(this.wholeSnake);
    },
    moveSnake: function () {
        var snake = this;
        this.movementInterval = setInterval(function () {
            if(snake.detectFoodCollision() === true){
                snake.addSnakeParticle();
                snake.eatFood();
                snake.createFood();
                snake.addScore();
            }

            if(snake.detectFieldCollision() === true){
                snake.stopSnake()
            }
            else{
                for (let i = 0; i < snake.wholeSnake.childNodes.length; i++){
                    if(snake.snakeRoute[i] === 39){
                        var particlePosition = parseInt(snake.wholeSnake.childNodes[i].style.left, 10) || 0;
                        snake.wholeSnake.childNodes[i].style.left = +particlePosition + 10 + 'px';
                    } else if(snake.snakeRoute[i] === 37){
                        var particlePosition = parseInt(snake.wholeSnake.childNodes[i].style.left, 10) || 0;
                        snake.wholeSnake.childNodes[i].style.left = (+particlePosition - 10) + 'px';
                    } else if(snake.snakeRoute[i] === 38){
                        var particlePosition = parseInt(snake.wholeSnake.childNodes[i].style.top, 10) || 0;
                        snake.wholeSnake.childNodes[i].style.top = (+particlePosition - 10) + 'px';
                    } else if(snake.snakeRoute[i] === 40){
                        var particlePosition = parseInt(snake.wholeSnake.childNodes[i].style.top, 10) || 0;
                        snake.wholeSnake.childNodes[i].style.top = (+particlePosition + 10) + 'px';
                    }
                }
                for(let i = snake.snakeRoute.length-1; i > 0; i--){
                    snake.snakeRoute[i] = snake.snakeRoute[i-1];
                }
            }
        }, 200)
    },
    stopSnake: function () {
        clearInterval(this.movementInterval);
    },
    changeMoveSnake: function () {
        var snake = this;
        window.addEventListener('keydown', (event) => {
            if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
                snake.movementDirection = event.keyCode;
                snake.snakeRoute[0] = event.keyCode;
            }
        });
    },
    addSnakeParticle: function () {
        var newParticle = this.createParticle();
        this.wholeSnake.appendChild(newParticle);
        if(this.snakeLength > 1){
            if(this.snakeRoute[this.snakeRoute.length-1] === 39){
                newParticle.style.left = newParticle.previousSibling.offsetLeft - 10 + 'px';
                newParticle.style.top = newParticle.previousSibling.offsetTop + 'px';
            } else if(this.snakeRoute[this.snakeRoute.length-1] === 37){
                newParticle.style.left = newParticle.previousSibling.offsetLeft + 10 + 'px';
                newParticle.style.top = newParticle.previousSibling.offsetTop + 'px';
            } else if(this.snakeRoute[this.snakeRoute.length-1] === 38){
                newParticle.style.left = newParticle.previousSibling.offsetLeft + 'px';
                newParticle.style.top = newParticle.previousSibling.offsetTop + 10 + 'px';
            } else if(this.snakeRoute[this.snakeRoute.length-1] === 40){
                newParticle.style.left = newParticle.previousSibling.offsetLeft + 'px';
                newParticle.style.top = newParticle.previousSibling.offsetTop - 10 + 'px';
            }
        } else {
            this.snakeHead = newParticle;
        }
    },
    getFieldBoundaries: function () {
        var bounderies = this.app.getBoundingClientRect();
        return bounderies;
    },
    getSnakeBoundaries: function () {
        return this.snakeHead.getBoundingClientRect();
    },
    getFoodBoundaries: function () {
        return this.food.getBoundingClientRect();
    },
    detectFieldCollision: function () {
        var snakeBoundaries = this.getSnakeBoundaries();
        var fieldBoundaries = this.getFieldBoundaries();
        if(snakeBoundaries.top-10 <= fieldBoundaries.top && this.movementDirection === 38){
            console.log('You lose');
            return true;
        } else if (snakeBoundaries.bottom+10 >= fieldBoundaries.bottom && this.movementDirection === 40){
            console.log('You lose');
            return true;
        } else if (snakeBoundaries.left-10 <= fieldBoundaries.left && this.movementDirection === 37){
            console.log('You lose');
            return true;
        } else if (snakeBoundaries.right+10 >= fieldBoundaries.right && this.movementDirection === 39){
            console.log('You lose');
            return true;
        }
        else {
            return false;
        }
    },
    detectFoodCollision: function () {
        var snakeBoundaries = this.getSnakeBoundaries();
        var foodBoundaries = this.getFoodBoundaries();
        if(snakeBoundaries.right === foodBoundaries.left && this.movementDirection === 39 && snakeBoundaries.top === foodBoundaries.top){
            console.log('eat');
            return true;
        } else if (snakeBoundaries.bottom === foodBoundaries.top && this.movementDirection === 40 && snakeBoundaries.left === foodBoundaries.left){
            console.log('eat');
            return true;
        } else if (snakeBoundaries.left === foodBoundaries.right && this.movementDirection === 37 && snakeBoundaries.top === foodBoundaries.top){
            console.log('eat');
            return true;
        } else if (snakeBoundaries.top === foodBoundaries.bottom && this.movementDirection === 38 && snakeBoundaries.left === foodBoundaries.left){
            console.log('eat');
            return true;
        } else{
            return false;
        }
    },
    createFood: function () {
        this.food = document.createElement('div');
        this.food.id = 'food';
        this.app.appendChild(this.food);
        this.food.style.top = this.getRandomInt(0, 29) * 10 + 'px';
        this.food.style.left = this.getRandomInt(0, 29) * 10 + 'px';

    },
    eatFood: function () {
        this.food.parentNode.removeChild(this.food);
    },
    createScoreBoard: function () {
        this.scoreBoard = document.createElement('div');
        this.scoreBoard.id = 'score-board';
        this.scoreBoard.innerHTML = '0';
        document.body.insertBefore(this.scoreBoard, this.app);
    },
    addScore: function () {
        var oldScore = +this.scoreBoard.innerHTML;
        this.scoreBoard.innerHTML = oldScore + 10;
    },
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    init: function () {
        this.createScoreBoard();
        this.createSnake();
        this.createFood();
        this.moveSnake();
        this.changeMoveSnake();



    }
};

