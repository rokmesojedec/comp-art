class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Square {
    constructor({ start = new Point(), ctx = null, previousSquare = null }) {
        this.start = start;
        this.end = new Point(
            start.x + this.constructor.size,
            start.y + this.constructor.size);
        this.ctx = ctx;
        this.previousSquare = previousSquare;

        Square.takenSpace.push(this.start);

        this.availablePaths = [];

        //left
        if ((this.start.x - Square.size) >= 0 && !this.isLocationTaken(this.start.x - Square.size, this.start.y)) this.availablePaths.push(new Point(this.start.x - Square.size, this.start.y));
        //right
        if ((this.start.x + Square.size) <= Square.widthEnd && !this.isLocationTaken(this.start.x + Square.size, this.start.y)) this.availablePaths.push(new Point(this.start.x + Square.size, this.start.y));
        //up
        if ((this.start.y - Square.size) >= 0 && !this.isLocationTaken(this.start.x, this.start.y - Square.size)) this.availablePaths.push(new Point(this.start.x, this.start.y - Square.size));
        //down
        if ((this.start.y + Square.size) <= Square.heightEnd && !this.isLocationTaken(this.start.x, this.start.y + Square.size)) this.availablePaths.push(new Point(this.start.x, this.start.y + Square.size));
    }

    isLocationTaken(x, y) {
        for (let i = 0; i < Square.takenSpace.length; i++) {
            let point = Square.takenSpace[i];
            if (point.x == x && point.y == y) return true;
        }
        return false;
    }

    getNextLocation() {
        if (this.availablePaths.length == 0) return null;
        let pickIndex = Math.floor(Math.random() * this.availablePaths.length);
        let location = this.availablePaths.splice(pickIndex, 1)[0];
        if (this.isLocationTaken(location.x, location.y)) return this.getNextLocation();
        return location;
    }


  
    randomColor() {
        return Square.colors[Math.floor(Math.random() * Square.colors.length)];
    }
    draw() {
        if (Math.random() < 0.15) {
            this.drawShape({ shape: "square", color: this.randomColor() });
            this.drawShape({ shape: "circle", color: this.randomColor() });
        }
        else {
            let color1, color2;
                color1 = this.randomColor();
                color2 = this.randomColor();
           
            this.drawShape({ shape: "top", color: this.randomColor() });
            this.drawShape({ shape: "left", color: this.randomColor() });
            this.drawShape({ shape: "bottom", color: this.randomColor() });
            this.drawShape({ shape: "right", color: this.randomColor() });
        }
        // this.drawQuadrant({ position: "left", color: Square.colors[Math.floor(Math.random() * Square.colors.length)] });
        // this.drawQuadrant({ position: "right", color: Square.colors[Math.floor(Math.random() * Square.colors.length)] });
    }

    drawShape({
        shape = "top",
        color = "black"
    } = {}) {
        let firstPoint = secondPoint = thirdPoint = null;
        let halfSize = Math.ceil(this.constructor.size / 2);


        if (shape == "circle") {
            let ctx = this.ctx;
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.arc(this.start.x + halfSize, this.start.y + halfSize, halfSize-1, 0, 2 * Math.PI);
            ctx.fill();
        }
        else if (shape == "square") {
            let ctx = this.ctx;
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.moveTo(this.start.x, this.start.y);
            ctx.lineTo(this.end.x, this.start.y);
            ctx.lineTo(this.end.x, this.end.y);
            ctx.lineTo(this.start.x, this.end.y);
            ctx.fill();
        } else {
            switch (shape.toLowerCase()) {
                case "top":
                    firstPoint = new Point(this.start.x, this.start.y);
                    secondPoint = new Point(this.end.x, this.start.y);
                    thirdPoint = new Point(this.start.x + halfSize, this.start.y + halfSize)
                    break;
                case "bottom":
                    firstPoint = new Point(this.start.x, this.end.y);
                    secondPoint = new Point(this.end.x, this.end.y);
                    thirdPoint = new Point(this.start.x + halfSize, this.start.y + halfSize)
                    break;
                case "left":
                    firstPoint = new Point(this.start.x, this.start.y);
                    secondPoint = new Point(this.start.x, this.end.y);
                    thirdPoint = new Point(this.start.x + halfSize, this.start.y + halfSize)
                    break;

                case "right":
                    firstPoint = new Point(this.end.x, this.start.y);
                    secondPoint = new Point(this.end.x, this.end.y);
                    thirdPoint = new Point(this.start.x + halfSize, this.start.y + halfSize)
                    break;
                case "topright": {
                    firstPoint = new Point(this.start.x, this.start.y);
                    secondPoint = new Point(this.end.x, this.start.y);
                    thirdPoint = new Point(this.end.x, this.end.y);
                    break;
                }
                case "bottomleft": {
                    firstPoint = new Point(this.start.x, this.start.y);
                    secondPoint = new Point(this.start.x, this.end.y);
                    thirdPoint = new Point(this.end.x, this.end.y)
                    break;
                }
            }
            if (this.ctx != null) {
                let ctx = this.ctx;
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.moveTo(firstPoint.x, firstPoint.y);
                ctx.lineTo(secondPoint.x, secondPoint.y);
                ctx.lineTo(thirdPoint.x, thirdPoint.y);
                ctx.fill();
            }
        }
    }
}
Square.size = 80;
Square.widthEnd = null;
Square.heightEnd = null;
Square.colors = ["#ffc857","#e9724c","#c5283d","#481d24","#255f85"];

