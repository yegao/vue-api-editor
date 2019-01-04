<template>
    <div id="api-editor-container">
        <input id="input" />
        <div class="editor-box" v-for="index of list" :key="index" contenteditable="true">
            {{index}}
        </div>
        <DiffContainer />
    </div>
</template>

<script>
    import DiffContainer from 'components/diff'
    export default {
        data() {
            return {
                list: ['a', 'b', 'c'],
                code:"",
                element:""
            }
        },
        beforeCreate() {
    
        },
        created() {
    
        },
        beforeMount(){

        },
        mounted(){

        },
        components: {
            DiffContainer
        },
        methods: {
            getPositionOfPointer(e){
                return {
                    x: e.clientX,
                    y: e.clientY
                }
            },
            createNextLine(){
                let element = "<span></span>"
            },
            blink(){
                // 光标闪烁
            }
        },
        computed: {
    
        },
        watch: {
    
        }
    }
</script>

<style lang="scss" scoped>
    .editor-box{
        border:1px solid #bbbbbb;
        padding:10px;
        margin-bottom:10px;
        border-radius:4px;
    }
    #input{
        background-color:#ff0000;
        width:20px;
        height:20px;
        resize:none;
        border:none;
        outline: none;
        background-color:rgba(0,0,0,0)
    }
</style>
