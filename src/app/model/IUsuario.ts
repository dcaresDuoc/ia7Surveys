export interface IUsuario {
    loginResult: string;
    usuario: {
      id: number;
      userName: string;
      eMail: string;
      idPerfil: number;
      idCliente: number;
      status: number;
    };
  }
  