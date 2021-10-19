export default class Movimiento {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['cuenta'],
      obj['subcategoria'],
      obj['fecha'],
      obj['descripcion'],
      obj['monto']
    )
  }

  public constructor(
    public id: string,
    public cuenta: string,
    public subcategoria?: string,
    public fecha?: Date,
    public descripcion?: string,
    public monto?: string,
  ) { }
};
