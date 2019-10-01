# input-numerico
Componente Vue.js simples. É necessário o input-numerico.css

Exemplo de uso
```
<html >
    <head>
        <title>Lista</title>
		<meta charset="utf-8">
        <script type="text/javascript" src="vue.js"></script>
        <script type="text/javascript" src="input-number.js"></script>
        <link rel="stylesheet" href="../css/inputNumerico.css">
    </head> 
    <body>
        <div id="app">
            <input-number titulo="Level:" v-on:valor="setaLevel" v-model="level" minimo="50" maximo="60" v-bind:desabilitar="false"></input-number>
        </div>
    </body>
    <script>
            const app = new Vue({
                el: '#app',
                data: { 
                    level: ''
                },
                watch:{
                    level:function(){
                        console.log(this.level)
                    }
                },
                methods:{
                    setaLevel(level){
                        this.level = level
                    }
                }
            })
    </script>
</html>
```
