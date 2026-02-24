const { createApp } = require('./src/app');

const app = createApp();
const port = Number(process.env.PORT) || 5000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});

module.exports = app;
