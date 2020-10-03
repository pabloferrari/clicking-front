<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
    </div>
</template>


<script>
import {mapGetters,mapState} from 'vuex'

export default {
    name:'ButtonEdit',
    props:{
        activePrompt: Boolean
    },
    data() {
        return {
            form: {}
        }
    },
   

    // mounted() {
    //     this.editRecord()
    // },

    methods: {
       
        editRecord(){
            this.params.edit(this.params.value)
            const data = this.params.data
            // this.getCountry(data.id)
            // console.log(data)
        }
           
    },

    computed:{
        // country() {
        //     this.editRecord()
        // },
        // ...mapState({
        //         country: state => state.country
        //     })
    }
}
</script>