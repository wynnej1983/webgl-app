'use strict';

describe('App', function() {
    var app = window.App;
  
    it('should create scene with 9 images', function(done) {
      expect(app.scene.children).to.be.ok();
      done();
    });

    it.skip('should scale on slider change', function(done) {
      var slider = app.slider;
      slider.onchange(function() {
        expect(app.camera.fov).to.be.greaterThan(75);
        done();
      });
      //force slider change
      slider.value = 100;
    });
    
  });
