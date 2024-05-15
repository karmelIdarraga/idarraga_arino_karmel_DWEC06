export class Tarea{
      //atributos
      public id : string;
      public nombre : string;
      public descripcion : string;
      public completed : boolean;
      public priority : number;
      public fechaLimite : string;
  
      //constructor
      constructor(id : string, nombre : string, descripcion : string, isCompleted : boolean, priority : number, fechaLimite : string){
          this.id = id;
          this.nombre = nombre;
          this.descripcion = descripcion;
          this.completed = isCompleted;
          this.priority = priority;
          this.fechaLimite = fechaLimite;
      }

      //metodos
      public getNombre() : string{
        return this.nombre;
      }

      public getDescripcion() : string{
        return this.descripcion;
      }

      public isCompleted() : boolean{
        return this.completed;
      }

      public getPriority() : number{
        return this.priority;
      }

      public getFechaLimite() : string{
        return this.fechaLimite;
      }
}