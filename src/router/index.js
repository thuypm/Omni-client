import VueRouter from "vue-router";
import routes from "./routes";

// configure router
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});
// router.beforeEach((to, from, next)=>{
//   switch(to.fullPath){
//   case '/signin':
//     {
//       if(localStorage.token != undefined)
//       next('/')
//     else 
//       next();
//       break;
//     };
//   case '/signup':
//       {
//         if(localStorage.token != undefined)
//        {   alert('vui lòng đăng xuất trước');
//           next('/')
//         }
//       else 
//         next();
//         break;
//       };
//       default: {
//         if(localStorage.token != undefined)
//         next()
//         else
//         next('/signin')
//         break;
//       }
//   }})
export default router;
