// const Express = require( 'express' );
import Express from 'express';

const PORT_NUMBER = 3500;
const app = Express();

app.use( '/', ( request, response ) => {
  response.send( 'it works' );
});

app.listen( PORT_NUMBER, () => {
  console.log( `App running at ${PORT_NUMBER}` );
});
