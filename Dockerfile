# ---- build stage (use JDK 17 to avoid javac API breakages) ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
# if you kept the wrapper, you can still use system Maven:
RUN mvn -B -DskipTests package

# ---- run stage (JRE 17 matches the build) ----
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]