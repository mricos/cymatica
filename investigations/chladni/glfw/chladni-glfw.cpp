#include "chladni-glfw.h"
#include <iostream>
#include <cmath>




ChladniGLFW::ChladniGLFW() : width(800), height(600),
    ex(0), ey(0), scale(1), zoom(1), intensityParam(.5),
    colorShift(0), detail(5){}

ChladniGLFW::~ChladniGLFW() {
    glfwTerminate();
}


void ChladniGLFW::setup() {
    if (!glfwInit()) {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return;
    }

    window = glfwCreateWindow(width, height,
        "Chladni Patterns", NULL, NULL);

    if (!window) {
        std::cerr << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return;
    }

    glfwMakeContextCurrent(window);
    glfwSetWindowUserPointer(window, this);



    glfwSetCursorPosCallback(window,
        [](GLFWwindow* window, double xpos, double ypos) {
        ChladniGLFW* appPtr =
            static_cast<ChladniGLFW*>(glfwGetWindowUserPointer(window));
            ChladniGLFW& app = *appPtr;
            app.mouseX = xpos;
            app.mouseY = ypos;
            //std::cout << "xpos,ypos: " << xpos << "," << ypos << std::endl;
    });

    //glfwSetKeyCallback(window, keyCallback);

    glfwSetKeyCallback(window,
        [](GLFWwindow* window,
            int key, int scancode, int action, int mods) {

        ChladniGLFW* appPtr =
        static_cast<ChladniGLFW*>(glfwGetWindowUserPointer(window));
        ChladniGLFW& app = *appPtr;
        if (action == GLFW_PRESS || action == GLFW_REPEAT) {
            std::cout << "key: " << key << std::endl;
            switch (key) {
                case GLFW_KEY_Q:
                    app.m++;
                    break;
                case GLFW_KEY_A:
                    app.m--;
                    break;
                case GLFW_KEY_W:
                    app.n++;
                    break;
                case GLFW_KEY_S:
                    app.n--;
                    break;
                case GLFW_KEY_3:
                    app.zoom = app.zoom*2;
                    break;
                    case GLFW_KEY_E:
                    app.zoom = app.zoom*1.1;
                    break;
                case GLFW_KEY_D:
                    app.zoom = app.zoom/1.1;
                    break;
                case GLFW_KEY_C:
                    app.zoom = app.zoom/2;
                    break;
                case GLFW_KEY_R:
                    app.intensityParam= app.intensityParam + .05;
                    break;
                case GLFW_KEY_F:
                    app.intensityParam = app.intensityParam - .05;
                    break;
                case GLFW_KEY_T:
                  app.colorShift = (app.colorShift + 1) % 8;
                    break;
                case GLFW_KEY_G:
                    app.colorShift = (app.colorShift - 1) % 8;

                    break;

            }
            std::cout << "m,n: " << app.m << "," << app.n <<
            " zoom: " << app.zoom <<
            " detail: " << app.detail <<
            std::endl;
        }
    });


    glfwSetMouseButtonCallback(window,
        [](GLFWwindow* window, int button, int action, int mods) {
        ChladniGLFW* app =
            static_cast<ChladniGLFW*>(glfwGetWindowUserPointer(window));
        app->mouseButtonCallback(button, action);
    });
}

void ChladniGLFW::update() {
    double deltaX = mouseX - width / 2 - ex;
    double deltaY = mouseY - height / 2 - ey;
    double easing = 0.13;
    deltaX *= easing;
    deltaY *= easing;
    ex += deltaX;
    ey += deltaY;
    //std::cout << "ex,ey: " << ex << "," << ey << std::endl;
}

// void ChladniGLFW::draw() {
//     glClear(GL_COLOR_BUFFER_BIT);

//     glMatrixMode(GL_PROJECTION);
//     glLoadIdentity();
//     glOrtho(-width / 2, width / 2, -height / 2, height / 2, -1, 1);
//     glMatrixMode(GL_MODELVIEW);
//     glLoadIdentity();

//     glBegin(GL_POINTS);
//     for (int x = -width / 2; x < width / 2; x += detail) {
//         for (int y = -height / 2; y < height / 2; y += detail) {
//             double dx = (x + ex) / zoom;
//             double dy = (y + ey) / zoom;
//             double d = sqrt(dx * dx + dy * dy);
//             double frequency = (sin(d) + 1.0) * 0.5;
//             glColor3f(frequency, frequency, frequency);
//             glVertex2i(x, y);
//         }
//     }
//     glEnd();
// }
/*
void ChladniGLFW::draw() {
    glClear(GL_COLOR_BUFFER_BIT);

    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glOrtho(-width / 2, width / 2, -height / 2, height / 2, -1, 1);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    glBegin(GL_POINTS);
    for (int x = -width / 2; x < width / 2; x += detail) {
        for (int y = -height / 2; y < height / 2; y += detail) {
            double dx = (x + ex) / zoom;
            double dy = (y + ey) / zoom;

            int m = 5; // You can adjust these values
            int n = 6; // to get different patterns

            double z = sin(m * dx) * sin(n * dy);
            double intensity = (z + 1.0) * 0.5; // Normalize to [0, 1]

            glColor3f(intensity, intensity, intensity);
            glVertex2i(x, y);
        }
    }
    glEnd();
}

void ChladniGLFW::draw() {
    glClear(GL_COLOR_BUFFER_BIT);

    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glOrtho(-width / 2, width / 2, -height / 2, height / 2, -1, 1);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    glBegin(GL_POINTS);
    for (int x = -width / 2; x < width / 2; x += detail) {
        for (int y = -height / 2; y < height / 2; y += detail) {
            double dx = (x + ex) / zoom;
            double dy = (y + ey) / zoom;

            double z = sin(m * M_PI * dx) * sin(n * M_PI * dy);
            double intensity = (z + 1.0) * 0.5; // Normalize to [0, 1]

            glColor3f(intensity, intensity, intensity);
            glVertex2i(x, y);
        }
    }
    glEnd();
}

*/



