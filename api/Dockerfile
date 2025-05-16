# Use an official Maven image to build the Spring Boot application
FROM maven:3.9.9-eclipse-temurin-21 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use an official OpenJDK image to run the Spring Boot application
FROM eclipse-temurin:21-jdk

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar .

# Expose the application port 9000
EXPOSE 9000

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "/app/api-0.0.1-SNAPSHOT.jar"]