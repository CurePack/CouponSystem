# ---- build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# build with system Maven (skip wrapper entirely)
RUN mvn -B -DskipTests package

# ---- run stage ----
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Render (and others) set PORT; Spring reads ${PORT:8080}
CMD ["java", "-jar", "app.jar"]