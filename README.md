# h

> root@176.112.204.146
> 3zM1KBEr

# Install Docker
https://docs.docker.com/install/linux/docker-ce/ubuntu/

# Install docker-compose
https://docs.docker.com/compose/install/#install-compose

# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "bushevuv@gmail.com"

# Copy SSH key
ssh-copy-id -i ~/.ssh/h.pub root@176.112.204.146

# Login SSH
ssh root@176.112.204.146 -i ~/.ssh/h

# Add host to .ssh/config
textedit ~/.ssh.config

# Prepare deployment
pm2 deploy production setup

# Deploy
pm2 deploy production update

# Install Node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pm2
sudo npm i -g pm2 