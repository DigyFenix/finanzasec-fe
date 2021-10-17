export default class Cuenta {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['idusuario'],
      obj['descripcion']
    )
  }

  public constructor(
    public id: string,
    public idusuario: string,
    public descripcion?: string,
  ) { }
};