//["#3B484A", "#ACB7B4", "#FBFBFB", "#D9EECC", "#C1A06A"]
//["#ffc857","#e9724c","#c5283d","#481d24","#255f85"]
//["#3b1f2b", "#db162f", "#dbdfac", "#5f758e", "#383961",]
//["#daddd8","#c7d59f","#b7ce63","#8fb339","#4b5842"]
//["#ffc857","#e9724c","#c5283d","#481d24","#255f85"];
Square.takenSpace = [];


window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    Square.widthEnd = window.innerWidth;
    Square.heightEnd = window.innerHeight;

    ctx.lineWidth = 1;

    let evenWidth = canvas.width;
    let evenHeight = canvas.height;

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gray";
    ctx.fill();


    for (let i = 2; i < evenHeight && i < evenWidth; i++) {
        if (evenWidth % i == 0 && evenHeight % i == 0)
            console.log(i)
    }
    let numberXSquares = Math.ceil(canvas.width / Square.size);
    let numberYSquares = Math.ceil(canvas.height / Square.size);

    let x = Math.floor(Math.random() * numberXSquares) * Square.size;
    let y = Math.floor(Math.random() * numberYSquares) * Square.size;

    var sq, preceedingSquare = null;
    var nextLocation = new Point(x, y);

    let drawCircle = function () {
        sq = new Square({ start: nextLocation, ctx: ctx, previousSquare: preceedingSquare });
        preceedingSquare = sq;
        sq.draw();
        nextLocation = sq.getNextLocation();
        if (nextLocation != null) window.requestAnimationFrame(drawCircle);
        else if (sq.previousSquare != null) {
            let previousSquare = sq.previousSquare;
            nextLocation = previousSquare.getNextLocation();
            while (previousSquare != null && nextLocation == null) {
                previousSquare = previousSquare.previousSquare;
                if (previousSquare != null)
                    nextLocation = previousSquare.getNextLocation();
            }
            if (nextLocation != null) {
                preceedingSquare = previousSquare;
                window.requestAnimationFrame(drawCircle);
            }
        }
    }

    window.requestAnimationFrame(drawCircle);


    // for (let x = 0; x < numbuerXSquares; x++) {
    //     for (let y = 0; y < numberYSquares; y++) {
    //         let square = new Square({ start: new Point(x * Square.size, y * Square.size), ctx: ctx });
    //     }
    // }




}  