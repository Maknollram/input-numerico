Vue.component('input-numerico',{
    template: `
        <div>
            <div>
                <label>{{titulo}}</label>
            </div>
            <div class="flex">
                <div>
                    <input class="inputNumerico" type="text" v-model="valor" maxlength="maxlength" min="min" max="max" 
                        v-on:input="limitador"
                        onkeydown="return ( event.ctrlKey || event.altKey 
                            || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) 
                            || (95<event.keyCode && event.keyCode<106)
                            || (event.keyCode==8) 
                            || (event.keyCode==9) 
                            || (event.keyCode>34 && event.keyCode<40)
                            || (event.altKey && event.keyCode==49) 
                            || (event.keyCode==46) )"
                            v-bind:disabled="desabilitado">
                </div>
                <div class="flex coluna center spinnerGroup">
                    <div>
                        <i class="botao seta paraCima" v-bind:disabled="valor >=maximo" v-on:click="click('incrementar', $event)" v-on:mousedown="comecarContagem('incrementar', $event)" v-on:mouseout="pararContagem('incrementar', $event)" type="button"></i>
                    </div>
                    <div>
                        <i class="botao seta paraBaixo" v-bind:disabled="valor <=minimo" v-on:click="click('decrementar', $event)" v-on:mousedown="comecarContagem('decrementar', $event)" v-on:mouseout="pararContagem('decrementar', $event)" type="button"></i>
                    </div>
                </div>
            </div>
        </div>
    `,
    props:[
        'titulo',
        'value',
        'maximo',
        'minimo',
        'desabilitar'
    ],
    data(){
        return {
            valor: this.value,
            pressInterval: null,
            pressTimer: null
        }
    },
    watch:{
        valor: function(){
            if(Number(this.valor) > Number(this.maximo)){
                this.valor = this.maximo
            }
            if(Number(this.valor) < Number(this.minimo)){
                this.valor = this.minimo
            }
        }
    },
    computed:{
        desabilitado: function(){
            if(this.desabilitar == true){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        limitador(){
            if (this.valor > this.maximo){
                this.valor = this.valor.slice(0,3)
            }
        },
        click(tipo, e) {
            if (!this.pressInterval) {
                if(tipo == 'incrementar'){
                    this.valor++
                }else{
                    this.valor--    
                }
            }
            this.pararContagem()
            this.$emit('valor', this.valor)
        },
        comecarContagem(tipo, e){
            if (e.button !== 0) {
                return
            }
            if (this.pressTimer === null) {
                if(tipo == 'incrementar'){
                    this.pressTimer = setTimeout(() => {
                        this.pressInterval = setInterval(() => {
                            if(this.valor < this.maximo){
                                this.valor++
                            }
                        }, 100)
                        if(this.valor < this.maximo){
                            this.valor++
                        }
                    }, 400)
                }else{
                    this.pressTimer = setTimeout(() => {
                        this.pressInterval = setInterval(() => {
                            if(this.valor > this.minimo){
                                this.valor--
                            }
                        }, 100)
                        if(this.valor > this.minimo){
                            this.valor--
                        }
                    }, 400)
                }
            }
        },
        pararContagem(){
            if (this.pressTimer !== null) {
                clearTimeout(this.pressTimer)
                this.pressTimer = null
            }
            if (this.pressInterval) {
                clearInterval(this.pressInterval)
                this.pressInterval = null
            }
        }
    }
})
