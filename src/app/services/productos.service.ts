import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductosService {

  productos: any[] = [];
  cargando_productos = true;

  constructor(private http: HttpClient) {

    this.cargar_productos();

  }


  public cargar_producto(cod: string) {
    return this.http.get(`https://portafolio-web-378d7.firebaseio.com/productos/${cod}.json`);
  }


  public cargar_productos() {

    this.cargando_productos = true;

    if (this.productos.length === 0) {
      this.http.get('https://portafolio-web-378d7.firebaseio.com/productos_idx.json')
        .subscribe( res => {
          this.cargando_productos = false;
          this.productos = res;
        });

    }
  }

}
