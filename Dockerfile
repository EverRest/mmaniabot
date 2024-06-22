FROM node:18
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y \
    gnupg \
    wget \
    libnss3 \
    libfreetype6 \
    libfreetype6-dev \
    libharfbuzz-dev \
    ca-certificates \
    fonts-freefont-ttf \
    udev \
    nodejs \
    npm \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]