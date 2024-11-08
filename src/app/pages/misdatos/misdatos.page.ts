import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from '../../model/Usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef })
  itemFechaNacimiento!: ElementRef;

  public usuario: Usuario = new Usuario(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NivelEducacional.findNivelEducacionalById(1)!,
    undefined
  );

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  public repetirPassword: string = ''; // Para verificar la coincidencia de contraseñas

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras.state) {
      this.usuario = nav.extras.state['usuario'];
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {}

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);
      animation.play();
    }
    this.createPageTurnAnimation();
  }

  public limpiar1(): void {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.nivelEducacional =
      NivelEducacional.findNivelEducacionalById(1)!;
    this.usuario.fechaNacimiento = undefined;

    this.animateItem1(this.itemCuenta.nativeElement, 800);
    this.animateItem1(this.itemNombre.nativeElement, 1100);
    this.animateItem1(this.itemApellido.nativeElement, 1300);
    this.animateItem1(this.itemEducacion.nativeElement, 1500);
    this.animateItem1(this.itemFechaNacimiento.nativeElement, 2000);
  }

  public limpiar2(): void {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.nivelEducacional =
      NivelEducacional.findNivelEducacionalById(1)!;
    this.usuario.fechaNacimiento = undefined;

    this.animateItem2(this.itemCuenta.nativeElement, 800);
    this.animateItem2(this.itemNombre.nativeElement, 1100);
    this.animateItem2(this.itemApellido.nativeElement, 1300);
    this.animateItem2(this.itemEducacion.nativeElement, 1500);
    this.animateItem2(this.itemFechaNacimiento.nativeElement, 2000);
  }

  public mostrarDatosPersonales() {
    // Aquí puedes agregar lógica para mostrar los datos personales del usuario
  }

  public guardarDatos(): void {
    // Validar que la cuenta y la contraseña no estén vacías
    if (this.usuario.cuenta.trim() === '' || this.usuario.password.trim() === '') {
      this.presentAlert('Error', 'La cuenta y la contraseña son obligatorias.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.usuario.password !== this.repetirPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Mostrar un mensaje de confirmación
    this.presentAlert('Guardado', 'Los datos se han guardado correctamente.');
  }

  public animateItem1(elementRef: any, duration: number) {
    const animation = this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(duration)
      .fromTo('transform', 'translate(100%)', 'rotateY(0%)')
      .fromTo('opacity', 0.2, 1);
    animation.play();
  }

  public animateItem2(elementRef: any, duration: number) {
    const animation = this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(duration)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');
    animation.play();
  }

  createPageTurnAnimation() {
    const animation = this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotateY(0deg)', 'rotateY(-180deg)')
      .duration(1000)
      .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)');
    animation.play();
  }

  public mostrarDatosPersona(): void {
    // Validar que la cuenta no esté vacía
    if (this.usuario.cuenta.trim() === '') {
      this.presentAlert(
        'Datos personales',
        'Para mostrar los datos de la persona, ' + 'debe ingresar su cuenta.'
      );
      return;
    }

    // Validar que al menos haya un nombre o apellido ingresado
    if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
      this.presentAlert(
        'Datos personales',
        'Para mostrar los datos de la persona, ' +
          'al menos debe tener un valor para el nombre o el apellido.'
      );
      return;
    }

    // Mostrar los datos personales en un mensaje emergente
    let mensaje = `
      <small>
        <br>Cuenta: ${this.usuario.cuenta}
        <br>Usuario: ${this.usuario.correo}
        <br>Nombre: ${this.usuario.nombre}
        <br>Apellido: ${this.usuario.apellido}
        <br>Educación: ${this.usuario.getTextoNivelEducacional()}
        <br>Nacimiento: ${this.formatDateDDMMYYYY(this.usuario.fechaNacimiento)}
      </small>
    `;
    this.presentAlert('Datos personales', mensaje);
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public formatDateDDMMYYYY(date: Date | undefined): string {
    if (!date) return 'No asignada';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
