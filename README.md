# WebAuctionApp

## Requirements

- Python 3.8.5
- Node v14.15.4 
- npm 6.14.10
- yarn 1.22.10

## Installation 

```
git clone https://github.com/AngelAngelopoulos/WebAuctionTask 
cd WebAuctionTask
```

## Database

This App uses Postgresql as database engine, so, you shall be create a database with the following values:

- NAME: auction_db
- USER: postgres
- PASSWORD: admin
- HOST: localhost
- PORT: 5432

## Backend

```
cd auctionAPI
python3 -m venv venv
venv/bin/pip3 install -r requirements.txt
venv/bin/python3 manage.py runserver 
```

This start a webservice in localhost:8000

## Frontend

```
cd ..
cd web-auction-webapp
npm install
```

You can use

```
yarn dev
```
or 
```
npm dev
```
to start the node server.

This init a webapp in localhost:3000 and connects with the backend

## Get Started 

Then you should create a superuser with the command 

```
venv/bin/python3 manage.py createsuperuser
```
After this, you can enter in the Django admin panel. Here we are going to create another User and Items 

![Screen Shot 2021-05-10 at 7 25 32 PM](https://user-images.githubusercontent.com/42707643/117741395-00cde080-b1c8-11eb-9662-b2ec4aeef76a.png)


![Screen Shot 2021-05-10 at 7 25 45 PM](https://user-images.githubusercontent.com/42707643/117741406-07f4ee80-b1c8-11eb-9969-550c993f916e.png)


### NOTE: The image used will be named only with filename and extension, and will be placed in web-auction-webapp/public/images/


After this, we going to create a normal user

![Screen Shot 2021-05-10 at 8 07 12 PM](https://user-images.githubusercontent.com/42707643/117742900-5b1c7080-b1cb-11eb-8bbd-7de0c55e53f3.png)


Done, all is well with the app.

![Screen Shot 2021-05-10 at 8 09 45 PM](https://user-images.githubusercontent.com/42707643/117743060-ad5d9180-b1cb-11eb-8fc3-f7a38c6c0d18.png)

