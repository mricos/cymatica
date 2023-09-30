# Chladni plates and spherical harmonics


At their core, both Chladni patterns and atomic orbitals (described by spherical harmonics) arise from the solutions to wave equations under specific boundary conditions. In both cases, visualized shapes are made up of eigenfunctions- a sine wave is a spacial eigenfunction of a vibrating square plate, for example. The spacial frequencies on display are coupled to the instaneous drive frequencies via physical properites of the system, including materials and boundary conditions for vibrating mediums. The coupling constant beteween a mode of vibrarion and its driving frequency can be thought of as the eigenvalue for that eigenmode- one mode in physical space and one mode in time.

## Chladni's Plates

**Chladni Patterns**: When the plate is vibrated at a specific frequency, the sand or powder sprinkled on the plate moves to areas where the plate is not vibrating. These areas of no vibration (nodal lines) form patterns that are determined by the shape of the plate and the frequency of vibration. Different frequencies give rise to different patterns.

## Chladni equations
Chladni patterns emerge from the study of the vibrations of elastic plates. The governing equation for these patterns is the two-dimensional wave equation for a thin plate, which can be expressed as:

```math
\nabla^2 u - \frac{1}{c^2} \frac{\partial^2 u}{\partial t^2} = 0
```

Where:
- $` u(x, y, t) `$ is the displacement of the plate at position $` (x, y) `$ and time $` t `$.
- $\( c \)$ is the speed of the wave in the plate, which depends on elasticity, density and thickness of the plate.

This is much easier to solve if we assume the edges of the plates are themselves a node where there is no displacement. This means we know the answer to the equation at thde boundary condition (zero) and therefore have limited to solution space to harmonically remated sine functions.

```math
u(\text{edge}, t) = 0
```

Assuming the boundary is fixed is justfied by the fact that when the wavelength is much shorter than the dimensions of the plate, the waves don't "feel" the edges as much; they are more localized towards the interior of the plate. 
The waves interact within the interior of the plate  multiple times before reaching the edges. In other words, internal reflections and propagation interactions dominate the vibration pattern that originates in the center.


## Solving the sqaure plate case

The orthogonal boundary conditions of the square also lead to a seperable form:
 
```math
u(x, y, t) = X(x)Y(y)T(t)
```
Apply the Laplacian in 2D:

```math
\Delta^2 u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}
```

Substitute $u(x,y,t)$:

```math
X''(x)Y(y)T(t) + X(x)Y''(y)T(t) - \frac{1}{c^2} X(x)Y(y)T''(t) = 0.
```

Divide by original equation $X(x)Y(y)T(t)$. Now we havean equation where each term depnds on only one variable.

```math
\frac{X''(x)}{X(x)} + \frac{Y''(y)}{Y(y)} = \frac{1}{c^2} \frac{T''(t)}{T(t)}
```

Both of this equations can be set to a constant value called the separation constant:

 ```math
\frac{X''(x)}{X(x)} + \frac{Y''(y)}{Y(y)} = \frac{1}{c^2} \frac{T''(t)}{T(t)} = = -\lambda
```

Focus on the spatial part:
```math
\frac{X''(x)}{X(x)} + \frac{Y''(y)}{Y(y)} = -\lambda
```

Substituting into the wave equation gives:

```math
\frac{\Delta^2 X Y T}{X Y T} = \frac{1}{c^2} \frac{T''}{T}
```

We get two separate equations. First is spatial:

```math
\Delta^2 X Y = -\lambda X Y
```

Second is temporal:

```math
\Delta^2 X Y = -\lambda X Y
```

```math
T(t) = A \sin(\omega t) + B \cos(\omega t)
```
with
```math
\omega^2 = \lambda c^2
```

Solving the spatial portion:

```math
X(x)Y(y) = \sum_{m=1}^{\infty} \sum_{n=1}^{\infty} A_{mn} \sin\left(\frac{m \pi x}{a}\right) \sin\left(\frac{n \pi y}{b}\right)
```
The coefficients $A_{mn}$ are determined by boundary conditions. For clamped edges both the displacement and its
first derivative are zero at boundaries.


Final solution can be thought of as time portion modulating the spatial portion. If U(x,y) is describing the elevation over the x,y plane, it should be thought of as describing the highest point the over all vibrating structure can take. When it is multiplied (aka modulated) by the sinusoidal driving function, the whole surface is seen to translate perpendicular to the plane, never exceeding the value of +/- U(x,y). And when U(x,y) always equals zero, there is said to be a node line. These node lines are frequency dependent.

```math
u(x, y, t) = \sum_{m=1}^{\infty} \sum_{n=1}^{\infty} A_{mn} \sin\left(\frac{m \pi x}{a}\right) \sin\left(\frac{n \pi y}{b}\right) \sin(\omega t + \phi)
```


