import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'jarallax';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { EmailService } from './services/email.service';

declare var jarallax: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  public terminos = false;

  public stepOneValid = false;
  public stepTwoValid = false;
  public stepThreeValid = false;

  public imagePath;
  imgURL: any;

  materiales: any[] = [
    {value: 'Madera Macisa', viewValue: 'Madera Macisa'},
    {value: 'MDF', viewValue: 'MDF'},
    {value: 'Melamina', viewValue: 'Melamina'}
  ];

  acabados: any[] = [
    {value: 'Poliester', viewValue: 'Poliester (Resiste hasta exteriores) $$$$'},
    {value: 'Poliuretano', viewValue: 'Poliuretano (Resiste interiores y humedad) $$$'},
    {value: 'Melamina', viewValue: 'Melamina (Solo interiores) $$'},
    {value: 'Nitrocelulosa', viewValue: 'Nitrocelulosa (Acabados de oficina) $'}
  ];

  tipos: any[] = [
    {value: 'Librero', viewValue: 'Librero'},
    {value: 'Closet', viewValue: 'Closet'},
    {value: 'Sofa', viewValue: 'Sofa'},
    {value: 'Mesa', viewValue: 'Mesa'},
    {value: 'Otro', viewValue: 'Otro'}
  ];

  solicitudes: any[] = [
    {value: 'Contruccion', viewValue: 'Construccion'},
    {value: 'Costeo/Presupuesto', viewValue: 'Costeo/Presupuesto'},
    {value: 'Consulta', viewValue: 'Consulta'}
  ];

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {

    this.crearFormulario();

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
  }

  crearFormulario(): void{

    this.firstFormGroup = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(`^[a-zA-Z]*$`)]],
      apellidoPat: ['', [Validators.required, Validators.pattern(`^[a-zA-Z]*$`)]],
      apellidoMat: ['', Validators.pattern(`^[a-zA-Z]*$`)],
      correo: ['', [Validators.required, Validators.email]],
      numeroTel: ['', [Validators.required, Validators.pattern(`^((\\+91-?)|0)?[0-9]{10}$`)]],
      numeroFijo: ['', Validators.pattern(`^((\\+91-?)|0)?[0-9]{10}$`)],
      domicilio: [''],
      codigoPostal: ['', Validators.pattern(`^((\\+91-?)|0)?[0-9]{10}$`)]
    });

    this.secondFormGroup = this.formBuilder.group({
      alto: ['', [Validators.required, Validators.pattern(`[0-9]+(\.[0-9][0-9]?)?`)]],
      largo: ['', [Validators.required, Validators.pattern(`[0-9]+(\.[0-9][0-9]?)?`)]],
      ancho: ['', [Validators.required, Validators.pattern(`[0-9]+(\.[0-9][0-9]?)?`)]],
      material: ['', Validators.required],
      tipoMueble: ['', Validators.required],
      color: ['', Validators.required],
      acabado: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
      file: [null]
    });

  }

  subirImagen( files ): void {
    if (files.length === 0) { return; }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => this.imgURL = reader.result;
  }

  imprimirFormaUno(): void{
    // console.log(this.firstFormGroup.value);
  }
  imprimirFormaDos(): void{
    // console.log(this.secondFormGroup.value);
  }

  async onFileChange(file) {

    await this.emailService.enviarImg(file.files[0]).subscribe((img) => {
      this.secondFormGroup.patchValue({
        file: img
     });
    });


  }

  async obtenerUrlImg( imgToSend ) {
    const respuesta = await this.emailService.enviarImg(imgToSend).subscribe();
    return respuesta;
  }

  async enviarFormulario() {

    const jsonForm = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);

    await this.emailService.enviarFormulario( jsonForm ).subscribe(response => {
      console.log(response);
    });

    Swal.fire({
      icon: 'success',
      title: 'Tu solicitud se ha enviado correctamente.',
      text: 'Ve la bandeja de tu correo, recibirás una respuesta exitosa.'
    });

  }


}
