Crafty.c('Bar', {
  init: function() {
    this.requires('2D, DOM, Color, Collision')
  }
})

Crafty.c('PushBar', {
  init: function() {
    this.requires('2D, DOM, Color')
  }
})

pushBarOne = Crafty.e('PushBar')
  .color('rgb(0, 0, 255')
  .attr({x: 10, y: y, w: 15,h: 30})