double mapIntensity(double intensity, double p) {
    if (p < 0.0 ) p = 1.0;
    if (p > 1.0 ) p = 1.0;

    if (intensity < 0.0 || intensity > 1.0) {
        std::cerr << "Intensity should be in the range [0, 1]." << intensity << std::endl;
        return -1; // Error value
    }

    double mappedIntensity;

    if (p < 0.5) {
        // Map to logarithmic
        double scale = p * 2.0;
        mappedIntensity = scale * log(intensity + 1.0);
    } else if (p > 0.5) {
        // Map to exponential
        double scale = (p - 0.5) * 2.0;
        mappedIntensity = pow(intensity, 2.0 - scale);
    } else {
        // Linear mapping
        mappedIntensity = intensity;
    }

    // Clamp the mapped intensity to the range [0, 1]
    if (mappedIntensity < 0.0) mappedIntensity = 0.0;
    if (mappedIntensity > 1.0) mappedIntensity = 1.0;

    return mappedIntensity;
}

double quantizeIntensity(double intensity, int levels) {
    if (levels < 2) {
        std::cerr << "Levels should be 2 or more." << std::endl;
        return -1; // Error value, you can handle this as per your requirement
    }

    // Ensure the intensity is within the valid range [0, 1]
    if (intensity < 0.0) intensity = 0.0;
    if (intensity > 1.0) intensity = 1.0;

    // Calculate the step size for each level
    double step = 1.0 / (levels - 1);

    // Quantize the intensity
    int quantizedLevel = static_cast<int>(round(intensity / step));
    double quantizedIntensity = quantizedLevel * step;

    return quantizedIntensity;
}


#include <array>

struct RGB {
    float r, g, b;
};

static const std::array<RGB, 8> rainbowColors = {{
    {1.0f, 0.0f, 0.0f}, // Red
    {1.0f, 0.27f, 0.0f}, // Orange
    {1.0f, 0.64f, 0.0f}, // Yellow
    {0.5f, 1.0f, 0.0f}, // Light Green
    {0.0f, 1.0f, 0.0f}, // Green
    {0.0f, 0.5f, 1.0f}, // Light Blue
    {0.0f, 0.0f, 1.0f}, // Blue
    {0.64f, 0.0f, 1.0f} // Violet
}};

int mapFloatToInt(float value) {
    if (value < 0.0f) value = 0.0f; // Clamp the value to a minimum of 0.0
    if (value > 1.0f) value = 1.0f; // Clamp the value to a maximum of 1.0

    return static_cast<int>(std::round(value * 7.0f));
}

void ChladniGLFW::draw() {
    glClear(GL_COLOR_BUFFER_BIT);

    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glOrtho(-width / 2, width / 2, -height / 2, height / 2, -1, 1);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    const double pi = 3.14159265;



    glBegin(GL_POINTS);
    RGB c = rainbowColors[0];
    for (int x = -width / 2; x < width / 2; x += 1) {
        for (int y = -height / 2; y < height / 2; y += 1) {
            double rx = x / (double)width;
            double ry = y / (double)height;
            double rm = m * (ex/7.321) * zoom;
            double rn = n * (ey/7.257) *  zoom;

            double z = detail * (cos(rm * pi * rx) * cos(rn * pi * ry)
                - cos(rn * pi * rx) * cos(rm * pi * ry));

             z = z + detail * (sin(rm * pi * rx) * sin(rn * pi * ry)
                - cos(rn * pi * rx) * cos(rm * pi * ry));

            z = (z + 2*detail) / (4*detail);  // Normalize to 0 to 1
            double intensity = mapIntensity( quantizeIntensity(z,8), intensityParam);

            c = rainbowColors[mapFloatToInt(intensity)+colorShift%8];

            glColor3f(c.r, c.g, c.b);
            glVertex2i(x, y);
        }
    }
    glEnd();
}



void ChladniGLFW::mouseButtonCallback(int button, int action) {
    if (button == GLFW_MOUSE_BUTTON_LEFT && action == GLFW_PRESS) {
        zoom *= 2;
        detail *= 2;
    } else if (button == GLFW_MOUSE_BUTTON_RIGHT && action == GLFW_PRESS) {
        zoom /= 2;
        detail /= 2;
    }
}

void ChladniGLFW::run() {
    while (!glfwWindowShouldClose(window)) {
        update();
        draw();
        glfwSwapBuffers(window);
        glfwPollEvents();
    }
}


