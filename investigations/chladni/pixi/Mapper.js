class Mapper {
    constructor(min, max, newMin, newMax, lambda = (value, min, max, newMin, newMax) => {
        return newMin + (value - min) * (newMax - newMin) / (max - min);
    }) {
        this.min = min;
        this.max = max;
        this.newMin = newMin;
        this.newMax = newMax;
        this.lambda = lambda;
    }

    map(value) {
        return this.lambda(value, this.min, this.max, this.newMin, this.newMax);
    }
}
