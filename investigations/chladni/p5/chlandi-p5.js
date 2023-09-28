// Math at: https://paulbourke.net/geometry/chladni/
// Code from KaijinQ at https://openprocessing.org/sketch/715119
// Ported with ChatGPT4

let N = 10000;
let NNmax = 8;
let V = 0.5;
let F = 0.15;
let PV = -1.5;
let d = 1;

let PX = new Array(N);
let PY = new Array(N);
let NN;
let SX = new Array(NNmax);
let SY = new Array(NNmax);
let I, II, L, R, D, C, VX, VY, T, TT;

function setup() {
  createCanvas(800, 700);
  textSize(20);
  background(0);
  T=1;
  NN = 4;
  TT = 1;
  SX[0] = 50; SY[0] = 50;
  SX[1] = 650; SY[1] = 50;
  SX[2] = 50; SY[2] = 650;
  SX[3] = 650; SY[3] = 650;

  for (I = 0; I < N; I++) {
    PX[I] = random(0, 700);
    PY[I] = random(0, 700);
  }
}

function draw() {
  console.log("draw");
  noStroke();

  for (I = 0; I < N; I++) {
    R = 0; D = 0; C = 0;
    for (II = 0; II < NN; II++) {
      L = dist(PX[I], PY[I], SX[II], SY[II]);
      C += sin(2 * PI * F * (T - (L / V)) / 60);
      L = dist(PX[I] + d, PY[I], SX[II], SY[II]);
      R += sin(2 * PI * F * (T - (L / V)) / 60);
      L = dist(PX[I], PY[I] + d, SX[II], SY[II]);
      D += sin(2 * PI * F * (T - (L / V)) / 60);
    }
    R = abs(R); D = abs(D); C = abs(C);
    fill(255 * (1 - C), 255 * (1 - C), 255 * (1 - C));
    ellipse(PX[I], PY[I], 4, 4);
    L = dist(R, D, C, C);
    VX = PV * (R - C) / L;
    VY = PV * (D - C) / L;
    PX[I] += VX;
    PY[I] += VY;
    if (PX[I] < 0 || PX[I] > 700 || PY[I] < 0 || PY[I] > 700 || C < 0.0025) {
      PX[I] = random(0, 700);
      PY[I] = random(0, 700);
    }
  }

  fill(255, 0, 255);
  for (I = 0; I < NN; I++) {
    ellipse(SX[I], SY[I], 20, 20);
  }

  T += TT;

  strokeWeight(2);
  stroke(255);
  fill(0);
  ellipse(750, 100, 60, 60);
  ellipse(750, 200, 60, 60);
  ellipse(750, 300, 60, 60);
  ellipse(750, 400, 60, 60);
  line(750, 80, 750, 120);
  line(730, 100, 770, 100);
  line(730, 200, 770, 200);
  fill(255);
  beginShape();
  vertex(740, 290);
  vertex(760, 300);
  vertex(740, 310);
  endShape(CLOSE);
  rect(740, 390, 5, 20);
  rect(755, 390, 5, 20);
  strokeWeight(1);
  fill(255);
  text("frequency", 700, 20);
  text(F, 720, 40);

  L = dist(mouseX, mouseY, 750, 100);
  if (L < 30) {
    F += 0.001;
  }
  L = dist(mouseX, mouseY, 750, 200);
  if (L < 30 && F > 0) {
    F -= 0.001;
  }
  L = dist(mouseX, mouseY, 750, 300);
  if (L < 30) {
    TT = 1;
  }
  L = dist(mouseX, mouseY, 750, 400);
  if (L < 30) {
    TT = 0;
  }
}

function mousePressed() {
  if (mouseX < 700) {
    NN++;
    if (NN > NNmax) {
      NN = 1;
    }
    for (I = NN - 1; I > 0; I--) {
      SX[I] = SX[I - 1];
      SY[I] = SY[I - 1];
    }
    SX[0] = mouseX;
    SY[0] = mouseY;
  }
}