## Wave Equation for Circular Membrane in Polar Coordinates

For a circular membrane, the wave equation in polar coordinates is still:

```math
\Delta u = \frac{1}{c^2} \frac{\partial^2 u}{\partial t^2}
```

The solution in polar coordinates is expressed as:

```math
u(r, theta, t) = R(r) Theta(theta) T(t)
```

The radial part involves Bessel functions:

```math
R(r) = J_n(kr)
```

## Solving for Arbitrary Boundary Using Numerical Methods (e.g., Finite Element Method)

For arbitrary boundaries, numerical methods like the Finite Element Method are often employed. The general steps include:

- Discretize the domain into small elements.
- Apply the differential equation and boundary conditions to each element.
- Assemble a global system of equations from the element equations.
- Solve the global system numerically to obtain the solution at the nodes.
- Analyze and visualize the results.


## Spherical harmonics

A spherical harmonic is a special type of function defined on the surface of a sphere. Mathematically, they arise from the solution to the angular part of the [Laplace equation](https://en.wikipedia.org/wiki/Laplace%27s_equation) in spherical coordinates.

**Boundary Conditions**: The boundary conditions for atomic orbitals come from the physical requirements of the wavefunction. The wavefunction must be finite, single-valued, and continuous. Additionally, it must go to zero as the distance from the nucleus goes to infinity.

**Orbital Shapes**: Different quantum numbers (n, l, m) give rise to different shapes of atomic orbitals. The nodal surfaces (regions where the probability of finding an electron is zero) in these orbitals are analogous to the nodal lines in Chladni patterns.
Observations and Connections:

**Nodal Patterns**: Just as Chladni patterns have nodal lines where the plate does not vibrate, atomic orbitals have nodal surfaces where the probability of finding an electron is zero.

**Frequency and Energy**: In Chladni plates, changing the frequency of vibration changes the pattern. Similarly, in atoms, changing the energy (by changing quantum numbers) changes the shape of the orbital.

**Boundary Conditions**: The boundary conditions determine the possible patterns in both systems. In Chladni plates, the fixed edges dictate the patterns. In atoms, the behavior of the wavefunction at infinity and near the nucleus dictates the possible shapes of orbitals.

**Quantization**: Chladni patterns only appear at certain discrete frequencies. Similarly, atomic orbitals are quantized states of an electron in an atom, with discrete energy levels.

**Wave Equation**: Atomic orbitals arise from the solutions to the Schrödinger equation, a quantum mechanical wave equation.

### Schrödinger Equation

1. **Time-Independent Schrödinger Equation (TISE)**:

   $$
   \hat{H} \psi(\mathbf{r}) = E \psi(\mathbf{r})
 $$
   Where $ \hat{H} $ is the Hamiltonian operator, $ \psi(\mathbf{r}) $ is the wave function (which depends on position but not time), and $ E $ is the energy eigenvalue.

2. **Time-Dependent Schrödinger Equation (TDSE)**:
   This equation describes the evolution of the quantum state of a system over time. It's given by:
$$
   i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \hat{H} \Psi(\mathbf{r}, t)
$$
   Where $ i$ is the imaginary unit, $ \hbar $ is the reduced Planck constant, $\Psi(\mathbf{r}, t) $ is the time-dependent wave function, and $ \hat{H} $ is again the Hamiltonian operator.

For systems that are not exposed to external time-dependent potentials (like a time-varying electric field), the solutions to the TDSE can be expressed as a product of the spatial part (solutions to the TISE) and a time-evolution part. Specifically:
$$
\Psi(\mathbf{r}, t) = \psi(\mathbf{r}) e^{-iEt/\hbar}
$$
Where $ \psi(\mathbf{r})$ are the stationary states (eigenfunctions) of the system, and $E$ are the corresponding energy eigenvalues. The factor$ $e^{-iEt/\hbar}$ describes the phase evolution over time.

**A word about phase**:
As $E$ increases, the phase term $iEt/\hbar$ increases which is to say an increase of energy causes a simultaneous increase in frequency and decrease is spatial wavelength of the vibrating medium. Using phase to describe frequency like this also accounts for the interfernce bands seen in the double split experiement.


In essence, both systems showcase the general principle that waves, whether they represent sound in a plate or the probability distribution of an electron in an atom, will form patterns determined by the governing wave equation and imposed boundary conditions.

## References

- ChatGPT4 Visualizing Spherical Harmonics: [sharable](https://chat.openai.com/share/2d7c0b86-1075-410c-bef8-b59cad0f484d), [original](https://chat.openai.com/c/70b65eca-2b7d-418f-83c5-06529f9c1020).

- Chladni Patterns and Formula: [original](https://chat.openai.com/c/f9484ce7-0203-4b72-b0f9-eae5d2c71146)
