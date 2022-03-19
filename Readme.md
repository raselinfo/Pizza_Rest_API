# Pizza REST API Plan
![Pizza REST API Plan](https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80)
# `npm run dev` ==for run the server==
### TODO :
**[x] Register a user**
**[x] Login a user**
**[x] Who am I**
**[x] Refresh the token**
**[x] Logout the user**
**[x] Add new product**
**[x] Update a product**
**[x] Get all products**
**[x] Get single product**
**[x] Delete a product**
---
**Details** --
**Register a user**
    validate the request
   authorize the request
   check if user is in the database already
   prepare model
   store in database
   generate jwt token
   send response

**Login a user**
    validate the request
    authorize the request
    check if user is in the database already
    compare password
    generate jwt token and save the refresh token in the database
   send response
**Who am I (Authenticate User can see his details so make an middleware)**
*Auth middleware*
    Validate the Refresh token
    bind the user id with req object
*user api*
        find the user in the database using user id
        send the user details to the client
        
**Refresh the token**
    validate refresh token
    check if the token exists in the database
    verify the token and get the user id
    check if the user in the database
    generate the refresh and access token
    save the refresh token in the database
    send the access and refresh token as response

**Logout the user (Authentic user can logout so make an auth middleware where you send the access token in the header)**
    validate the refresh token
    verify the refresh token
    delete the refresh token from the database

**Add new product (only admin can add product)**
    validate the request data
    use multer to handle multipart form data
    save the image file in our server and store the file path to the database
    
**Update a product (only admin can update product)**
    validate the user data
    find the product and update the product property

**Get all products (all authorize user can get the products )**
    find the all product form the database

**Get single product (all authorize user can get the products )**
    take the product id and search that product in the database

**Delete a product (only admin can delete product)**
    take the product id and delete the product from the database as well delete from the file
