# DevTinder APIs  it is only for  my reference notihing else 

## authRouter
POST /signup  
POST /login  
POST /logout  


## profileRouter
GET /profile/view  
PATCH /profile/edit  
PATCH /profile/password   // Forgot password API


## connectionRequestRouter
POST /request/send/interested/:userId  
POST /request/send/ignored/:userId  

for upper 2 i can create dynamic route that is => POST /request/send/:status/:touserId  
POST /request/review/:status/:requestId  


## userRouter
GET /user/requests/received
GET /user/requests/connections  
GET /user/feed - Gets you the profiles of other users on platform  


Status: ignore, interested, accepted, rejected