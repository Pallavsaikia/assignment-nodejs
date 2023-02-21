-clone project
-git install
-install nodemon--- npm install nodemon
-npm start 

Incase not recieving mail(bc google can block smtp call from not secured server) use this credential

id:pallavsaikia57@gmail.com
password:123456



signup
http://127.0.0.1:3000/api/signup
post
[name: name,
email: email,
phone: phone,
gender: gender]


password reset
http://127.0.0.1:3000/api/passwordreset/{jwt}
get[link from email]
post[
    queryparam:req.params.jwt,
    password:password
]



login api
http://127.0.0.1:3000/api/login
post[
    email or phone:loginid,
    password:password
]


project api
http://127.0.0.1:3000/api/project
headers[Authorization:jwt]

get[
    name:name,
    status:status,
    sort(createdAt):sort ['asc','dsc'],
    page number:page
]

post [
    name:name
    status:status
    description:description
]


task api
http://127.0.0.1:3000/api/task
headers[Authorization:jwt]

get[
    name:name,
    status:status,
    priority:priority,
    projectid:projectid
    sort(createdAt):sort ['asc','dsc'],
    page number:page
]

post [
    name: name,
    description: description,
    project id to add to: project,
    priority: priority,
    status: status
]