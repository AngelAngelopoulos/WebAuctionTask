# WebAuctionApp

## Requirements

- Python 3.8.5
- Node v14.15.4 
- npm 6.14.10
- yarn 1.22.10

## Installation 

```
git clone https://github.com/AngelAngelopoulos/WebAuctionApp.git
cd WebAuctionApp
```

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
cd web-auction-frontend
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

