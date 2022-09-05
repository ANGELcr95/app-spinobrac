## APP MOBILE
Languages:react native
## Eject Web
expo start --web
## Fixed Dependencies
expo doctor --fix-dependencies
## Dependencies
### Production
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack (para poder crear rutas)
npm install @react-navigation/bottom-tabs   (para crear btns en bottom
### Development
nodemon ( reinit server )
@babel/core ( transpilador )
@babel/cli ( escribir comandos  desde consola )
@babel/preset-env ( convertr j moderno a actual )
@babel/node ( ejecute el codigo atraves de c node )

## project tree
### App.js
created routes

### components
visual fragments code in project 

### Layouts
## layout.js
- share styles on screens also for components

## screens
windows can see 
- HomeScreen widow initial

### steps
1 crated script Build ()
- lea todo lo de la carpeta src (busca ela rchivo index.js o si no lo rutea )y mandelo a dist 
donde en src puedo tener culaquier ES6 a anterior en dist
- creo otro comando(dev) para reiniciar mi servidor con

2 created rest api
estructuro esquelto
 -controllers: que es ejecutar una funcion dependiendo la ruta que es visitada,qui importo mi base  de  datos del fichero database.js
 -routes: las rutas que la aplicacion movl puede visitar
 -config.js: importo el modulo de sql
 -database.js: archivo para conectarme a una base de datos 
 -app.js: para tener mas orden solo confguracion de express

3 craeted DB  
- aplicacion de la base de datos (sql) solo guardar acrchivo de la estrucutura que se ejecuto en la consola de la base de datos(XAMPP)

### compilated deploy
- expo build:android





