const shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke("white");
  strokeWeight(2);
  frameRate(5);
  shapes.push(new Triangle());
}

function draw() {
  shapes.forEach(s => s.update().render());
}

class Triangle {
  constructor() {
    this.r = 20;
    this.position = createVector(0, 0);
    this.heading = createVector(mouseX, mouseY);
  }
  update() {
    // vector in direction of mouse
    const mousePosition = createVector(mouseX, mouseY);
    const diff = p5.Vector.sub(mousePosition, this.position);
    this.position.add(diff.limit(20));
    this.heading = diff.heading();
    console.log(this.rotation);
    return this;
  }
  render() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading + Math.PI / 2);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
