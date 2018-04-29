import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InformacionService {

  info: any = {};
  cargada = false;
  cargada_nosotros = false;
  equipo: any[] = [];

  constructor(public http: HttpClient) {

      this.carga_info();
      this.cargar_nosotros();

  }

  public carga_info() {
    this.http.get('assets/data/info.pagina.json')
      .subscribe(data => {
        this.cargada = true;
        this.info = data;
      });
  }

  public cargar_nosotros() {

    this.http.get('https://portafolio-web-378d7.firebaseio.com/equipo.json')
      .subscribe(data => {
        console.log(data);
        this.cargada_nosotros = true;
        this.equipo = data;
      });


  }

}
