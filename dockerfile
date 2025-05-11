FROM node:18

# Frissítés és Python+Pip telepítés
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv

# Munkakönyvtár
WORKDIR /app

# Csomagok átmásolása
COPY . .

# Python csomagok telepítése (engedélyezve system-packages törése)
RUN pip3 install --break-system-packages -r requirements.txt

# Node modulok
RUN npm install

# Kimeneti mappa
RUN mkdir -p output

# Start parancs
CMD ["npm", "start"]
