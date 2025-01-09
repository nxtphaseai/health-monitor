# Use an image that has both Python and Node.js
FROM nikolaik/python-nodejs

# Set the working directory
WORKDIR /app

# Copy and install Python requirements
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy and install Node.js dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .
ENV NEXT_PUBLIC_API_URL=https://healthmonitor.icywater-62a3a3af.westeurope.azurecontainerapps.io:5001
# Build the Next.js application
# RUN npm run build

# Expose necessary ports
EXPOSE 5001 
EXPOSE 3000

# Start both the Flask and Next.js applications
CMD "npm" "run" "dev" & "python" "app.py"