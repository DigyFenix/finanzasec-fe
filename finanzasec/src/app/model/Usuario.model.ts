export class Usuario{
  static instance(obj:any){
      return new this(
          obj['id'],
          obj['correo'],
          obj['nombre'],
          obj['foto']
      );
  }
  private constructor(
      public id     :string,
      public correo    :string,
      public nombre      :string,
      public foto      :string
  ){}
}
