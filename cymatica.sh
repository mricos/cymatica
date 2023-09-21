cymatica-mac-build(){
  g++ main.cpp -o output \
  -I/opt/homebrew/include \
   -L/opt/homebrew/lib \
   -lglfw  \
   -framework OpenGL \
   -DGL_SILENCE_DEPRECATION
}

cymatica-mac-run(){
  ./output
}
