import Vue from "vue"
import Router from "vue-router"

//splash-screen
import introComponent from "@/components/generics/intro"
import outroComponent from "@/components/generics/outro"
import onboardingComponent from "@/components/generics/onboarding"

//sign-up&in
import signinComponent from "@/components/auth/signin"
import signupComponent from "@/components/auth/signup"
import restoreComponent from "@/components/auth/restore"

//dashboard
import dashboardComponent from "@/components/dashboard/routes.vue"

Vue.use(Router)
const router =  new Router({
    mode: "hash",
    routes: [
        { path: '*', component: introComponent },
        { path: '/onboarding', component: onboardingComponent },
        { path: '/logout', component: outroComponent },
        { path: '/signup', name: 'signup', component: signupComponent },
        { path: '/signin', name: 'signin', component: signinComponent },
        { path: '/restore', name: 'restore', component: restoreComponent },
        { 
            path: '/dashboard', component: dashboardComponent, 
            children: dashboardComponent.children 
        },
    ]
  })


// router.beforeResolve((to, from, next) => {
//  checkPermissions();
//  if (to.path == "/logout") {
//     console.log("make an api call to logout")
//  }
//  next();
//   setTimeout(function () {
//     next();
//  }, 150);
// })

export {router}