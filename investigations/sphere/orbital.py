import numpy as np
import matplotlib.pyplot as plt
from scipy.special import sph_harm

sig=.000001
# Define the radial wave function for 2p (used as a placeholder for the main focus on the angular part)
def R_21(r):
    a0 = 1.0  # Bohr radius
    rho = r / (2 * a0)
    return (1 / (2 * np.sqrt(6 * np.pi) * a0 ** (3/2))) * rho * np.exp(-rho / 2)

# Probability density function
def probability_density(r, theta, phi):
    psi = psi_333(r, theta, phi)
    return np.abs(psi) ** 2

# Define the spherical harmonics for Y_33
def Y_33(theta, phi):
    return sph_harm(3, 3, phi, theta)

# Define the wave function ψ_333 (f_33)
def psi_333(r, theta, phi):
    Y = Y_33(theta, phi)
    R = R_21(r)
    return R * Y

# Compute r values for different contours of probability density for f_33
def significant_r_values(theta_phi):
    theta, phi = theta_phi
    r_values_search = np.linspace(0, 5, 10)
    densities = [probability_density(r, theta, phi) for r in r_values_search]
    significant_r = [r for r, density in zip(r_values_search, densities) if density > sig]

    return significant_r

theta_grid = np.linspace(0, np.pi, 10)
phi_grid = np.linspace(0, 2*np.pi, 10)
theta_values_mesh, phi_values_mesh = np.meshgrid(theta_grid, phi_grid)

# Compute significant r values for each (theta, phi) pair
r_values_grid = [significant_r_values((theta, phi)) for theta, phi in zip(np.ravel(theta_values_mesh), np.ravel(phi_values_mesh))]

# Convert to cartesian coordinates for plotting
x_values = []
y_values = []
z_values = []
for theta, phi in zip(np.ravel(theta_values_mesh), np.ravel(phi_values_mesh)):
    for r in significant_r_values((theta, phi)):
        x_values.append(r * np.sin(theta) * np.cos(phi))
        y_values.append(r * np.sin(theta) * np.sin(phi))
        z_values.append(r * np.cos(theta))

x_values = np.array(x_values)
y_values = np.array(y_values)
z_values = np.array(z_values)

# Create a 3D scatter plot
fig = plt.figure(figsize=(12, 10))
ax = fig.add_subplot(111, projection='3d')
ax.scatter(x_values, y_values, z_values, c='k', s=0.5)

ax.set_title('Visualization of $f_{3,3}$ Orbital Using 3D Scatter Plot')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_xlim([-5, 5])
ax.set_ylim([-5, 5])
ax.set_zlim([-10, 10])
ax.view_init(elev=30, azim=30)

plt.show()
print("First 10 x_values:", x_values[:10])
print("First 10 y_values:", y_values[:10])
print("First 10 z_values:", z_values[:10])
print("First 5 entries of r_values_grid:", r_values_grid[:5])
sample_theta_phi = (theta_values_mesh[0, 0], phi_values_mesh[0, 0])
sample_densities = [probability_density(r, *sample_theta_phi) for r in np.linspace(0, 5, 10)]
print("Densities for sample (theta, phi):", sample_densities)
sample_psi = [psi_333(r, *sample_theta_phi) for r in np.linspace(0, 5, 10)]
print("Wave function values for sample (theta, phi):", sample_psi)
print("Spherical harmonic Y_33 for sample (theta, phi):", Y_33(*sample_theta_phi))
sample_R_21 = [R_21(r) for r in np.linspace(0, 5, 10)]
print("Radial function R_21 values:", sample_R_21)
Y_33_values = np.array([[Y_33(theta, phi) for phi in phi_grid] for theta in theta_grid])
print("Spherical harmonic Y_33 grid values:", Y_33_values)

