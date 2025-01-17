# Use an official Nginx image as a base
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the HTML, CSS, and JS files into the container
COPY index.html .
COPY styles.css .
COPY scripts.js .

# Copy the images directory if needed
COPY pics/ pics/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]