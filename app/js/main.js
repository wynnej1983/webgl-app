(function(window) {
'use strict';


//Main app class
function App() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.x = 500;
    this.camera.position.y = 500;
    this.camera.position.z = 1000;
    this.scene = new THREE.Scene();

    //create 9 images and add to scene
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        var img = this.createImage();
        img.position.x = (i * 500);
        img.position.y = (j * 500);

        this.scene.add(img);
      }
    }

    //set camera to look at central image
    this.camera.lookAt(this.scene.children[4].position);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
    //add slider to body
    document.body.appendChild(this.createSlider());

    //rerender scene on window resize
    window.addEventListener('resize', function() {
      var width = window.innerWidth,
          height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });

    //render scene
    this.renderer.render(this.scene, this.camera);
}

App.prototype.createImage = function() {
    var geometry = new THREE.BoxGeometry(400, 400, 1);
    var map = THREE.ImageUtils.loadTexture('/img/cat.jpg', {}, function() {
      this.renderer.render(this.scene, this.camera);
    }.bind(this));
    var material = new THREE.MeshBasicMaterial({
        map: map
    });
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
};

App.prototype.createSlider = function() {
    var slider = document.createElement('input');
    slider.style.width = '200px';
    slider.style.height = '25px';
    slider.style.position = 'absolute';
    slider.style.left = (window.innerWidth/2) - (100) + 'px';
    slider.style.bottom = '10px';
    slider.id = 'zoom';
    slider.type = 'range';
    slider.min = 20;
    slider.max = 150;
    slider.value = 75;
    slider.step = 5;
    slider.onchange = function() {
      this.camera.fov = slider.value;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    }.bind(this);

    return slider;
};

//create app
window.App = App;
new App();

})(window);
