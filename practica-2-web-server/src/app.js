


const main = () => {
    console.log('Aquí comenzaremos el servidor');
}

// Función agnóstica autoconvocada
// Agnóstica porque no tiene nombre
// Autoconvocada porque la ejecutamos con los parentesis
(async () => {
    main()
})()