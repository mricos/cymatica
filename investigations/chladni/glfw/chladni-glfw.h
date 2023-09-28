#ifndef CHLADNI_GLFW_H
#define CHLADNI_GLFW_H

#include <GLFW/glfw3.h>

class ChladniGLFW {
public:
    ChladniGLFW();
    ~ChladniGLFW();
    void setup();
    void update();
    void draw();
    int m=5;
    int n=6;
    void cursorPositionCallback(double xpos, double ypos);
    void mouseButtonCallback(int button, int action);
    void run();
    GLFWwindow* window;


private:
    int width, height;
    double mouseX, mouseY;
    double ex, ey;
    double zoom;
    double scale;
    double intensityParam;
    int colorShift;
    int detail;
};

#endif // CHLADNI_GLFW_H
