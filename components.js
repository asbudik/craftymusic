window.onload = function() {

var opts = {
  lines: 12, // The number of lines to draw
  angle: 0.35, // The length of each line
  lineWidth: 0.1, // The line thickness
  pointer: {
    length: 0.9, // The radius of the inner circle
    strokeWidth: 0.35, // The rotation offset
    color: '#000000' // Fill color
  },
  limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
  colorStart: '#e50000',   // Colors
  colorStop: '#00ffff',    // just experiment with them
  strokeColor: '#ffffff',   // to see which ones work best for you
  generateGradient: true
};
var target = document.getElementById('foo'); // your canvas element
var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 5000; // set max gauge value
gauge.animationSpeed = 21; // set animation speed (32 is default value)
gauge.set(1000)
Crafty.scene('Opening', function() {
  Crafty.init(800, 350)
  Crafty.canvas.init()
    var button = $('.button')
    button.css({"display": "inline"})
  Crafty.background('black')
 

  var closebutton = $('.pause')
  var resumebutton = $('.resume')
  var closemodal =$('modal-body')

  closebutton.on('click', function() {
    Crafty.audio.pause('bgmusic');
    Crafty.pause(true)
    closebutton.css({"display": "none"})
    resumebutton.css({"display": "inline"})
  })

  resumebutton.on('click', function() {
    Crafty.pause(false);
    Crafty.audio.unpause('bgmusic')
    resumebutton.css({"display": "none"})
    closebutton.css({"display": "inline"})
  })
  $('body').on('click', function(e) {
    if(e.target.id == "full-width") {
      return;
    }
    if($(e.target).closest('#full-width').length) {
      return;
    }
    Crafty.pause(true)
    Crafty.audio.pause('bgmusic');
    closebutton.css({"display": "none"})
    resumebutton.css({"display": "inline"})
  })

  button.on('click', function() {
    button.css({"display": "none"})
    $('#foo').css({"display": "inline"})
    Crafty.audio.stop();
    resumebutton.css({"display": "none"})
    closebutton.css({"display": "inline"})
    Crafty.scene('Game')
  })
})

Crafty.scene('Game', function() {
Crafty.init(800, 350);
Crafty.background('black');
Crafty.e("2D, DOM, Image")
  .attr({w: Crafty.viewport.width, h: Crafty.viewport.height})
  .image("img/Untitled-3.png");
  Crafty.e("2D, DOM, Image, Tween")
    .attr({w: Crafty.viewport.width, h: Crafty.viewport.height, z: 0, alpha: 0.01})
    .image("img/bass.jpg")
    .tween({z: 0, alpha: .7}, 400)
    .bind('TweenEnd', function() {
      this.tween({z: 0, alpha: .2}, 1000)
    })

var announcement = function(points, feedback, color) {
  Crafty('Points').each(function() {
    this.text(this.points += (points * this.multiplier))
  })
  Crafty('Words').each(function() {
    this.text(this.result = feedback)
    .css({"-webkit-text-fill-color": "black", "-webkit-text-stroke": color})
  })
}

var combos = function(boost) {
  Crafty('Combo').each(function() {
    this.text(this.combos += boost)

    gauge.set(this.combos); // set actual value
    if (this.combos >= 5000) {
      Crafty.audio.play('combo');
      Crafty.e("2D, DOM, Image, Tween")
    .attr({w: Crafty.viewport.width, h: Crafty.viewport.height, z: 0, alpha: .01})
    .image("img/cyanbg.jpg")
    .tween({z: 0, alpha: .5}, 100)
    .bind('TweenEnd', function() {
      this.tween({z: 0, alpha: 0}, 500)
    })
      Crafty('Multiple').each(function() {
        this.text("Combo x" + (this.cbmult += 1))
      })
      this.combos = 2000
      Crafty('Points').each(function() {
        this.multiplier += 1
        this.points += 15000
      })
      opts['colorStop'] = '#FFFFFF';
    }
  })
}

var pushBar = function(y, color, image) {
  return Crafty.e("PushBar, 2D, DOM, Color, Image")
    .image(image)
    .attr({x: 30, y: y, z: 10})
    .bind('KeyDown', function(e) {
    })
}

var row = function(color, y, h) {
  return Crafty.e("Row, 2D, DOM, Color, HideShow, Tween")
  .attr({y: y, w: Crafty.viewport.width, h: h, z: 9, alpha: 0.01})
  .color(color)
}

var smoke = function(y, image) {
  return Crafty.e("Smoke, 2D, DOM, HideShow, Image, Tween")
  .attr({x: 30, y: y, z: 100, alpha: 0.01})
  .image(image);
}

var bar = function(y, color, image) {
  return Crafty.e("2D, DOM, Color, Collision, Image, HideShow, Tween")
  .attr({ x: 850, y: y, w: 10, h: 30, z: 10, 
      dX: Crafty.math.randomInt(-6, -8), 
      dY: 0})
  .image(image)
  .bind('EnterFrame', function () {

    if (this.x < -10) {
      Crafty.audio.play('fail')
      this.destroy();
      announcement(-300, 'MISSED!', "2px white")
      r5.tween({alpha: 0.6}, 200)
      .bind('TweenEnd', function() {
        this.hide()
      })
      Crafty('Life').each(function() {
        this.text("Saves: " + (this.lifecount -= 1))
      })
      Crafty('Combo').each(function() {
        if (this.combos >= 1100) {
          this.text(this.combos -= 100)
        } else {
          this.text(this.combos = 1000)
        }
        gauge.set(this.combos)
      })
    }
    this.x += this.dX;
    this.y += this.dY;
  })
}
 

var barGenerate = function(y, color, arrowKey, image) {
  countdown = 70
  var timer = 0
  pushBar(y, color, image).bind('EnterFrame', function() {

     Crafty('Life').each(function() {
        this.timeout(function() {
          this.lifecount = 0;
        }, 78000)
        if (this.lifecount == 0) {
          Crafty("Points").each(function() {
            this.tween({x: 320, y: 72, rotation: 1080}, 500)
            this.textFont({ size: '50px', weight: "bolder" })
            this.css({'text-align': 'center'})
            this.timeout(function() {
              this.hide();
            }, 12000)
          })
          Crafty("2D").each(function () {
            if (!this.has("Persist")) {
              this.destroy();
            }
          });
          $('#foo').css({"display": "none"})
          Crafty.audio.stop()
          Crafty.audio.play('intro')
          Crafty.scene('Opening')
          resumebutton.css({"display": "none"})
          closebutton.css({"display": "inline"})
        }
      })
    timer += 1
    if (timer >= 3700) {
      return
    }
    if (countdown > 0) {
      countdown -= 1
    } else {
      var random = Math.random(50) * 10
      if (random > 4) {
        bar(y, color, image).bind('KeyDown', function(e) {
          if (e.key == arrowKey) {


            if (this.hit('PushBar') !== false) {
              Crafty.audio.play('node');
              this.tween({alpha: .2}, 50)
              .bind('TweenEnd', function() {
                this.destroy()
              })
              smokeToRow[arrowKey].tween({alpha: .7, z: 50}, 200)
              .bind('TweenEnd', function() {
                this.hide();
              })
              arrowKeyToRow[arrowKey].tween({alpha: 0.6}, 200)
              .bind('TweenEnd', function() {
                this.hide();
              })
              if (this.x > 23 && this.x < 34) {
                announcement(1005, 'AWESOME!', '2px lawngreen')
                combos(200)
              } else if (this.x > 19 && this.x < 41) {
                announcement(805, 'GOOD!', '2px cyan')
                combos(150)
              } else if (this.x > 16 && this.x < 47) {
                announcement(605, 'OKAY!', '2px orange')
                combos(100)
              } else if (this.x > 13 && this.x < 53) {
                announcement(405, 'BAD!', '2px crimson')
                combos(50)
              }
            } else {
              Crafty('Points').each(function() {
                this.text(this.points -= 50)            
              })

            }
          }
        })
        countdown = 70
      }
    }
  })
}

Crafty.audio.play('bgmusic');
//Score boards
r1 = row('#ff1919', 56, 74)
r2 = row('yellow', 131, 73)
r3 = row('green', 205, 76)
r4 = row('#1E90FF', 282, 68)
r5 = row('#FF3300', 0, 55)

key1 = Crafty.keys.UP_ARROW
key2 = Crafty.keys.DOWN_ARROW
key3 = Crafty.keys.RIGHT_ARROW
key4 = Crafty.keys.LEFT_ARROW

arrowKeyToRow = {
  '38': r1,
  '40': r2,
  '39': r3,
  '37': r4
}

smoke1 = smoke(60, "img/smoke.png");
smoke2 = smoke(135, "img/smoke2.png");
smoke3 = smoke(210, "img/smoke3.png");
smoke4 = smoke(281, "img/smoke4.png");

smokeToRow = {
  '38': smoke1,
  '40': smoke2,
  '39': smoke3,
  '37': smoke4
}

//Bar

barGenerate(60, 'red', key1, 'img/arrowiconup.png', 56, 74)
barGenerate(135, 'yellow', key2, 'img/arrowicondown.png', 131, 73)
barGenerate(210, 'green', key3, 'img/arrowiconright.png', 205, 76)
barGenerate(281, 'blue', key4, 'img/arrowiconleft.png', 282, 68)



Crafty.e("Words, DOM, 2D, Text, Result")
.attr({x: 280, y: 8, w: 100, h: 40, result: ""})
.text("")
.textColor('#FFFFFF')
.textFont({ size: '35px', weight: 'bolder', family: 'Audiowide' })
.css({'text-align': 'center'})
Crafty.e("Points, DOM, 2D, Text, Multiplier, Persist, Tween, HideShow")
  .attr({ x: 20, y: 18, w: 100, h: 20, points: 0, multiplier: 1, rotation: 0 })
  .text("0")
  .textColor('#FFFFFF')
  .textFont({ size: '20px', weight: 'bold', family: 'Helvetica' })
Crafty.e("Life, DOM, 2D, Text, LifeCount")
  .attr({ x: 600, y: 18, w: 130, h: 20, lifecount: 30 })
  .text("Saves: 30")
  .textColor('#FFFFFF')
  .textFont({ size: '14px', weight: 'bold', family: 'Audiowide' })
  .css({"letter-spacing": "2px"})
  Crafty.e("Combo, DOM, 2D, Text, combos")
  .attr({x:743, y: 20, w: 100, h: 20, combos: 1000})
  .text("1000")
  .textColor('#FFFFFF')
  .textFont({ size: '14px', weight: 'bold', family: 'Helvetica' })
  Crafty.e("Multiple, DOM, 2D, Text, combos")
  .attr({x: 105, y: 21, w: 130, h: 20, cbmult: 1})
  .text("Combo x1")
  .textColor('#FFFFFF')
  .textFont({ size: '14px', weight: 'bold', family: 'Audiowide' })
  .css({"letter-spacing": "2px"})

})


Crafty.c("HideShow", {
  hide : function() {
    this.attr({
        z : 0,
        alpha: 0.01
    });
},

  show : function() {
    this.attr({
        z : 2,
        alpha : 1
    })
  }
});
Crafty.load([
  'img/smoke.png',
  'img/smoke2.png',
  'img/smoke3.png',
  'img/smoke4.png',
  'img/arrowiconup.png',
  'img/arrowicondown.png',
  'img/arrowiconright.png',
  'img/arrowiconleft.png',
  'img/cyanbg.jpg',
  'img/bass.jpg',
  'soundfx/mufflebite.mp3',
  'soundfx/mufflebite.ogg',
  'soundfx/mufflebite.wav',
  'soundfx/intro.mp3',
  'soundfx/intro.wav',
  'soundfx/combobite.mp3',
  'soundfx/combobite.wav',
  'soundfx/quickbite.mp3',
  'soundfx/quickbite.ogg',
  'soundfx/quickbite.wav',
  'soundfx/bumpbite.mp3',
  'soundfx/bumpbite.ogg',
  'soundfx/bumpbite.wav',
  'soundfx/ccrashers.mp3'])

Crafty.audio.add({
  node: ['soundfx/quickbite.mp3',
        'soundfx/quickbite.ogg',
        'soundfx/quickbite.wav',],
  combo: ['soundfx/combobite.mp3',
        'soundfx/combobite.wav'],
  intro: ['soundfx/intro.mp3',
        'soundfx/intro.wav'],
  fail: ['soundfx/bumpbite.mp3',
        'soundfx/bumpbite.ogg',
        'soundfx/bumpbite.wav'],
  bgmusic: ['soundfx/ccrashers.mp3']
})
Crafty.scene('Opening')
}
