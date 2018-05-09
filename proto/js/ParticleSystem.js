// import Particle from "./Particle";

class ParticleSystem {
  constructor({ sketch }) {
    this.sketch = sketch || null;
    this.gravitationalConstant = 5 * Math.pow(10, 3);
    this.maxAccel = 1;
    this.particles = [];
  }

  removeAll() {
    this.particles = [];
  }

  add({ position: positionVector }) {
    const p = new Particle({
      sketch: this.sketch,
      position: positionVector || this.sketch.createVector(0, 0)
    });
    this.particles.push(p);
    console.log(`adding particle`, p);

    console.log(this.particles);
  }

  applyForcesTo(particleFeelingForce) {
    // reset acceleration due to gravitation force to 0
    particleFeelingForce.acceleration.set(0, 0);

    this.particles.forEach(p => {
      // don't apply force from self to self, silly
      if (p === particleFeelingForce) {
        return;
      }

      // get distance between particleFeelingForce and p
      let distSq = particleFeelingForce.getDistSqTo(p);

      // direction of accel vector, normalized (unit length is 1)
      let rVector = particleFeelingForce.getVectorTo(p).normalize();

      // accel due to gravity (magnitude)
      let gAccel = this.gravitationalConstant / distSq;

      // limit the max acceleration
      gAccel = Math.min(gAccel, this.maxAccel);

      // multiply our rVector by acceleration due to gravity
      // to create the gravitational acceleration vector
      let gVector = rVector.mult(gAccel);

      // add this new acceleration
      particleFeelingForce.acceleration.add(gVector);
    });
  }

  update() {
    // update acceleration vector on all particles.
    // we do this separately from updating position
    // since particle positions affect acceleration
    // (with the inverse sq of distance)
    this.particles.forEach(p => this.applyForcesTo(p));
    this.particles.forEach(p => p.update());
    return this;
  }

  render() {
    this.particles.forEach(p => p.render());
  }
}
