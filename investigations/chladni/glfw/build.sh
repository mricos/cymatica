build(){
  g++  chladni-glfw.cpp main.cpp  -o output \
  -I/opt/homebrew/include \
   -L/opt/homebrew/lib \
   -std=c++11 \
   -lglfw  \
   -framework OpenGL \
   -DGL_SILENCE_DEPRECATION
}

run(){
  ./output
}
