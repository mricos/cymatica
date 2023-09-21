#include <GLFW/glfw3.h>
#include <iostream>
#include <unistd.h> // for getcwd

// Global variables
float zoomLevel = 1.0f;
float cameraDistance = 3.0f;
float cameraAngleX = 0.0f;
float cameraAngleY = 0.0f;
bool leftMousePressed = false;
double lastMouseX, lastMouseY;
bool bClear = true;
bool bDepth = false;
bool bLongLfo = false;
bool bLatLfo = false;
float cursorX = 0.0f;
float cursorY = 0.0f;
char activeCursor = '\0'; // No active cursor by default
int windowWidth = 640;
int windowHeight = 480;
float long_freq = 1.0f;
float long_freq_rate = 0.5f;
float long_freq_max = 8.0f;
float long_freq_min = 1.0f;
float long_bright = 1.0f;
float lat_bright = 1.0f;
float lat_freq = 1.0f;
float lat = 1.0f;
float lat_freq_max = 3.0f;
float lat_freq_min = 1.0f;
float lat_freq_rate = 0.5f;
float lat_scale = 2.0f;
float xcontrol = 0;
float ycontrol = 0;


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
    xcontrol =  xpos/windowWidth;
    ycontrol  =  ypos/windowHeight;

 
    if (glfwGetKey(window, GLFW_KEY_A) == GLFW_PRESS) {
        long_freq = xcontrol * 10.0;
    }   

    if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS) {
        lat_freq = xcontrol * 10.0f;
    } 

    if (glfwGetKey(window, GLFW_KEY_Q) == GLFW_PRESS) {
        long_freq_min = xcontrol * 10.0;
        long_freq_max = ycontrol * 10.0;
    }

    if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS) {

        if (glfwGetKey(window, GLFW_KEY_LEFT_SHIFT) == GLFW_PRESS || 
            glfwGetKey(window, GLFW_KEY_RIGHT_SHIFT) == GLFW_PRESS) {
            lat_scale = 1.5*powf(2,ycontrol)- 1.5;
            std::cout << "lat_scale:" << lat_scale;
        }
        else{
            lat_freq_min = xcontrol * 10.0;
            lat_freq_max = ycontrol * 10.0;
        }
    }

    if (glfwGetKey(window, GLFW_KEY_Z) == GLFW_PRESS) {
        long_freq_rate = xcontrol * 2.0;
    } 

    if (glfwGetKey(window, GLFW_KEY_X) == GLFW_PRESS) {
        lat_freq_rate = xcontrol * .5f;
    }

   if (glfwGetKey(window, GLFW_KEY_D) == GLFW_PRESS) {
            long_bright = ycontrol;
            lat_bright = xcontrol;
    }   

    std::cout << "X=" << xpos << "(" << xcontrol <<")";
    std::cout << " Y=" << ypos << "(" << ycontrol <<")";
    std::cout << "  long_freq_max: =" << long_freq_max;
    std::cout << "  long_freq_min: =" << long_freq_min;
    std::cout << "  lat_freq_max: =" << lat_freq_max;
    std::cout << "  lat_freq_min: =" << lat_freq_min;
    

    std::cout << ", Y=" << ypos << std::endl;
}

// Define a set of quantized colors
const float colors[4][3] = {
    {1.0f, 0.0f, 0.0f},  // Red
    {0.0f, 1.0f, 0.0f},  // Green
    {0.0f, 0.0f, 1.0f},  // Blue
    {1.0f, 1.0f, 0.0f}   // Yellow
};

