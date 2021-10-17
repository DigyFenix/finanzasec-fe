export default class Categoria {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['idcuenta'],
      obj['descripcion']
    )
  }

  public constructor(
    public id: string,
    public idcuenta: string,
    public descripcion?: string,
  ) { }
};
