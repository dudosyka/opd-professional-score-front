<template>
  <div class="instruction-static">
      <div class="col progress-col">
          <div class="progress">
              Прогресс {{ gameStatic.iterationPassed }} / {{ gameStatic.iterationCount }}
          </div>
          <div class="progress">
              Правильно {{ results.filter(el => el !== false && el !== null).length }} / {{ gameStatic.iterationCount }}
          </div>
      </div>
      <div class="key-block">
          <div class="label">
              Зелёный
          </div>
          <div class="key">
              S
          </div>
      </div>
      <div class="key-block">
          <div class="label">
              Розовый
          </div>
          <div class="key">
              D
          </div>
      </div>
      <div class="key-block">
          <div class="label">
              Синий
          </div>
          <div class="key">
              F
          </div>
      </div>
  </div>
</template>

<script>
// import '@/three';

import {UserTestModel} from "@/api/models/user-test.model";

var scene, camera, renderer, container;
var _width, _height;
var _primitive;
var shapeGroup = new THREE.Group();
var start = Date.now();


export default {
  name: "SimpleColorGame",
  data: () => ({
    theme: {
      primary: 0xFFFFFF,
      secundary: 0x292733,
      danger: 0xFF0000,
      darker: 0x000000
    },
    mat: null,
    gameSettingsInput: {
      repeat: 10,
      // time: 1000*60*1 // 1 minute in ms
      time: 1000*60*0.25,
      startDelay: 2000,
      switchTime: 1000,
      circleTimeRange: {
        //min and max time between iterations in ms
        min: 7000,
        max: 8500
      }
    },
    gameStatic: {
      ended: false,
      pickedColor: 1,
      changeTime: 0,
      clicked: false,
      iterationCount: 10,
      iterationPassed: 0,
      colors: {
        white: {
          rcolor: 1.6,
          gcolor: 0.4,
          bcolor: 2,
        },
        accent1: {
          rcolor: 0,
          gcolor: 1.4,
          bcolor: 0.2,
        },
        accent2: {
          rcolor: 1.2,
          gcolor: 2.2,
          bcolor: 1,
        },
        accent3: {
          rcolor: 0,
          gcolor: 2.5,
          bcolor: 1,
        }
      },
      pickedColorToKey: {
        1: 'KeyS',
        2: 'KeyD',
        3: 'KeyF'
      }
    },
    results: [],
    options: {
      perlin: {
        speed: 0.4,
        size: 2.6,
        perlins: 1.0,
        decay: 1.20,
        displace: 1.00,
        complex: 0.50,
        waves: 3.7,
        eqcolor: 11.0,
        rcolor: 1.6,
        gcolor: 0.4,
        bcolor: 2,
        fragment: true,
        points: true,
        redhell: true
      },
      random: function() {
        //this.perlin.redhell = Math.random() >= 0.5; // 10 1 0.1 1.2
        TweenMax.to(this.perlin, 1, {
          eqcolor: 11.0,
          rcolor: Math.random() * 1.5,
          gcolor: Math.random() * 0.5,
          bcolor: Math.random() * 1.5,
          ease:Quart.easeInOut
        });
      },
      normal: function() {
        this.perlin.redhell = true; // 10 1 0.1 1.2
        TweenMax.to(this.perlin, 1, {
          //speed: 0.12,
          eqcolor: 10.0,
          rcolor: 1.5,
          gcolor: 1.5,
          bcolor: 1.5,
          ease:Quart.easeInOut
        });
      },
    }
  }),
  created() {
    const onPass = this.$store.getters.getTestOnPass;
    console.log(onPass);
    if (!onPass || !onPass.settings) {
      window.location = '/'
    }
    this.gameSettingsInput = { ...onPass.settings }
    this.createWorld();
    // this.createGUI();
    this.createPrimitive();
    this.animation();
    window.addEventListener('keydown', (e) => {
      if (e.code == 'KeyS' || e.code == 'KeyD' || e.code == 'KeyF') {
        this.keyDown(e.code);
      }
    });
    this.startGame();
  },
  methods: {
    createWorld() {
      _width = window.innerWidth;
      _height= window.innerHeight;
      //---
      scene = new THREE.Scene();
      scene.background = new THREE.Color(this.theme.secundary);
      //---
      camera = new THREE.PerspectiveCamera(35, _width/_height, 1, 1000);
      camera.position.set(0,0,16);
      //---
      renderer = new THREE.WebGLRenderer({antialias:false, alpha:false});
      renderer.setSize(_width, _height);
      renderer.shadowMap.enabled = true;
      //---
      document.body.appendChild(renderer.domElement);
      //---
      window.addEventListener('resize', () => {
        _width = window.innerWidth;
        _height = window.innerHeight;
        renderer.setSize(_width, _height);
        camera.aspect = _width / _height;
        camera.updateProjectionMatrix();
        console.log('- resize -');
      }, false);
    },
    primitiveElement() {
      this.mesh = new THREE.Object3D();
      this.mat = new THREE.ShaderMaterial( {
        side:THREE.DoubleSide,
        uniforms: {
          time: {
            type: "f",
            value: 0.1
          },
          pointscale: {
            type: "f",
            value: 0.2
          },
          decay: {
            type: "f",
            value: 0.3
          },
          size: {
            type: "f",
            value: 0.3
          },
          displace: {
            type: "f",
            value: 0.3
          },
          complex: {
            type: "f",
            value: 0.0
          },
          waves: {
            type: "f",
            value: 0.10
          },
          eqcolor: {
            type: "f",
            value: 0.0
          },
          rcolor: {
            type: "f",
            value: 0.0
          },
          gcolor: {
            type: "f",
            value: 0.0
          },
          bcolor: {
            type: "f",
            value: 0.0
          },
          fragment: {
            type: "i",
            value: true
          },
          redhell: {
            type: "i",
            value: true
          }
        },
        vertexShader: `
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  
  // Classic Perlin noise
  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
  
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
  
    vec4 gx0 = ixy0 * (1.0 / 5.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 5.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
    vec4 gx1 = ixy1 * (1.0 / 5.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 5.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
  
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
  
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }
  
  // Classic Perlin noise, periodic variant
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
  
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
  
    vec4 gx0 = ixy0 * (1.0 / 5.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 5.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
    vec4 gx1 = ixy1 * (1.0 / 5.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 5.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
  
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
  
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 1.5 * n_xyz;
  }
  
  // Turbulence By Jaume Sanchez => https://codepen.io/spite/
  
  varying vec2 vUv;
  varying float noise;
  varying float qnoise;
  varying float displacement;
  
  uniform float time;
  uniform float displace;
  uniform float pointscale;
  uniform float decay;
  uniform float size;
  uniform float complex;
  uniform float waves;
  uniform float eqcolor;
  uniform bool fragment;
  
  float turbulence( vec3 p) {
    float t = - 0.005;
    for (float f = 1.0 ; f <= 1.0 ; f++ ){
      float power = pow( 1.3, f );
      t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
    }
    return t;
  }
  
  void main() {
  
    vUv = uv;
  
    noise = (2.0 *  - waves) * turbulence( decay * abs(normal + time));
    qnoise = (0.3 *  - eqcolor) * turbulence( decay * abs(normal + time));
    float b = pnoise( complex * (position) + vec3( (decay * 2.0) * time ), vec3( 100.0 ) );
    
    displacement = - atan(noise) + tan(b * displace);
  
    vec3 newPosition = (position) + (normal * displacement);
    gl_Position = (projectionMatrix * modelViewMatrix) * vec4( newPosition, abs(size) );
    gl_PointSize = (3.0);
  }`,
        fragmentShader: `
  varying float qnoise;
  varying float noise;
  
  uniform float time;
  uniform bool redhell;
  uniform float rcolor;
  uniform float gcolor;
  uniform float bcolor;
  
  void main() {
    float r, g, b;
    
    if (!redhell == true) {
      r = sin(qnoise + rcolor);
      g = normalize(qnoise + (gcolor / 2.0));
      b = tan(qnoise + bcolor);
    } else {
      r = normalize(qnoise + rcolor);
      g = cos(qnoise + gcolor);
      b = sin(qnoise + bcolor);
    }
    gl_FragColor = vec4(r, g, b, 1.0);
  }`
      });
      //---
      var wir_mat = new THREE.MeshBasicMaterial({color: this.theme.darker});
      var geo = new THREE.IcosahedronBufferGeometry(2, 6);
      var wir = new THREE.IcosahedronBufferGeometry(2.3, 2);
      this.shape = new THREE.Mesh(geo, this.mat);
      this.point = new THREE.Points(wir, this.mat);
      //---
      shapeGroup.add(this.point);
      shapeGroup.add(this.shape);
      
      scene.add(shapeGroup);
    },
    createPrimitive() {
      this.primitiveElement();
    },
    animation() {
      var performance = Date.now() * 0.003;
      //---
      //_primitive.shape.visible = !options.perlin.points;
      // _primitive.point.visible = this.options.perlin.points;
      //---
      this.mat.uniforms['time'].value = (this.options.perlin.speed / 1000) * (Date.now() - start);
      
      this.mat.uniforms['pointscale'].value =    this.options.perlin.perlins;
      this.mat.uniforms['decay'].value =         this.options.perlin.decay;
      this.mat.uniforms['size'].value =          this.options.perlin.size;
      this.mat.uniforms['displace'].value =      this.options.perlin.displace;
      this.mat.uniforms['complex'].value =       this.options.perlin.complex;
      this.mat.uniforms['waves'].value =         this.options.perlin.waves;
      this.mat.uniforms['fragment'].value =      this.options.perlin.fragment;
      
      this.mat.uniforms['redhell'].value =       this.options.perlin.redhell;
      this.mat.uniforms['eqcolor'].value =       this.options.perlin.eqcolor;
      this.mat.uniforms['rcolor'].value =        this.options.perlin.rcolor;
      this.mat.uniforms['gcolor'].value =        this.options.perlin.gcolor;
      this.mat.uniforms['bcolor'].value =        this.options.perlin.bcolor;
      //---
      requestAnimationFrame(this.animation);
      renderer.render(scene, camera);
    },
    generateRandom() {
      const { min, max } = this.gameSettingsInput.circleTimeRange;
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    generateRandomColor() {
      const min = 1;
      const max = 3;
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    startGame() {
      this.$store.commit('clearGameResults');
      if (this.gameSettingsInput.time) {
        this.gameStatic.iterationCount = Math.round(this.gameSettingsInput.time / (this.gameSettingsInput.switchTime + this.gameSettingsInput.circleTimeRange.max));
      } else {
        this.gameStatic.iterationCount = this.gameSettingsInput.repeat;
      }
      console.log(this.gameStatic.iterationCount);
      setTimeout(() => {
        this.iteration()
      }, this.gameSettingsInput.startDelay);
    },
    keyDown(code) {
      if (this.gameStatic.clicked)
        return;
      this.gameStatic.clicked = true;
      const clickTime = Date.now() - this.gameStatic.changeTime;
      if (this.gameStatic.pickedColorToKey[this.gameStatic.pickedColor] === code)
        this.results.push(clickTime);
      else
        this.results.push(false);
      console.log(this.results, this.gameStatic.iterationPassed);
      if (this.gameStatic.iterationCount - 1 <= this.gameStatic.iterationPassed)
        this.endGame();
    },
    iteration() {
      if (this.gameStatic.ended)
        return;
      if (this.gameStatic.iterationCount <= this.gameStatic.iterationPassed)
        this.endGame();
      
      setTimeout(() => {
        this.iteration();
      }, this.generateRandom())
      
      //If user didnt click in this iteration
      if (this.gameStatic.clicked === false && this.gameStatic.iterationPassed > 0) {
        this.results.push(null);
      }
      
      this.gameStatic.changeTime = Date.now();
      this.gameStatic.clicked = false;
      
      this.iterationAction();
    },
    iterationAction() {
      this.changeToAccent();
      setTimeout(() => {
        this.changeToWhite();
        this.gameStatic.iterationPassed++;
      }, this.gameSettingsInput.switchTime);
    },
    changeToAccent() {
      // this.gameStatic.pickedColor = 2;
      this.gameStatic.pickedColor = this.generateRandomColor();
      const { rcolor, gcolor, bcolor } = this.gameStatic.colors[`accent${this.gameStatic.pickedColor}`];
      console.log('Picked color', this.gameStatic.colors[`accent${this.gameStatic.pickedColor}`]);
      this.options.perlin.rcolor = rcolor;
      this.options.perlin.gcolor = gcolor;
      this.options.perlin.bcolor = bcolor;
      this.animation();
    },
    changeToWhite() {
      this.options.perlin.rcolor = 1.6;
      this.options.perlin.gcolor = 0.4;
      this.options.perlin.bcolor = 2;
      this.animation();
    },
    endGame() {
      this.gameStatic.ended = true;
      console.log('GAME ENDED', this.results)
      this.$store.dispatch('setGameResults', {
        type: 3,
        numbers: [...this.results],
      });
      document.getElementsByTagName('canvas')[0].remove();
      
      this.$router.push('/game/results');
    }
  }
}
</script>

<style scoped>
.instruction-static {
    display: flex;
    flex-direction: row;
    width: 70vw;
    justify-content: space-around;
    position: absolute;
    z-index: 9999;
    left: 1rem;
    bottom: 1rem;
}
.key-block, .progress {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgba(162, 162, 162, 0.4);
    padding: 1.75rem;
}
.progress {
    max-width: 200px;
}

.key-block > .label, .progress {
    color: #EFEFEF;
    font-size: 1rem;
    margin-right: 1rem;
}
.key-block > .key {
    color: #EFEFEF;
    font-size: 3rem;
    padding: .5rem;
    border-radius: .5rem;
    background-color: #0e2431;
}
.progress-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>