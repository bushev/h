# h

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