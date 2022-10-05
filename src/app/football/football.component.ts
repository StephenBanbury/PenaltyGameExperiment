import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  SphereGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css'],
})
export class FootballComponent implements OnInit {
  // @HostListener('window:keydown', ['$event']) keyPress(event: any) {
  //   this.keyEvent(event.keyCode);
  // }

  @Input()
  startAnimation!: Subject<boolean>;

  @Input()
  resetAnimation!: Subject<boolean>;

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  // Sphere properties
  @Input() public rotationSpeedX: number = 0.001;
  @Input() public rotationSpeedY: number = 0.001;
  @Input() public velocity: number = 0;
  @Input() public size: number = 1;
  @Input() public sizeChangeRate: number = 0.001;
  @Input() public texture: string = '/assets/football.jpg';

  // Stage properties
  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farclippingPlane: number = 1000;

  // Helper Properties (Private Properties);
  private camera!: PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new TextureLoader();
  private geometry = new SphereGeometry(2, 40, 40);

  private material = new MeshBasicMaterial({
    map: this.loader.load(this.texture),
  });

  private sphere: Mesh = new Mesh(this.geometry, this.material);
  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private footballSize: number = 1;

  //private isRendering: boolean = false;

  private tick: number = 0;

  constructor() {}

  ngAfterViewInit() {
    this.createScene();
    this.setListeners();
  }

  ngOnInit(): void {
  }

  private setListeners() {
    this.startAnimation.subscribe((start) => {
      console.log('start animation', start);
      if (start) {
        this.footballSize = this.size;
        this.showFootball(true);
        //this.isRendering = true;
        this.startRenderingLoop();
      }
    });
    this.resetAnimation.subscribe((reset) => {
      console.log('reset animation', reset);
      if (reset) {
        this.showFootball(false);
        //this.isRendering = false;
        // while(this.scene.children.length > 0){
        //   this.scene.remove(this.scene.children[0]);
        // }
        //this.isRendering = false;
      }
    });
  }

  private showFootball(isVisible: boolean) {
    this.sphere.traverse(function (child) {
      if (child instanceof Mesh) {
        child.children.forEach(child => child.visible = isVisible);
        child.visible = isVisible;
        console.log('visible', child.visible);
      }
    });
  }

  private createScene() {
    //* Scene
    this.scene = new Scene();
    //this.scene.background = new Color(0x000000);
    this.sphere.rotation.x = 0.3;
    this.sphere.rotation.y = 0.3;
    this.scene.add(this.sphere);

    //* Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farclippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }


  private animate() {
    this.sphere.rotation.x += this.rotationSpeedX;
    this.sphere.rotation.y += this.rotationSpeedY;
    if (this.footballSize >= 0.2) {

      this.tick++;
      console.log(this.tick, 'footballSize', this.footballSize, ', sizeChangeRate', this.sizeChangeRate);

      this.footballSize -= this.sizeChangeRate;
      this.sphere.scale.set(this.footballSize, this.footballSize, this.footballSize);
    }
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new WebGLRenderer({ alpha: true, canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: FootballComponent = this;

    this.tick = 0;

    (function render() {
        requestAnimationFrame(render);
        component.animate();
        component.renderer.render(component.scene, component.camera);
    })();
  }

  // keyEvent(keyCode: number) {
  //   console.log(keyCode);
  //   switch (keyCode) {
  //     case 37: // Left
  //       this.rotationSpeedY -= 0.001;
  //       break;
  //     case 38: // Up
  //       this.rotationSpeedX -= 0.001;
  //       break;
  //     case 39: // Right
  //       this.rotationSpeedY += 0.001;
  //       break;
  //     case 40: // Down
  //       this.rotationSpeedX += 0.001;
  //       break;
  //     case 187: // Plus
  //       this.size += 0.01;
  //       break;
  //     case 189: // Minus
  //       this.size -= 0.01;
  //       break;
  //   }
  //}
}
