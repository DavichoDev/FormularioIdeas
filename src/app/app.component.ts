import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'jarallax';
declare var jarallax: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

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
    {value: 'Librero', viewValue: 'Construccion'},
    {value: 'Closet', viewValue: 'Costeo/Presupuesto'},
    {value: 'Sofa', viewValue: 'Consulta'}
  ];

  constructor(private formBuilder: FormBuilder) {

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
      nombre: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: [''],
      correo: ['', Validators.required],
      numeroTel: ['', Validators.required],
      numeroFijo: ['', Validators.required],
      domicilio: [''],
      codigoPostal: ['']
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  subirImagen( files ): void { // Temp
    if (files.length === 0) { return; }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => this.imgURL = reader.result;
  }

  imprimirFormaUno(): void{
    console.log(this.firstFormGroup.value);
  }
  imprimirFormaDos(): void{
    console.log(this.firstFormGroup.value);
  }
  imprimirFormaTres(): void{
    console.log(this.firstFormGroup.value);
  }


}
