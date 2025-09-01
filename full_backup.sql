-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: frost
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `assetId` int NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`assetId`),
  KEY `assets_ibfk_1` (`productId`),
  CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `position` enum('Manager','Certified Forklifter','Warehouseman') DEFAULT NULL,
  `salary` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'ahmet kılıçarslan','Certified Forklifter',3101.00),(2,'kerem','Warehouseman',210.00),(3,'Baha alagöz','Warehouseman',11.00),(4,'ense','Certified Forklifter',222.00),(5,'ali ak','Warehouseman',111.00),(6,'yasir','Certified Forklifter',3169.00);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `supplier` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplierID_idx` (`supplier`),
  CONSTRAINT `supplierID` FOREIGN KEY (`supplier`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'laptop',9,100.00,1),(2,'camera',7,99.00,1),(3,'keyboard',111,23.00,1),(4,'mouse',195,90.00,2),(5,'dishwasher',0,0.00,2),(10,'tv',90,310.00,4),(11,'laundry',12,100.00,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalAmount` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `purchase_ibfk_1` (`userId`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,5,498,'2025-08-14 10:31:43'),(2,5,300,'2025-08-14 10:32:18'),(3,5,298,'2025-08-15 07:55:30'),(4,5,100,'2025-08-15 12:44:05'),(5,5,690,'2025-08-18 07:47:58'),(6,5,672,'2025-08-20 06:52:57'),(7,5,222,'2025-08-20 06:55:38'),(8,5,100,'2025-08-20 07:29:26'),(9,5,198,'2025-08-20 07:31:32'),(10,5,99,'2025-08-20 07:33:11'),(11,4,198,'2025-08-20 07:57:28'),(12,7,3183,'2025-08-21 06:07:23'),(13,7,199,'2025-08-21 07:43:00'),(14,7,99,'2025-08-21 07:43:29'),(15,7,99,'2025-08-21 07:49:38'),(16,7,92,'2025-08-21 07:54:12'),(17,7,92,'2025-08-21 07:55:28'),(18,7,69,'2025-08-21 08:14:34'),(19,7,198,'2025-08-21 12:34:42'),(20,7,1035,'2025-08-27 15:28:32'),(21,7,450,'2025-08-27 15:28:42');
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchasedProduct`
--

DROP TABLE IF EXISTS `purchasedProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchasedProduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchaseId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `purchaseId` (`purchaseId`),
  KEY `productId` (`productId`),
  CONSTRAINT `purchasedProduct_ibfk_1` FOREIGN KEY (`purchaseId`) REFERENCES `purchase` (`id`),
  CONSTRAINT `purchasedProduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchasedProduct`
--

LOCK TABLES `purchasedProduct` WRITE;
/*!40000 ALTER TABLE `purchasedProduct` DISABLE KEYS */;
INSERT INTO `purchasedProduct` VALUES (1,1,1,3,100.00),(2,1,2,2,99.00),(3,2,1,3,100.00),(4,3,1,1,100.00),(5,3,2,2,99.00),(6,4,1,1,100.00),(7,5,1,1,100.00),(8,5,2,3,99.00),(9,5,4,3,90.00),(10,5,3,1,23.00),(11,6,1,1,100.00),(12,6,2,1,99.00),(13,6,3,1,23.00),(14,6,4,5,90.00),(15,7,1,1,100.00),(16,7,2,1,99.00),(17,7,3,1,23.00),(18,8,1,1,100.00),(19,9,2,2,99.00),(20,10,2,1,99.00),(21,11,2,2,99.00),(22,12,4,24,90.00),(23,12,3,1,23.00),(24,12,1,10,100.00),(25,13,1,1,100.00),(26,13,2,1,99.00),(27,14,2,1,99.00),(28,15,2,1,99.00),(29,16,3,4,23.00),(30,17,3,4,23.00),(31,18,3,3,23.00),(32,19,2,2,99.00),(33,20,1,6,100.00),(34,20,2,3,99.00),(35,20,3,6,23.00),(36,21,4,5,90.00);
/*!40000 ALTER TABLE `purchasedProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Asus','123456789'),(2,'beko','444444444'),(3,'logitech','111111111111111'),(4,'vestel','1234567'),(5,'Baş','999999999');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ahmet','$2b$10$Q1gUCXRvFmUUzjZmMiGUYeiZ9hccjShnjowAwImanDqlYcCqFBLiu','admin','ahmet@gmail.com'),(3,'enes','$2b$10$UN7RIVNZvXr/319LZUZXhepPs.AVpT6kAkFQslncuekLTap3jZO2u','user','enes1111@gmail.com'),(4,'bahaa',NULL,'user','baha@mail.com'),(5,'hakan',NULL,'user','hakan@mail.com'),(6,'enses','$2b$10$wc00lvqKlS07/JrYiVMzh.pmqWlrf3KgLJMbEFK3Imjh7wh7YZhBe','user','ense@gmail.com'),(7,'baş','$2b$10$1Yxm9HV3ad5fBTEFq/U4Gerp/paH59PtmYMZRzW77MMz3M/wqzlDa','user','kerem@mail.com'),(8,'yusuf','$2b$10$b3Ux5bMGM9yDiA98KkruoeZOyLdx.azRHI2Fr1w7WxSrK6IFiXqNC','user','yusuf@mail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'frost'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 14:12:03
