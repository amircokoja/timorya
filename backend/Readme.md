# How to Build for Local Dev vs Production

### Local Development (Debug with debugger installed)
docker compose build --no-cache timorya-api --build-arg BUILD=Debug

docker build --build-arg BUILD=Debug -t timroya:dev .
docker run -p 5000:80 -p 5001:443 timroya:dev

### Production (Smaller, no debugger)
docker compose build --no-cache timorya-api --build-arg BUILD=Release

docker build --build-arg BUILD=Release -t timroya:prod .
docker run -p 80:80 -p 443:443 timroya:prod