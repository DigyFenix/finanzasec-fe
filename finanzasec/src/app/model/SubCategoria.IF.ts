export default class SubCategoria {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['categoria'],
      obj['descripcion'],
      obj['tipo']
    )
  }

  public constructor(
    public id: string,
    public categoria: string,
    public descripcion?: string,
    public tipo?: string
  ) { }
};
