# Installation

1. Create a directory for your certificates <br />
   `mkdir -p ./ssl-cert`

2. Generate a self-signed certificate and key <br />
   `openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout ./ssl-cert/key.pem -out ./ssl-cert/cert.pem`

3. `npm run dev`

4. Connect to the `same wifi` using a mobile phone
