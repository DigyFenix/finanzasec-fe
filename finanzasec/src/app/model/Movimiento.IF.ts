export default class Movimiento {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['idcuenta'],
      obj['idsubcategoria'],
      obj['fecha'],
      obj['descripcion'],
      obj['monto']
    )
  }

  public constructor(
    public id: string,
    public idcuenta: string,
    public idsubcategoria?: string,
    public fecha?: string,
    public descripcion?: string,
    public monto?: string,
  ) { }
};
