export default class Movimiento {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['cuenta'],
      obj['categoria'],
      obj['subcategoria'],
      obj['fecha'],
      obj['descripcion'],
      obj['monto'],
      obj['tipo']
    )
  }

  public constructor(
    public id: string,
    public cuenta: string,
    public categoria: string,
    public subcategoria?: string,
    public fecha?: Date,
    public descripcion?: string,
    public monto?: number,
    public tipo?: string,
  ) { }
};
