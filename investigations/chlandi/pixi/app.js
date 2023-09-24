// Create a Pixi Application
let app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0xAAAAAA
});

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// Load an image and run the `setup` function when it's done
PIXI.Loader.shared
    .add("example.png")
    .load(setup);

// This `setup` function will run when the image is loaded
function setup() {
    // Create a sprite from the loaded texture
    let sprite = new PIXI.Sprite(
      PIXI.Loader.shared.resources["./example.png"].texture);
    
    // Add the sprite to the stage
    app.stage.addChild(sprite);
}
