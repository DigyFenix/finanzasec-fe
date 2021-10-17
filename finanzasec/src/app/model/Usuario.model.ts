export class Usuario{
  static instance(obj:any){
      return new this(
          obj['idusuario'],
          obj['correo'],
          obj['nombre'],
          obj['foto']
      );
  }
  private constructor(
      public idusuario     :string,
      public correo    :string,
      public nombre      :string,
      public foto      :string
  ){}
}
