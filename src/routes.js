import Vue from "vue"
import Router from "vue-router"

//splash-screen
import introComponent from "@/components/generics/intro"
import outroComponent from "@/components/generics/outro"

import walletComponent from "@/components/wallet"
import tokenizeComponent from "@/components/tokenize"
import marketplaceComponent from "@/components/marketplace"


//sign-up&in
import signinComponent from "@/components/auth/signin"
import signupComponent from "@/components/auth/signup"
import restoreComponent from "@/components/auth/restore"

//security question & answer
import questionComponent from "@/components/question"
import answerComponent from "@/components/answer"
import confirmQuestionAnswerComponent from "@/components/confirmqa"

//dashboard
import dashboardComponent from "@/components/dashboard/routes.vue"

Vue.use(Router)
const router =  new Router({
    mode: "hash",
    routes: [
        { path: '*', component: introComponent },
        { path: '/wallet', name:"wallet", component: walletComponent },
        { path: '/tokenize', name:"tokenize", component: tokenizeComponent },
        { path: '/marketplace', name:"marketplace", component: marketplaceComponent },
        

        { path: '/logout', component: outroComponent },
        { path: '/signup', name: 'signup', component: signupComponent },
        { path: '/signin', name: 'signin', component: signinComponent },
        { path: '/restore', name: 'restore', component: restoreComponent },

        { path: '/question', name: 'question', component: questionComponent },
        { path: '/answer', name: 'answer', component: answerComponent },
        { path: '/confirmqa', name: 'confirmqa', component: confirmQuestionAnswerComponent },

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