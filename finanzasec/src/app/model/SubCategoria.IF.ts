export default class SubCategoriaInterface {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['idcategoria'],
      obj['descripcion'],
      obj['tipo']
    )
  }

  public constructor(
    public id: string,
    public idcuenta: string,
    public descripcion?: string,
    public tipo?: string
  ) { }
};
