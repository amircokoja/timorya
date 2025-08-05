# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Build image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

ARG BUILD=Release

# Copy csproj files and restore as distinct layers
COPY ["Timorya.sln", "./"]
COPY ["Timorya.Api/*.csproj", "Timorya.Api/"]
COPY ["Timorya.Domain/*.csproj", "Timorya.Domain/"]
COPY ["Timorya.Application/*.csproj", "Timorya.Application/"]
COPY ["Timorya.Infrastructure/*.csproj", "Timorya.Infrastructure/"]
RUN dotnet restore "Timorya.Api/Timorya.Api.csproj"

# Copy the rest of the files and build
COPY . .
RUN dotnet build "Timorya.Api/Timorya.Api.csproj" -c $BUILD -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD=Release
RUN dotnet publish "Timorya.Api/Timorya.Api.csproj" -c $BUILD -o /app/publish

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Install debugger in Debug mode
ARG BUILD=Release
RUN if [ "$BUILD" = "Debug" ]; then \
    apt-get update && apt-get install -y curl && \
    mkdir -p /root/vsdbg && \
    curl -sSL https://aka.ms/getvsdbgsh | bash /dev/stdin -v latest -l /root/vsdbg && \
    rm -rf /var/lib/apt/lists/*; \
    fi

ENTRYPOINT ["dotnet", "Timorya.Api.dll"]
