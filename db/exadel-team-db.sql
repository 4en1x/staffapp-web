-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema exadel-team-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema exadel-team-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `exadel-team-db` DEFAULT CHARACTER SET utf8 ;
USE `exadel-team-db` ;

-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: mysql5.gear.host    Database: exadelteamdb
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `primary_skill` varchar(45) NOT NULL,
  `skype` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `resume` varchar(45) DEFAULT NULL,
  `status` set('Pool','In progress','On hold','Rejected','Interview','Job offer','Job offer rejected','Job offer accepted','Hired') NOT NULL,
  `english_level` set('0','A1','A2','B1','B2','C1','C2') NOT NULL,
  `created_date` datetime NOT NULL,
  `last_change_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `linkedin` varchar(45) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `salary` varchar(45) DEFAULT NULL,
  `notification_date` datetime DEFAULT NULL,
  `primary_skill_year_start` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidates_users1_idx` (`user_id`),
  KEY `fk_candidates_cities1_idx` (`city_id`),
  CONSTRAINT `fk_candidates_cities1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_candidates_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,'Kostya','Stsefanovich','freeplayercot@gmail.com','js',NULL,'+375293552746',NULL,'Pool','0','2009-06-04 18:13:56','2009-06-04 18:13:56',1,NULL,1,'5000$',NULL,NULL),(2,'Nina','Balerina','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(3,'Lena','VEryBig','@exist.ru','python',NULL,NULL,NULL,'Hired','B1','2009-06-03 11:13:56','2009-06-03 11:13:56',2,NULL,NULL,'5000000$',NULL,NULL),(4,'Kostya','Stsefanovich','freeplayercot@gmail.com','js',NULL,'+375293552746',NULL,'Pool','0','2009-06-04 18:13:56','2009-06-04 18:13:56',1,NULL,1,'5000$',NULL,NULL),(5,'Sergey','Moiseenko','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(6,'Ivan','Ivanov','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(7,'Anton','Dosov','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(8,'Dmitry','Rusakov','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(9,'Zhenya','Basaranovich','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(10,'Ivan','Ivanov','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(11,'Ilya','Sidorov','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(12,'Alexey','Stsefanovich','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL),(13,'Name','Surname','Something','java',NULL,'+375293162746',NULL,'Hired','A1','2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,'5000000$',NULL,NULL);
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Minsk'),(2,'Pinsk');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_fields`
--

DROP TABLE IF EXISTS `feedback_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `type_skill` varchar(45) DEFAULT NULL,
  `feedback_id` int(11) NOT NULL,
  `type` set('tech','hr','owner') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_table1_feedback_tech1_idx` (`feedback_id`),
  CONSTRAINT `fk_table1_feedback_tech1` FOREIGN KEY (`feedback_id`) REFERENCES `feedbacks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_fields`
--

