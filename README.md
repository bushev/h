# h

### Endpoints

##### API

`http://<server_ip>:3000`

##### Streaming API

`ws://<server_ip>:8000/live/<eventId>.flv`

### Upgrade backend

1. Commit & push
2. `ssh root@<server_ip> -i ~/.ssh/<your_ssh_private_key>`
3. `cd h/backend`
4. `git pull && pm2 restart 0 && pm2 logs`

### Upgrade frontend

1. Commit & push
2. `ssh root@<server_ip> -i ~/.ssh/<your_ssh_private_key>`
3. `cd h/frontend`
4. `git pull && ng build`