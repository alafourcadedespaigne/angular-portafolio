import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductosService {

  productos: any[] = [];
  productos_filtrados: any[] = [];
  cargando_productos = true;

  constructor(private http: HttpClient) {

    this.cargar_productos();

  }


  public buscar_producto(termino: string) {




    if (this.productos.length === 0) {
      this.cargar_productos().then(() => {

        // Termino la carga
        this.filtrar_productos(termino);
      });
    } else {
      this.filtrar_productos(termino);
    }
  }

  private filtrar_productos(termino: string) {

    this.productos_filtrados = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      if (prod.categoria.indexOf(termino) >= 0 || prod.titulo.toLowerCase().indexOf(termino) >= 0) {
        this.productos_filtrados.push(prod);
      }

    });
  }

  public cargar_producto(cod: string) {
    return this.http.get(`https://portafolio-web-378d7.firebaseio.com/productos/${cod}.json`);
  }


  public cargar_productos() {

    this.cargando_productos = true;

    const promesa = new Promise((resolve, reject) => {

      this.http.get<any[]>('https://portafolio-web-378d7.firebaseio.com/productos_idx.json')
        .subscribe(res => {
          this.cargando_productos = false;
          this.productos = res;
          resolve();
        });

    });

    return promesa;
  }

}