void drawSphere(float radius) {
    const int slices = 40; // Number of longitudinal lines
    const int stacks = 40; // Number of latitudinal lines
    // Draw lines of latitude (horizontal lines)
    for (int j = 0; j <= stacks; j++) {
        float phi = j * M_PI / stacks - M_PI / 2;

        // Calculate brightness based on latitude
        float brightness = 0.1f + 0.9f * cos(phi);

        // Select a quantized color based on theta
        int colorIndex = (int)(j/ (float)slices * 4) % 4;

        if(lat_bright < .1) break;

        glColor3f(
                    lat_bright * colors[colorIndex][0], 
                    lat_bright * colors[colorIndex][1],
                    lat_bright * colors[colorIndex][2]);

        glBegin(GL_LINE_STRIP);
        for (int i = 0; i <= slices; i++) {
            float theta = i * (2.0f * M_PI) / slices;
            // Perturb the x and z coordinates based on lat_freq and phi
            float perturb = sin(lat_freq * phi) * lat_scale;
            glVertex3f(radius * cos(theta) * (cos(phi + perturb)),
            radius * sin(phi + perturb),
            radius * sin(theta) * (cos(phi + perturb)));
        }
        glEnd();
    }

    // Draw lines of longitude (vertical lines)
    for (int i = 0; i <= slices; i++) {
        float theta = i * (2.0f * M_PI) / slices;
        
        if(long_bright < .1) break;

        // Select a quantized color based on theta
        int colorIndex = (int)(i / (float)slices * 4) % 4;
        glColor3f(
                long_bright * colors[colorIndex][0], 
                long_bright * colors[colorIndex][1],
                long_bright * colors[colorIndex][2]);

        glBegin(GL_LINE_STRIP);
        for (int j = 0; j <= stacks; j++) {
            float phi = j * M_PI / stacks - M_PI / 2;

            // Perturb the x and z coordinates based on long_freq
            float perturb = sin(long_freq * phi) * 1.0f;
        
            glVertex3f( radius * (cos(theta + perturb)) * cos(phi) * 1.0f,
                        radius * sin(phi),
                        radius * (sin(theta + perturb)) * cos(phi));
        }
        glEnd();
    }
}



void framebuffer_size_callback(GLFWwindow* window, int width, int height) {
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    float aspectRatio = (float)width / (float)height;
    if (width <= height) {
        glOrtho(-zoomLevel, zoomLevel,
        -zoomLevel / aspectRatio,
        zoomLevel / aspectRatio, -10.0, 10.0);
    } else {
        glOrtho(-zoomLevel * aspectRatio,
        zoomLevel * aspectRatio,
        -zoomLevel, zoomLevel, -10.0, 10.0);
    }
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

void scroll_callback(GLFWwindow* window, double xoffset, double yoffset) {
    zoomLevel -= yoffset * 0.1f;  // zoom level based on the scroll amount
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

void key_callback(GLFWwindow* window, int key,
        int scancode, int action, int mods) {
    if (action == GLFW_PRESS) {
        switch (key) {
            case GLFW_KEY_P:
                bClear = !bClear;
                break;
            case GLFW_KEY_1:
                bLongLfo = !bLongLfo;
                break;                
            case GLFW_KEY_2:
                bLatLfo = !bLatLfo;
                break;                
        }
    }
}


int main() {
    if (!glfwInit()) {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }

    int width = 640;
    int height = 480;
    GLFWwindow* window = glfwCreateWindow(width,height,
                            "Spherical Harmonics", NULL, NULL);

    if (!window) {
        std::cerr << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }
    glfwMakeContextCurrent(window);
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);  // Set clear color to black
    glfwSetMouseButtonCallback(window, mouse_button_callback);
    glfwSetCursorPosCallback(window, cursor_position_callback);
    glfwSetScrollCallback(window, scroll_callback);
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);
    glfwSetKeyCallback(window, key_callback);
    double lastTime = glfwGetTime();
    double time = lastTime;
    double deltaTime = 0;

    scroll_callback(window, width, height);

    while (!glfwWindowShouldClose(window)) {
        lastTime = time;
        time=glfwGetTime();
        deltaTime = time-lastTime;
        //std::cerr << "deltaTime: " << deltaTime << std::endl;

        if(bClear){
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        }
        if(bDepth){
            glEnable(GL_DEPTH_TEST);  // Enable depth testing
        }else{
            glDisable(GL_DEPTH_TEST);  // Enable depth testing
        }

        if(bLongLfo){
            long_freq = 
                (long_freq_max-long_freq_min) * sin(2 * M_PI * long_freq_rate * time);           
        }
        if(bLatLfo){
            lat_freq =
                (lat_freq_max-lat_freq_min) * sin(2 * M_PI * lat_freq_rate * time);           
        }
        glPushMatrix();
        glTranslatef(0.0f, 0.0f, -cameraDistance);
        glRotatef(cameraAngleX * (180.0f/M_PI), 1.0f, 0.0f, 0.0f);
        glRotatef(cameraAngleY * (180.0f/M_PI), 0.0f, 1.0f, 0.0f);
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
