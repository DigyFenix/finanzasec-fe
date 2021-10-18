export default class Categoria {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['cuenta'],
      obj['descripcion'],
      obj['descripcionCuenta']
    )
  }

  public constructor(
    public id: string,
    public cuenta: string,
    public descripcion?: string,
    public descripcionCuenta?: string
  ) { }
};
