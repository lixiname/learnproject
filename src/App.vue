<template >
  <router-view ></router-view>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      bookArray:[
        {
          bookName:'one',
          downloadAmount:120,
          ISBN:'123'
        },
        {
          bookName:'two',
          downloadAmount:140,
          ISBN:'1234'
        },
        {
          bookName:'three',
          downloadAmount:100,
          ISBN:'1235'
        }
      ],
    }
  },
  methods:{
    hello:function (){

    },

  },
  created:function (){
    console.log({start:"begin"});
  }


}
</script>

<style>


</style>
