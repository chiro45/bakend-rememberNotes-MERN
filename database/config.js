//importamos moongose => paquete que nos ayuda a trabajar con la base de datos mongoDb
const mongoose = require('mongoose');


const dbConnection = async()=>{
    try{
        
        const dbDir = process.env.DB_CNN;
        console.log(dbDir)
        //hacemos la coneccion
        await mongoose.connect(dbDir);
        //devolvemos un mensaje diciendo que esta perfecto
       console.log('dbOnline')

    }catch (error){

        //en el caso de error retornamos esto
        console.error(error)
        throw new Error("Error al conectarse en la base de datos")
    }
}

module.exports ={
    dbConnection
}