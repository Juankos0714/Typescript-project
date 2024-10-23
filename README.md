# Typescript-project
para poder utilizar y probar cada uno de los archivos, tiene que cambiar en el packeage.json el script dev:
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node src/index.ts",
    "dev": "nodemon --exec ts-node src/index5.ts"
  },
  al archivo que desee iniciar.