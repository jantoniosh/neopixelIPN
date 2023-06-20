$(document).ready(function () {
    let socket = io();

    let c = {
        r: 0,
        g: 0,
        b: 0
    };

    socket.emit("colorNeopixel", c);
    $("#rgb").css("background-color", `rgb(${c.r}, ${c.g}, ${c.b})`);

    $("#rojo").on("input", function () {
        let val = $(this).val();
        $("#tituloRojo").html(`R = ${val}`);
        c.r = val;
        setColor();
    });

    $("#verde").on("input", function () {
        let val = $(this).val();
        $("#tituloVerde").html(`G = ${val}`);
        c.g = val;
        setColor();
    });

    $("#azul").on("input", function () {
        let val = $(this).val();
        $("#tituloAzul").html(`B = ${val}`);
        c.b = val;
        setColor();
    });

    function setColor() {
        socket.emit("colorNeopixel", c);
        $("#rgb").css("background-color", `rgb(${c.r}, ${c.g}, ${c.b})`);
    }

    socket.on("color", (msg) => {
        console.log(msg);
        setColor(msg)
    });
});