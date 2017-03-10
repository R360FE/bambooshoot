#bambooshoot
##What's bambooshoot?

an application used by FE to generate mockdata of server's interface response. It's also can serve as a server to replace the response of serverside interface.

##How to use it?

### 1 use npm install bambootshoot.
      
      npm install bambootshoot
 
### 2 start the server and the default port is 3000 if you don't pass the option -p

      bamboo start

the browser will open the mock server site. eg:https://127.0.0.1:3000

### 3 current commands

You can use 'bamboo' to list the commands that current support

      bamboo
      
      Usage: bamboo <command>
      
      Commands:
      
         start    start mock server,you can pass option '-p' to set the server port
       
       Options:
         
         -v, --version  output the version number
         
         -p, --port  set the server port
