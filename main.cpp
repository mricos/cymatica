#include <GLFW/glfw3.h>
#include <iostream>
#include <unistd.h> // for getcwd

// Global variables
float zoomLevel = 1.0f;
float cameraDistance = 2.0f;
float cameraAngleX = 0.0f;
float cameraAngleY = 0.0f;
bool leftMousePressed = false;
double lastMouseX, lastMouseY;
float cursorX = 0.0f;
float cursorY = 0.0f;
char activeCursor = '\0'; // No active cursor by default
int windowWidth = 640;  // Default window width
int windowHeight = 480; // Default window height
bool wireframeMode = false;

void handle_keyboard(GLFWwindow* window) {
    if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS) {
        wireframeMode = !wireframeMode; // Toggle wireframe mode
        if (wireframeMode) {
            glPolygonMode(GL_FRONT_AND_BACK, GL_LINE); // Enable wireframe mode
        } else {
            glPolygonMode(GL_FRONT_AND_BACK, GL_FILL); // Disable wireframe mode
        }
    }    // Handle keyboard inputs here if needed
}



void getColorFromIndices(int stack, int slice, int maxStacks, int maxSlices, float &r, float &g, float &b) {
    float hue = (float)stack / maxStacks; // Normalize to [0, 1]
    float saturation = 1.0f - (float)slice / maxSlices; // Normalize to [0, 1] and invert

    // Convert hue to RGB
    int i = (int)(hue * 6);
    float f = hue * 6 - i;
    float p = (1 - saturation) * 1;
    float q = (1 - f * saturation) * 1;
    float t = (1 - (1 - f) * saturation) * 1;

    switch (i % 6) {
        case 0: r = 1, g = t, b = p; break;
        case 1: r = q, g = 1, b = p; break;
        case 2: r = p, g = 1, b = t; break;
        case 3: r = p, g = q, b = 1; break;
        case 4: r = t, g = p, b = 1; break;
        case 5: r = 1, g = p, b = q; break;
    }
}

void mouse_button_callback(GLFWwindow* window, int button, int action, int mods) {
    if (button == GLFW_MOUSE_BUTTON_LEFT) {
        if (action == GLFW_PRESS) {
            leftMousePressed = true;
            glfwGetCursorPos(window, &lastMouseX, &lastMouseY);
        } else if (action == GLFW_RELEASE) {
            leftMousePressed = false;
        }
    }
}

void cursor_position_callback(GLFWwindow* window, double xpos, double ypos) {
    if (leftMousePressed) {
        float dx = (xpos - lastMouseX);
        float dy = (ypos - lastMouseY);

        cameraAngleX += dy * 0.005f;
        cameraAngleY += dx * 0.005f;

        lastMouseX = xpos;
        lastMouseY = ypos;
    }
    std::cout << "Cursor Position: X=" << xpos << ", Y=" << ypos << std::endl;
}


void drawSphere(float radius) {
    const int slices = 40;
    const int stacks = 40;

    for (int i = 0; i < slices; i++) {
        float theta1 = i * (2.0f * M_PI) / slices;
        float theta2 = (i + 1) * (2.0f * M_PI) / slices;

        for (int j = 0; j < stacks; j++) {
            float phi1 = j * M_PI / stacks - M_PI / 2;
            float phi2 = (j + 1) * M_PI / stacks - M_PI / 2;

            float r, g, b;
            getColorFromIndices(j, i, stacks, slices, r, g, b);

            // Recalculate saturation based on slice and stack indices
            float saturation = (float)i / slices;
            r *= saturation;
            g *= saturation;
            b *= saturation;

            glBegin(GL_TRIANGLE_STRIP);
            
            glColor3f(r,g,b); // Set color to red

            glVertex3f(radius * cos(theta1) * cos(phi1), radius * sin(phi1), radius * sin(theta1) * cos(phi1));
            glVertex3f(radius * cos(theta2) * cos(phi1), radius * sin(phi1), radius * sin(theta2) * cos(phi1));
            glVertex3f(radius * cos(theta1) * cos(phi2), radius * sin(phi2), radius * sin(theta1) * cos(phi2));
            glVertex3f(radius * cos(theta2) * cos(phi2), radius * sin(phi2), radius * sin(theta2) * cos(phi2));
            
            glEnd();

            // Draw the active cursor at the cursor position
            if (activeCursor != '\0') {
                glRasterPos2f(cursorX, cursorY);
            }
        }
    }
    }

void framebuffer_size_callback(GLFWwindow* window, int width, int height) {
    glViewport(0,0, width, height);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    float aspectRatio = (float)width / (float)height;
    if (width <= height) {
        glOrtho(-zoomLevel, zoomLevel, -zoomLevel / aspectRatio, zoomLevel / aspectRatio, -10.0, 10.0);
    } else {
        glOrtho(-zoomLevel * aspectRatio, zoomLevel * aspectRatio, -zoomLevel, zoomLevel, -10.0, 10.0);
    }
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

void scroll_callbackOld(GLFWwindow* window, double xoffset, double yoffset) {
    cameraDistance -= yoffset * 0.1f;
}
void scroll_callback(GLFWwindow* window, double xoffset, double yoffset) {
    zoomLevel -= yoffset * 0.1f;  // Adjust the zoom level based on the scroll amount
    if (zoomLevel < 0.1f) zoomLevel = 0.1f;  // Set a minimum zoom level
    int width, height;
    glfwGetFramebufferSize(window, &width, &height);
    framebuffer_size_callback(window, width, height);  // Update the projection matrix
}

void CheckGLError() {
    GLenum err;
    while ((err = glGetError()) != GL_NO_ERROR) {
        std::cerr << "OpenGL error: " << err << std::endl;
    }
}

void drawTriangle() {
    glColor3f(1.0f, 0.0f, 0.0f); // Set color to red
    glBegin(GL_TRIANGLES);
        glVertex2f(-0.5f, -0.5f);
        glVertex2f(0.5f, -0.5f);
        glVertex2f(0.0f, 0.5f);
    glEnd();
}


int main() {
    if (!glfwInit()) {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }

    GLFWwindow* window = glfwCreateWindow(640, 480, "Spherical Harmonics", NULL, NULL);

    if (!window) {
        std::cerr << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(window);
    glClearColor(0.0f, 0.0f, 1.0f, 1.0f);  // Set clear color to blue
    glfwSetMouseButtonCallback(window, mouse_button_callback);
    glfwSetCursorPosCallback(window, cursor_position_callback);
    glfwSetScrollCallback(window, scroll_callback);
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);


    while (!glfwWindowShouldClose(window)) {
        handle_keyboard(window);
        // Clear the color and depth buffers
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        glPushMatrix();
        glTranslatef(0.0f, 0.0f, -cameraDistance);
        glRotatef(cameraAngleX * (180.0f/M_PI), 1.0f, 0.0f, 0.0f);
        glRotatef(cameraAngleY * (180.0f/M_PI), 0.0f, 1.0f, 0.0f);

        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        glEnable(GL_DEPTH_TEST);

        drawSphere(0.25f);
        glPopMatrix();
        glfwSwapBuffers(window);
        glfwPollEvents();
        CheckGLError();
    }

    glfwDestroyWindow(window);
    glfwTerminate();
    return 0;
}
