
# Deploy Angular and Nodejs apps using docker-compose and expose them using Nginx and Certbot to configure HTTPS

This project contains a Step-by-step guide of the live workshop "How to deploy Angular and nodejs apps in an EC2 instance, expose microservices using Nginx and configure HTTPS using Certbot"




## 🚀 Step-by-step Deployment Guide

### 1. Build and push the Angular and Node js apps
In this section, you need to clone the project in your pc then access the project and just run the following commands

```bash
  # Login to docker registry
  docker login
  # Access the frontend repo
  cd frontend

  docker build -t user/frontend:1.0.0 .
  docker push user/frontend:1.0.0

  # Go back to the root directory
  cd ..
  
  # Access the backend repo
  cd frontend
  docker build -t user/backend:1.0.0 .
  docker push user/backend:1.0.0
```

### 2. Deploy the applications in an EC2 instance
2.1 You need to access the EC2 instance and install the following packages 

```bash
sudo su
apt update -y
apt upgrade -y
apt install -y python3-certbot-nginx docker.io
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

#you can use these commands to verify the version used
docker version
docker-compose version
nginx -version
certbot --version

# Deploy the backend and frontend apps
git clone https://github.com/opsforall/formation-node-angular-docker.git
cd formation-node-angular-docker
docker-compose up -d
```

2.2 Configure nginx and Certbot 

2.2.1 Configure DNS provider

In this workshop, we used Namescheap as domain name provider

You need to buy your own domain

2.2.2 Create records

We need to go the domain purchased and click on Advanced DNS. Then we need to create 2 records one for backend and one for the frontend microservices. Ensure to put the pulic IP of the EC2 instance in the value section of each records

2.2.3 Configure Nginx reverse proxy

2.2.3.1 For backend

You need to copy the following code inside /etc/nginx/sites-available/backend.domainpurchased
```bash
server {
    listen 80;
    server_name backend.domainpurchased;

    location / {
        proxy_pass http://publicip:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Run the following commands
```bash
ln -s /etc/nginx/sites-available/backend.domainpurchased /etc/nginx/sites-enabled/
# test and implement nginx Config
nginx -t
systemctl reload nginx
```

2.2.3.2 For frontend

You need to copy the following code inside /etc/nginx/sites-available/frontend.domainpurchased
```bash
server {
    listen 80;
    server_name frontend.domainpurchased;

    location / {
        proxy_pass http://publicip:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Run the following commands
```bash
ln -s /etc/nginx/sites-available/frontend.domainpurchased /etc/nginx/sites-enabled/
# test and implement nginx Config
nginx -t
systemctl reload nginx
```

2.2.4 Configure HTTPS using Certbot

```bash
certbot --nginx -d frontend.domainpurchased
certbot --nginx -d backend.domainpurchased

# renew certificates if necessary
certbot renew
```


