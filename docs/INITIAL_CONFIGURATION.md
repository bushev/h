# Copy SSH key
ssh-copy-id -i ~/.ssh/h.pub root@<server_ip>

# Install utils
apt-get update && apt-get install htop

# Install Docker
https://docs.docker.com/install/linux/docker-ce/ubuntu/

# Install docker-compose
https://docs.docker.com/compose/install/#install-compose

# Install Node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pm2
sudo npm i -g pm2 

# GitHub key

1. Add your SSH key to GitHub
2. Start agent `eval $(ssh-agent -s)`
3. Add key to agent `ssh-add ~/.ssh/github`
4. Edit `nano ~/.ssh/config`
   Add the following:
    ```bash
       Host <server_ip>
         ForwardAgent yes
    ```

# Clone repository
git clone git@github.com:bushev/hackathon.git

# Run docker services
cd hackathon && docker-compose up -d && docker-compose logs --follow

# Run backend
 cd backend && npm i && pm2 start ecosystem.config.js

# Configure startup script
pm2 startup

# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "bushevuv@gmail.com"