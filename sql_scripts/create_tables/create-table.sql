-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: wongso-db.cilapmewhv5h.ap-southeast-1.rds.amazonaws.com    Database: ptsafe
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` varchar(45) NOT NULL,
  `news_id` varchar(45) NOT NULL,
  `comment_title` varchar(255) NOT NULL,
  `comment_content` longtext NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `news_id_fk` (`news_id`),
  CONSTRAINT `news_id_fk` FOREIGN KEY (`news_id`) REFERENCES `news` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credential`
--

DROP TABLE IF EXISTS `credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credential` (
  `credential_id` varchar(45) NOT NULL,
  `credential_username` varchar(45) NOT NULL,
  `credential_password` varchar(45) NOT NULL,
  PRIMARY KEY (`credential_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `crowdedness`
--

DROP TABLE IF EXISTS `crowdedness`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crowdedness` (
  `crowdness_id` varchar(255) NOT NULL,
  `crowd_stop_id` int DEFAULT NULL,
  `crowd_route_id` varchar(45) DEFAULT NULL,
  `route_long_name` text,
  `trip_headsign` text,
  `departure_time` text,
  `direction_id` int DEFAULT NULL,
  `day` text,
  `carriage_number` int DEFAULT NULL,
  `crowdness_level` float DEFAULT NULL,
  `criminal_activity` text,
  PRIMARY KEY (`crowdness_id`),
  KEY `crowd_stop_id_idx` (`crowd_stop_id`),
  KEY `crowd_stop_id_idx1` (`crowd_route_id`),
  CONSTRAINT `crowd_route_id` FOREIGN KEY (`crowd_route_id`) REFERENCES `routes` (`route_id`),
  CONSTRAINT `crowd_stop_id` FOREIGN KEY (`crowd_stop_id`) REFERENCES `stops` (`stop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emergency_call`
--

DROP TABLE IF EXISTS `emergency_call`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergency_call` (
  `organization_id` varchar(45) NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `call_number` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `news_id` varchar(45) NOT NULL,
  `news_title` varchar(255) NOT NULL,
  `news_label` varchar(45) NOT NULL,
  `news_content` longtext NOT NULL,
  `image_url` longtext NOT NULL,
  `news_url` varchar(255) NOT NULL,
  `news_location` varchar(45) DEFAULT NULL,
  `news_postcode` int DEFAULT NULL,
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patronage`
--

DROP TABLE IF EXISTS `patronage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patronage` (
  `year` int NOT NULL,
  `stop_patronage_id` int NOT NULL,
  `stop_name` text,
  `stop_lat` double DEFAULT NULL,
  `stop_long` double DEFAULT NULL,
  `sax_annual` int DEFAULT NULL,
  `pax_weekday` int DEFAULT NULL,
  `pax_norm_weekday` int DEFAULT NULL,
  `pax_sch_hol_weekday` int DEFAULT NULL,
  `pax_Saturday` int DEFAULT NULL,
  `pax_Sunday` int DEFAULT NULL,
  `pax_pre_AM_peak` int DEFAULT NULL,
  `pax_AM_peak` int DEFAULT NULL,
  `pax_interpeak` int DEFAULT NULL,
  `pax_PM_peak` int DEFAULT NULL,
  `pax_PM_late` int DEFAULT NULL,
  `platform_count` int DEFAULT NULL,
  PRIMARY KEY (`year`,`stop_patronage_id`),
  KEY `stop_patronage_id_idx` (`stop_patronage_id`),
  CONSTRAINT `stop_patronage_id` FOREIGN KEY (`stop_patronage_id`) REFERENCES `stops` (`stop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `police`
--

DROP TABLE IF EXISTS `police`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `police` (
  `FEATURE_ID` int DEFAULT NULL,
  `VICNAMES_ID` int DEFAULT NULL,
  `OBJECTID` int DEFAULT NULL,
  `NAME_LABEL` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `police_stop`
--

DROP TABLE IF EXISTS `police_stop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `police_stop` (
  `stopid` int DEFAULT NULL,
  `stop_name` text,
  `police_id` bigint DEFAULT NULL,
  `police_stop_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`police_stop_id`),
  KEY `stop_id_idx` (`stopid`),
  CONSTRAINT `stopid` FOREIGN KEY (`stopid`) REFERENCES `stops` (`stop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=481 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `route_id` varchar(255) NOT NULL,
  `route_short_name` text,
  `route_long_name` text,
  PRIMARY KEY (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stop_times`
--

DROP TABLE IF EXISTS `stop_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stop_times` (
  `stop_times_id` int NOT NULL AUTO_INCREMENT,
  `trip_id` varchar(45) DEFAULT NULL,
  `arrival_time` varchar(255) DEFAULT NULL,
  `departure_time` varchar(255) DEFAULT NULL,
  `stop_id` int DEFAULT NULL,
  PRIMARY KEY (`stop_times_id`),
  UNIQUE KEY `stop_times_id` (`stop_times_id`),
  KEY `trip_id_idx` (`trip_id`),
  KEY `stop_id_idx` (`stop_id`),
  CONSTRAINT `stop_id` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`stop_id`),
  CONSTRAINT `trip_id` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`trip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=478879 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stops`
--

DROP TABLE IF EXISTS `stops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stops` (
  `stop_id` int NOT NULL,
  `stop_name` text,
  `stop_lat` double DEFAULT NULL,
  `stop_lon` double DEFAULT NULL,
  PRIMARY KEY (`stop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trip_wishlist`
--

DROP TABLE IF EXISTS `trip_wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_wishlist` (
  `wishlist_id` varchar(255) NOT NULL,
  `source_name` text,
  `destination_name` text,
  `stop_id` int DEFAULT NULL,
  `route_id` varchar(255) DEFAULT NULL,
  `departure_time` text,
  `carriage_number` int DEFAULT NULL,
  PRIMARY KEY (`wishlist_id`),
  KEY `stop_id` (`stop_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `trip_wishlist_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`stop_id`),
  CONSTRAINT `trip_wishlist_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `route_id` varchar(45) DEFAULT NULL,
  `trip_id` varchar(255) NOT NULL,
  `trip_headsign` varchar(255) DEFAULT NULL,
  `direction_id` int DEFAULT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `route_id_idx` (`route_id`),
  CONSTRAINT `route_id` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-30  1:53:01
