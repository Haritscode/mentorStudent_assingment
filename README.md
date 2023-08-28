# mentorstudent_assingment

TO Run this code User doceker command sudo docker compose up and to create a production build change the file Dockerfile present in client and server dir.

# to run in dev:
    -   use command: "docker compose up"



# To run the code in production build, follow the steps below. 

In server dir:

Initial key-values --- > CMD ["npm","run","dev"]
Change it to ---> CMD ["npm","run","start"]

In client dir:

Note: After cloning the code run cmd npm i and the for production build run cmd npm run build

then

Initial key-values ---> CMD ["npm","run",dev"]
Change it to ---> CMD ["npm","run","preview"]

then in cmd run sudo docker compose up# mentorStudent_assingment
