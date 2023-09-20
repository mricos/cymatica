cymatical_build_mac(){
  g++ main.cpp -o output \
  -I/opt/homebrew/include \
   -L/opt/homebrew/lib \
   -lglfw  \
   -framework OpenGL \
   -DGL_SILENCE_DEPRECATION
}

cymatical_run_mac(){
  ./output
}
