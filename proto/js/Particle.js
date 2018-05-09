class Particle {
  constructor({ sketch, position }) {
    const { createVector } = sketch;
    this.sketch = sketch || null;
    this.radius = 10;
    this.position = position || createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxVelocity = 100;
    this.color = "white";

    // for verlet integration we need to keep track of the old position
    // We calculate where the particle would have been in the past
    this.previousPosition = createVector(
      this.position.x - this.velocity.x,
      this.position.y - this.velocity.y
    );
  }

  /*
  * returns a vector from this particle's position
  * to another particle's position
  */
  getVectorTo(anotherParticle) {
    return anotherParticle.position.copy().sub(this.position);
  }

  /**
   * returns the distance^2 (magnitude) between
   * this particle and another particle
   *
   * this function may be more useful in particle systems
   * since we avoid finding the distance (which involves
   * a sqrt) and then squaring it again.
   */
  getDistSqTo(anotherParticle) {
    let dx = this.position.x - anotherParticle.position.x;
    let dy = this.position.y - anotherParticle.position.y;
    return dx * dx + dy * dy;
  }

  getDistTo(anotherParticle) {
    if (!(anotherParticle instanceof Particle)) {
      throw Error(
        `getDistanceTo(): cannot get distance between ${this} and other particle '${anotherParticle}'`
      );
    }

    return this.position.dist(anotherParticle.position);
  }

  correctForEdgeWrap() {
    // off right edge, wrap around to left
    if (this.position.x > this.sketch.width) {
      this.position.x = 0;
      this.previousPosition.x = this.position.x - this.velocity.x;
    }

    // off left edge
    if (this.position.x < 0) {
      this.position.x = this.sketch.width;
      this.previousPosition.x = this.position.x - this.velocity.x;
    }

    // off top edge
    if (this.position.y < 0) {
      this.position.y = this.sketch.height;
      this.previousPosition.y = this.position.y - this.velocity.y;
    }

    // off bottom edge
    if (this.position.y > this.sketch.height) {
      this.position.y = 0;
      this.previousPosition.y = this.position.y - this.velocity.y;
    }
  }

  /**
   * update position using Verlet Integration
   */
  update() {
    // calulate new velocity
    // note we use previousPosition and position to calc current velocity
    this.velocity.set(
      this.position.x - this.previousPosition.x + this.acceleration.x,
      this.position.y - this.previousPosition.y + this.acceleration.y
    );

    // keep the velocity within the bounds of maxVelocity
    this.velocity.limit(this.maxVelocity);

    // update previousPosition
    this.previousPosition.set(this.position.copy());

    // update current position, taking the above calculated velocity into account
    this.position.add(this.velocity);

    // handle edge cases
    this.correctForEdgeWrap();

    return this;
  }
  render() {
    const s = this.sketch;
    if (!s) throw Error("Cannot render. No sketch is set for this particle.");

    s.push();
    s.push();
    s.noStroke();
    s.fill(this.color);
    s.ellipse(this.position.x, this.position.y, this.radius, this.radius);
    s.pop();

    return this;
  }
}
