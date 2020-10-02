<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
    </div>
</template>


<script>
export default {
    name:'ButtonEdit',
    props: ['icon'],
    data() {
        return {
            icon: String
        }
    },

    methods: {
        editRecord(){
            console.log('editando')
        }
    }
}
</script>