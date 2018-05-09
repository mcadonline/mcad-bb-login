// import ParticleSystem from "./ParticleSystem";

let particleSys;

function sketch(s) {
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.frameRate(30);
    s.pixelDensity(1);
    s.noStroke();
    particleSys = new ParticleSystem({
      sketch: s
    });

    // create random particles
    for (let i = 0; i < 3; i++) {
      const randomX = s.random(0, s.width);
      const randomY = s.random(0, s.height);
      particleSys.add({ position: s.createVector(randomX, randomY) });
    }
  };

  s.draw = () => {
    s.clear();
    particleSys.update().render();

    // show a new particle at mouse tip
    // to indicate user can add a new particle
    s.push();
    s.fill(0);
    s.ellipse(s.mouseX, s.mouseY, 10, 10);
    s.pop();
  };

  s.mousePressed = () => {
    particleSys.add({
      position: s.createVector(s.mouseX, s.mouseY)
    });
    return false;
  };

  /* remove all on space */
  s.keyPressed = function() {
    if (s.key === " ") {
      particleSys.removeAll();
    }
  };

  /* reset sketch on resize */
  s.windowResized = function() {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.setup();
  };
}

function init() {
  new p5(sketch);
}

init();
