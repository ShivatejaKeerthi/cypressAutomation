FROM cypress/included:14.2.1  

WORKDIR /app  

COPY package.json package-lock.json ./  
RUN npm ci  # Ensure dependencies are installed  

COPY . .  

# Install Cypress Binary  
RUN npx cypress install  

CMD ["sh", "-c", "npx cypress run && node send-email.js"]
