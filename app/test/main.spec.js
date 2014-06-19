describe('App', function() {
    it('should create scene with 9 images', function() {
      var app = new window.App();
      expect(app.scene.children).to.be.ok();
    });
  });
