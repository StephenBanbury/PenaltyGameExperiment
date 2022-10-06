import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SphereGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer, Vector3 } from 'three';
import { ICornerPoints } from '../../shared/interfaces/corner-points';

@Component({
  selector: 'app-football-animation',
  templateUrl: './football-animation.component.html',
  styleUrls: ['./football-animation.component.css'],
})
export class FootballAnimationComponent implements OnInit {

  @Input() startAnimation!: Subject<boolean>;
  @Input() resetAnimation!: Subject<boolean>;

  @Input() strength: number = 1;
  @Input() shootPosition!: string;

  // Sphere properties
  @Input() public rotationSpeedX: number = 0.001;
  @Input() public rotationSpeedY: number = 0.001;
  @Input() public size: number = 1;

  // Stage properties
  @Input() public cameraZ: number = 100;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farclippingPlane: number = 10000;

  @ViewChild('canvas') private canvasRef!: ElementRef;

  public speed: number = 1;
  public accellerationRate: number = 0.00005;

  public texture: string = '/assets/football.jpg';

  // Helper Properties (Private Properties);
  private camera!: PerspectiveCamera;
  private oldPos: Vector3 = new Vector3();
  private newPos: Vector3 = new Vector3();

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


  constructor() {}

  ngAfterViewInit() {
    this.createScene();
    this.setListeners();
  }

  ngOnInit(): void {}

  private setListeners() {
    this.startAnimation.subscribe((start) => {
      console.log('start animation', start);
      if (start) {
        this.sphere.position.set(0, 0, 0);
        this.showFootball(true);
        this.startRenderingLoop();
      }
    });
    this.resetAnimation.subscribe((reset) => {
      console.log('reset animation', reset);
      if (reset) {
        //this.removeScene();
        this.showFootball(false);
      }
    });
  }

  private removeScene() {
    while(this.scene.children.length > 0){
      this.scene.remove(this.scene.children[0]);
    }
  }

  private showFootball(isVisible: boolean) {
    this.sphere.traverse(function (child) {
      if (child instanceof Mesh) {
        child.children.forEach((child) => (child.visible = isVisible));
        child.visible = isVisible;
      }
    });
  }

  private createScene() {
    //* Scene
    this.scene = new Scene();
    this.sphere.rotation.x = 0.3;
    this.sphere.rotation.y = 0.3;
    this.sphere.position.set(0, 0, 0);
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

  private cornerPoints(): ICornerPoints {
    const width = 100;
    const height = 60;
    const distance = -3000;

    const cornerPoints: ICornerPoints = {
      topLeft: new Vector3( 0 - (width / 2.5), 0 + (height / 2.5), distance),
      topRight: new Vector3( 0 + (width / 2.5), 0 + (height / 2.5), distance),
      bottomLeft: new Vector3( 0 - (width / 2.5), 0 - (height / 2.5), distance),
      bottomRight: new Vector3( 0 + (width / 2.5), 0 - (height / 2.5), distance)
    };

    return cornerPoints;
  }

  private getShootPosition(): Vector3 {
    let position = new Vector3;
    switch (this.shootPosition){
      case 'top-left':
        position = this.cornerPoints().topLeft;
      break;
      case 'top-right':
        position = this.cornerPoints().topRight;
        break;
      case 'bottom-left':
        position = this.cornerPoints().bottomLeft;
        break;
      case 'bottom-right':
        position = this.cornerPoints().bottomRight;
        break;
    }
    return position;
  }

  private animate() {
    this.sphere.rotation.x += this.rotationSpeedX;
    this.sphere.rotation.y += this.rotationSpeedY;
    this.sphere.position.lerp(this.newPos, this.speed);

    this.speed += this.accellerationRate;
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new WebGLRenderer({ alpha: true, canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: FootballAnimationComponent = this;

    this.oldPos = this.sphere.position;
    this.newPos = this.getShootPosition();

    this.speed = this.strength / 100000;

    console.log(
      'Move params',
      'From:', this.oldPos,
      'To:', this.newPos,
      'Speed:', this.speed,
      'Accelleration:', this.accellerationRate
    );

    (function render() {
      requestAnimationFrame(render);
      component.animate();
      component.renderer.render(component.scene, component.camera);
    })();
  }
}
