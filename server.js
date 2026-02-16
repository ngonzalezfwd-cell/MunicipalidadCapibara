// //AQUI SE PROGRAMA LA CONFIGURACION PARA EL SERVIDOR DSP 
// //NO SE TOCA MAS 
// //E
// const express = require('express');
// const path = required('path');

// const app = express();
// app.use(express.static(path.join(__dirname, 'public'))); 
// //LOS ARCHIVOS ESTATICOS A TRAVES DE EXPRESS VAN A ESTA AHI

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname,'public', 'pages/index.html'));

// });

// const PORT = 3000; //ESTANDAR DEL PUERTO

// app.listen(PORT, () => {
//     console.log('Server is running on port http://localhost:'); //
// });

const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages/index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);

});

//CONTROL + C para apagar el SERVER 