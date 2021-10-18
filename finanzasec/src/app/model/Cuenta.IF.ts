import { Usuario } from './Usuario.model';
export default class Cuenta {
  static instance(obj: any) {
    return new this(
      obj['id'],
      obj['usuario'],
      obj['descripcion']
    )
  }

  public constructor(
    public id: string,
    public usuario: Usuario,
    public descripcion?: string,
  ) { }
};
