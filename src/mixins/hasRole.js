import checkPermission from '@/utils/permission'
export default  {
  data(){
    return{};
  },
  methods:{
    hasRole(roleName){
      return checkPermission(roleName)
    }
  }
}