LOCK TABLES `feedback_fields` WRITE;
/*!40000 ALTER TABLE `feedback_fields` DISABLE KEYS */;
INSERT INTO `feedback_fields` VALUES (1,'js',NULL,NULL,'primary',1,'tech'),(2,'java',NULL,NULL,'secondary',1,'tech'),(3,'python',NULL,NULL,'secondary',1,'tech'),(4,'sql',NULL,NULL,'secondary',1,'tech'),(5,'java',NULL,NULL,'secondary',2,'tech'),(6,'python',NULL,NULL,'primary',2,'tech'),(7,'sql',NULL,NULL,'secondary',2,'tech'),(8,'salary',NULL,NULL,NULL,3,'hr'),(9,'ability to smth',NULL,NULL,NULL,3,'hr'),(10,'salary',NULL,NULL,NULL,4,'hr'),(11,'ability to smth',NULL,NULL,NULL,4,'hr'),(12,'another',NULL,NULL,NULL,4,'hr'),(13,'another another',NULL,NULL,NULL,4,'hr'),(14,'another another',NULL,NULL,NULL,5,'hr'),(15,'python',NULL,NULL,'secondary',6,'tech'),(16,'ascel',NULL,NULL,'secondary',8,'tech'),(17,'ruby',NULL,NULL,'secondary',8,'tech'),(18,'js',NULL,NULL,'primary',9,'tech'),(19,'java',NULL,NULL,'secondary',9,'tech'),(20,'python',NULL,NULL,'secondary',9,'tech'),(21,'sql',NULL,NULL,'secondary',9,'tech'),(22,'java',NULL,NULL,'secondary',10,'tech'),(23,'python',NULL,NULL,'primary',10,'tech'),(24,'sql',NULL,NULL,'secondary',10,'tech'),(25,'js',NULL,NULL,'primary',11,'tech'),(26,'java',NULL,NULL,'secondary',11,'tech'),(27,'python',NULL,NULL,'secondary',11,'tech'),(28,'sql',NULL,NULL,'other',11,'tech'),(29,'c',NULL,NULL,'primary',12,'tech'),(30,'c++',NULL,NULL,'secondary',12,'tech'),(31,'ruby',NULL,NULL,'secondary',12,'tech'),(32,'js',NULL,'sdfdsa','primary',13,'tech'),(33,'java',NULL,NULL,'secondary',13,'tech'),(34,'python',NULL,NULL,'secondary',13,'tech'),(35,'sql',NULL,NULL,'other',13,'tech'),(36,'js',NULL,NULL,'primary',14,'tech'),(37,'react',NULL,NULL,'secondary',14,'tech'),(38,'node',NULL,NULL,'secondary',14,'tech'),(39,'redux',NULL,NULL,'secondary',14,'tech'),(40,'js',NULL,NULL,'primary',15,'tech'),(41,'js',NULL,NULL,'primary',16,'tech'),(42,'js',NULL,NULL,'primary',17,'tech'),(43,'react',NULL,NULL,'secondary',17,'tech'),(44,'node',NULL,NULL,'secondary',17,'tech'),(45,'redux',NULL,NULL,'secondary',17,'tech'),(46,'java',NULL,NULL,'primary',17,'tech'),(47,'html',NULL,NULL,'secondary',17,'tech'),(48,'css3',NULL,NULL,'secondary',17,'tech'),(49,'flash',NULL,NULL,'secondary',17,'tech'),(50,'css3',NULL,NULL,'primary',18,'tech'),(51,'flash',NULL,NULL,'secondary',18,'tech'),(52,'css3','10','asdfsaf','primary',19,'tech'),(67,'css3',NULL,NULL,'primary',19,'tech'),(68,'js',NULL,NULL,'primary',20,'tech'),(69,'java',NULL,NULL,'secondary',20,'tech'),(70,'python',NULL,NULL,'secondary',20,'tech'),(71,'sql',NULL,NULL,'other',20,'tech'),(72,'c',NULL,NULL,'primary',21,'tech'),(73,'c++',NULL,NULL,'secondary',21,'tech'),(74,'ruby',NULL,NULL,'secondary',21,'tech'),(75,'js',NULL,NULL,'primary',22,'tech'),(76,'java',NULL,NULL,'secondary',22,'tech'),(77,'python',NULL,NULL,'secondary',22,'tech'),(78,'sql',NULL,NULL,'other',22,'tech'),(79,'js',NULL,NULL,'primary',23,'tech'),(80,'react',NULL,NULL,'secondary',23,'tech'),(81,'node',NULL,NULL,'secondary',23,'tech'),(82,'redux',NULL,NULL,'secondary',23,'tech'),(83,'js',NULL,NULL,'primary',24,'tech'),(84,'js',NULL,NULL,'primary',25,'tech'),(85,'js',NULL,NULL,'primary',26,'tech'),(86,'react',NULL,NULL,'secondary',26,'tech'),(87,'node',NULL,NULL,'secondary',26,'tech'),(88,'redux',NULL,NULL,'secondary',26,'tech'),(89,'java',NULL,NULL,'primary',26,'tech'),(90,'html',NULL,NULL,'secondary',26,'tech'),(91,'css3',NULL,NULL,'secondary',26,'tech'),(92,'flash',NULL,NULL,'secondary',26,'tech'),(93,'css3',NULL,NULL,'primary',27,'tech'),(94,'flash',NULL,NULL,'secondary',27,'tech'),(95,'css3','10','asdfsaf','primary',28,'tech'),(96,'css3',NULL,NULL,'primary',28,'tech');
/*!40000 ALTER TABLE `feedback_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `interview_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_feedback_tech_users1_idx` (`user_id`),
  KEY `fk_feedback_tech_interviews1_idx` (`interview_id`),
  KEY `fk_feedback_candidates1_idx` (`candidate_id`),
  CONSTRAINT `fk_feedback_candidates1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback_tech_interviews1` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_feedback_tech_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,2,1,1,'some comment',0),(2,3,1,1,'some comment 2',0),(3,4,1,1,'some comment 3',0),(4,2,2,1,'some comment 4',1),(5,3,2,1,'some comment 5',1),(6,4,2,1,'some comment 6',0),(7,5,3,2,'some comment 7',0),(8,1,3,2,'some comment 8',0),(9,9,4,1,'some comment',0),(10,9,5,1,'some comment',0),(11,10,6,5,NULL,1),(12,10,7,6,NULL,1),(13,10,8,7,NULL,1),(14,10,9,8,NULL,0),(15,10,10,9,NULL,0),(16,10,11,10,NULL,0),(17,10,12,11,NULL,0),(18,10,13,12,NULL,0),(19,10,14,13,NULL,1),(20,2,6,5,NULL,0),(21,2,7,6,NULL,0),(22,2,8,7,NULL,0),(23,2,9,8,NULL,0),(24,2,10,9,NULL,0),(25,2,11,10,NULL,0),(26,2,12,11,NULL,0),(27,2,13,12,NULL,0),(28,2,14,13,NULL,0);
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hirings`
--

DROP TABLE IF EXISTS `hirings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hirings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `vacancy_id` int(11) DEFAULT NULL,
  `candidate_id` int(11) NOT NULL,
  `date_open` datetime NOT NULL,
  `date_close` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hirings_users_idx` (`user_id`),
  KEY `fk_hirings_vacancy1_idx` (`vacancy_id`),
  KEY `fk_hirings_candidates1_idx` (`candidate_id`),
  CONSTRAINT `fk_hirings_candidates1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_hirings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_hirings_vacancy1` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hirings`
--

LOCK TABLES `hirings` WRITE;
/*!40000 ALTER TABLE `hirings` DISABLE KEYS */;
INSERT INTO `hirings` VALUES (1,1,NULL,1,'2009-06-03 11:13:56',NULL),(2,2,NULL,2,'2009-06-03 11:13:56',NULL),(3,1,NULL,4,'2009-06-03 11:13:56',NULL),(4,1,NULL,5,'2009-06-03 11:13:56',NULL),(5,1,NULL,6,'2009-06-03 11:13:56',NULL),(6,1,NULL,7,'2009-06-03 11:13:56',NULL),(7,1,NULL,8,'2009-06-03 11:13:56',NULL),(8,1,NULL,9,'2009-06-03 11:13:56',NULL),(9,1,NULL,10,'2009-06-03 11:13:56',NULL),(10,1,NULL,11,'2009-06-03 11:13:56',NULL),(11,1,NULL,12,'2009-06-03 11:13:56',NULL),(12,1,NULL,13,'2009-06-03 11:13:56',NULL);
/*!40000 ALTER TABLE `hirings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` set('Candidate','Vacancy','Hiring') NOT NULL,
  `foreign_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `logs` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews`
--

DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` set('TECH','HR','CLIENT') NOT NULL,
  `date` datetime DEFAULT NULL,
  `place` varchar(45) DEFAULT NULL,
  `hiring_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_interviews_hirings1_idx` (`hiring_id`),
  CONSTRAINT `fk_interviews_hirings1` FOREIGN KEY (`hiring_id`) REFERENCES `hirings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
INSERT INTO `interviews` VALUES (1,'HR','2009-06-03 11:13:56','exadel',1),(2,'TECH','2009-06-03 11:13:56','exadel 2',1),(3,'TECH','2009-06-03 11:13:56','exadel 3',2),(4,'TECH','2009-06-03 11:13:56','exadel 444444',2),(5,'TECH','2009-06-03 11:13:56','exadel 444444555555',2),(6,'TECH','2010-06-03 12:13:56','Exadel, ул.А. Купревича, 3',4),(7,'TECH','2011-06-03 12:13:56','Exadel, ул.А. Купревича, 3',5),(8,'TECH','2012-06-03 12:13:56','Exadel, ул.А. Купревича, 3',6),(9,'TECH','2013-06-03 12:13:56','Exadel, ул.А. Купревича, 3',7),(10,'TECH','2014-06-03 12:13:56','Exadel, ул.А. Купревича, 3',8),(11,'TECH','2015-06-03 12:13:56','Exadel, ул.А. Купревича, 3',9),(12,'TECH','2016-06-03 12:13:56','Exadel, ул.А. Купревича, 3',10),(13,'TECH','2017-06-03 12:13:56','Exadel, ул.А. Купревича, 3',11),(14,'TECH','2018-06-03 12:13:56','Exadel, ул.А. Купревича, 3',12),(16,'TECH','2019-06-03 12:13:56','Exadel, ул.А. Купревича, 3',4);
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews_has_skills`
--

DROP TABLE IF EXISTS `interviews_has_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interviews_has_skills` (
  `interview_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  PRIMARY KEY (`interview_id`,`skill_id`),
  KEY `fk_interviews_has_skills_skills1_idx` (`skill_id`),
  KEY `fk_interviews_has_skills_interviews1_idx` (`interview_id`),
  CONSTRAINT `fk_interviews_has_skills_interviews1` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_interviews_has_skills_skills1` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews_has_skills`
--

LOCK TABLES `interviews_has_skills` WRITE;
/*!40000 ALTER TABLE `interviews_has_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews_has_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews_has_users`
--

DROP TABLE IF EXISTS `interviews_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interviews_has_users` (
  `interviews_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`interviews_id`,`users_id`),
  KEY `fk_interviews_has_users_users1_idx` (`users_id`),
  KEY `fk_interviews_has_users_interviews1_idx` (`interviews_id`),
  CONSTRAINT `fk_interviews_has_users_interviews1` FOREIGN KEY (`interviews_id`) REFERENCES `interviews` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_interviews_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews_has_users`
--

LOCK TABLES `interviews_has_users` WRITE;
/*!40000 ALTER TABLE `interviews_has_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(45) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_links_candidates1_idx` (`candidate_id`),
  CONSTRAINT `fk_links_candidates1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (1,'i dont no',1),(2,'i dont no but i',1),(3,'i dont no but i?',1),(4,'i',2),(5,'dont',2),(6,'no',3),(7,'on',3),(8,'nono',3),(9,'onon',3);
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_messages_users1_idx` (`user_id`),
  CONSTRAINT `fk_messages_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `primary_expirience`
--

DROP TABLE IF EXISTS `primary_expirience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `primary_expirience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) NOT NULL,
  `skill` varchar(45) NOT NULL,
  `year_start` year(4) NOT NULL,
  `year_end` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_primary_expirience_candidates1_idx` (`candidate_id`),
  CONSTRAINT `fk_primary_expirience_candidates1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `primary_expirience`
--

LOCK TABLES `primary_expirience` WRITE;
/*!40000 ALTER TABLE `primary_expirience` DISABLE KEYS */;
/*!40000 ALTER TABLE `primary_expirience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('74SopcEAcEPX1O7-RMwrUheaY3lsjxn2',1501154423,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('G3OVTDjK6EJMhktpru3-fjBWMUk4kMXF',1501154650,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('GonkeenufdXdn-90sdzsrHczY0OfGkqF',1501115592,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('anNuFOLsIpTOXaXebwafG8LklAnmyZ8T',1501153012,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('mc5v3u6zfPgBADC0_eQfUndntDETCaIp',1501152525,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('osJhzmGW21QFEe-HIOcsYaOvBmxPlkUQ',1501070856,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('t8QpTMPEe5jzgdH_EdsSg6qyeUNAkqA_',1501154441,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'js'),(2,'java'),(3,'c'),(4,'c++'),(5,'python'),(6,'ruby'),(7,'pascal'),(8,'html'),(9,'css3'),(10,'smth');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills_has_candidates`
--

DROP TABLE IF EXISTS `skills_has_candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills_has_candidates` (
  `skill_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`skill_id`,`candidate_id`),
  KEY `fk_skills_has_candidates_candidates1_idx` (`candidate_id`),
  KEY `fk_skills_has_candidates_skills1_idx` (`skill_id`),
  CONSTRAINT `fk_skills_has_candidates_candidates1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_skills_has_candidates_skills1` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills_has_candidates`
--

LOCK TABLES `skills_has_candidates` WRITE;
/*!40000 ALTER TABLE `skills_has_candidates` DISABLE KEYS */;
INSERT INTO `skills_has_candidates` VALUES (2,1),(3,1),(7,1),(8,1),(10,1);
/*!40000 ALTER TABLE `skills_has_candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `role` set('admin','hr','user') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'freeplayercot@gmail.com','12345','Kostya','admin'),(2,'freeplayercot@gmail.com','541','nero','hr'),(3,'myemail','12345','Kostya','user'),(4,'freeplayercot@gmail.com','541','nero','hr'),(5,'freeplayercot@gmail.com','12345','Kostya','admin'),(6,'freeplayercot@gmail.com','541','nero','hr'),(7,'12345','12345','a','hr'),(8,'0','0','a','hr'),(9,'1','1','a','user'),(10,'example@gmail.com','12345','Anton','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancies`
--

DROP TABLE IF EXISTS `vacancies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `status` set('On hold','Active','CV provided','Waiting for interview with customer','Interview with customer','Candidate declined','Candidate approved','Closed','Cancelled') NOT NULL,
  `job_start` date DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `salary` varchar(45) DEFAULT NULL,
  `primary_skill` varchar(45) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`id`),
  KEY `fk_vacancy_cities1_idx` (`city_id`),
  CONSTRAINT `fk_vacancy_cities1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancies`
--

LOCK TABLES `vacancies` WRITE;
/*!40000 ALTER TABLE `vacancies` DISABLE KEYS */;
INSERT INTO `vacancies` VALUES (1,1,'job in exadel','On hold','2009-06-03','2009-06-03 11:13:56','5000$','js','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'),(2,1,'job in exadel 2','On hold','2009-06-03','2009-06-03 11:13:56','5000$','js','description 2'),(3,1,'job in exadel 3','On hold','2009-06-03','2009-06-03 11:13:56','5000$','js','description 3'),(4,1,'job in exadel 4','On hold','2009-06-03','2009-06-03 11:13:56','5000$','js','description 4'),(5,1,'job in exadel 5','On hold','2009-06-03','2009-06-03 11:13:56','5000$','js','description 5'),(6,1,'job in exadel 6','On hold','2009-06-03','2009-06-03 11:13:56','5000$','js','description 6'),(7,1,'Justify','Closed',NULL,'2017-07-24 12:31:49',NULL,NULL,'.................');
/*!40000 ALTER TABLE `vacancies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy_has_skills`
--

DROP TABLE IF EXISTS `vacancy_has_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy_has_skills` (
  `vacancy_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  PRIMARY KEY (`vacancy_id`,`skill_id`),
  KEY `fk_vacancy_has_skills_skills1_idx` (`skill_id`),
  KEY `fk_vacancy_has_skills_vacancy1_idx` (`vacancy_id`),
  CONSTRAINT `fk_vacancy_has_skills_skills1` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vacancy_has_skills_vacancy1` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_has_skills`
--

LOCK TABLES `vacancy_has_skills` WRITE;
/*!40000 ALTER TABLE `vacancy_has_skills` DISABLE KEYS */;
INSERT INTO `vacancy_has_skills` VALUES (1,1,2),(1,2,2),(1,4,2),(1,8,2),(2,4,2),(2,8,2),(3,3,2),(3,4,2),(3,7,2),(4,1,2),(4,4,2),(5,3,2),(5,9,2),(6,2,2),(6,6,2),(6,7,2),(6,8,2),(6,10,2),(7,1,56),(7,2,1),(7,5,435),(7,6,1);
/*!40000 ALTER TABLE `vacancy_has_skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-26 14:25:09
