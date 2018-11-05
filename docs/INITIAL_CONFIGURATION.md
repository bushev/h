# Install Docker
https://docs.docker.com/install/linux/docker-ce/ubuntu/

# Install docker-compose
https://docs.docker.com/compose/install/#install-compose

# Install Node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pm2
sudo npm i -g pm2 

# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "bushevuv@gmail.com"

# Copy SSH key
ssh-copy-id -i ~/.ssh/h.pub root@<server_ip>