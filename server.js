// const Express = require( 'express' );
import Express from 'express';
import path from 'path';

const PORT_NUMBER = 3500;
const app = Express();

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/app/public`, 'index.html'))
})

app.listen( PORT_NUMBER, () => {
  console.log( `App running at ${PORT_NUMBER}` );
});
