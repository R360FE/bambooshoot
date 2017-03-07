#bambooshoot
##What's bambooshoot?

an application used by FE to generate mockdata of server's interface response. It's also can serve as a server to replace the response of serverside interface.

##How to use it?

1) copy the source to your local path, then install the dependencies.

npm install

2) start the server on port 3000

   . node start
   . node ./bin/www

3) visit https://127.0.0.1:3000 to add/delete/update/search your interfaces that you want to replace the serverside response.

4) use Charles to mock the response.

   .Tools -> Map Remote -> add interfaces or import interfaces from an xml file


