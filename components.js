window.onload = function() {
Crafty.init(800, 350);
Crafty.background('grey');
var bg = Crafty.e("2D, DOM, Image")
  .attr({w: Crafty.viewport.width, h: Crafty.viewport.height})
  .image("img/Untitled-3.png");

var announcement = function(points, feedback, color) {
  Crafty('Points').each(function() {
    this.text(this.points += points)
  })
  Crafty('Words').each(function() {
    this.text(this.result = feedback)
    .css({"text-shadow": color})
  })
}

var pushBar = function(y, color, image) {
  return Crafty.e("PushBar, 2D, DOM, Color, Image")
    .image(image)
    .attr({x: 30, y: y, w: 20,h: 30})
}

var bar = function(y, color, image) {
  return Crafty.e("2D, DOM, Color, Collision, Image")
  .attr({ x: 850, y: y, w: 10, h: 30, 
      dX: -4, 
      dY: 0})
  .image(image)
  .bind('EnterFrame', function () {

    if (this.x < -10) {
      this.destroy();
      announcement(-300, 'MISSED!', "3px 2px brown")
    }
    this.x += this.dX;
    this.y += this.dY;
  })
}

var barGenerate = function(y, color, arrowKey, image) {
  countdown = 130
  pushBar(y, color, image).bind('EnterFrame', function() {
    if (countdown > 0) {
      countdown -= 1
    } else {
      var random = Math.random(50) * 10
      if (random > 9) {
        bar(y, color, image).bind('KeyDown', function(e) {
          if (e.key == arrowKey) {

            if (this.hit('PushBar') != false) {
              if (this.x > 25 && this.x < 35) {
                this.destroy();
                announcement(1005, 'AWESOME!', "3px 2px green")
              } else if (this.x > 19 && this.x < 40) {
                this.destroy();
                announcement(805, 'GOOD!', "3px 2px blue")
              } else if (this.x > 10 && this.x < 47) {
                this.destroy();
                announcement(605, 'OKAY!', "3px 2px orange")
              } else if (this.x > 5 && this.x < 53) {
                this.destroy();
                announcement(405, 'BAD!', "3px 2px red")
              }
            } else {
              Crafty('Points').each(function() {
                this.text(this.points -= 50)
              })

            }
          }
        })
        countdown = 130
      }
    }
  })
}
}