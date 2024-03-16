FROM node:lts

# Install the latest Chrome dev package and necessary fonts and libraries
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] https://dl-ssl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r rio && useradd -rm -g rio -G audio,video rio

# Determine the path of the installed Google Chrome
RUN which google-chrome-stable || true

# Switch to the non-root user
USER rio

# Set the working directory
WORKDIR /home/rio

# Copy package.json and package-lock.json
COPY --chown=rio:rio package*.json ./

# Install dependencies
RUN npm install

# Install Puppeteer without downloading bundled Chromium
RUN npm install puppeteer --no-save

# Copy your Puppeteer script into the Docker image
COPY --chown=rio:rio . .

# Update the PUPPETEER_EXECUTABLE_PATH to the correct Chrome path (placeholder, update based on the output of `which google-chrome-stable`)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Expose port
EXPOSE 3113

# Set the command to run your Puppeteer script
CMD ["npm", "start"]
