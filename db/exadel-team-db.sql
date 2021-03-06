-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: mysql5.gear.host    Database: exadelteamdb2
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
-- Table structure for table `candidate_statuses`
--

DROP TABLE IF EXISTS `candidate_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_statuses`
--

LOCK TABLES `candidate_statuses` WRITE;
/*!40000 ALTER TABLE `candidate_statuses` DISABLE KEYS */;
INSERT INTO `candidate_statuses` VALUES (1,'Pool'),(2,'In progress'),(3,'On hold'),(4,'Rejected'),(5,'Interview'),(6,'Job offer'),(7,'Job offer rejected'),(8,'Job offer accepted'),(9,'Hired');
/*!40000 ALTER TABLE `candidate_statuses` ENABLE KEYS */;
UNLOCK TABLES;

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
  `primary_skill` int(11) NOT NULL,
  `skype` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `resume` varchar(45) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `english_level_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `last_change_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `linkedin` varchar(45) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `notification_date` datetime DEFAULT NULL,
  `primary_skill_year_start` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidates_users1_idx` (`user_id`),
  KEY `fk_candidates_cities1_idx` (`city_id`),
  KEY `fk_candidates_skills1_idx` (`primary_skill`),
  KEY `fk_candidates_english_levels1_idx` (`english_level_id`),
  KEY `fk_candidates_candidate_statuses1_idx` (`status_id`),
  CONSTRAINT `fk_candidates_candidate_statuses1` FOREIGN KEY (`status_id`) REFERENCES `candidate_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidates_cities1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_candidates_english_levels1` FOREIGN KEY (`english_level_id`) REFERENCES `english_levels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidates_skills1` FOREIGN KEY (`primary_skill`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidates_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,'Kostya','Stsefanovich','freeplayercot@gmail.com',1,NULL,'+375293552746',NULL,1,1,'2009-06-04 18:13:56','2009-06-04 18:13:56',1,NULL,1,5000,NULL,NULL),(2,'Nina','Balerina','Something',1,NULL,'+375293162746',NULL,2,2,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,5000000,NULL,NULL),(3,'Lena','VEryBig','@exist.ru',2,NULL,NULL,NULL,3,3,'2009-06-03 11:13:56','2009-06-03 11:13:56',2,NULL,NULL,5000000,NULL,NULL),(4,'Kostya','Stsefanovich','freeplayercot@gmail.com',3,NULL,'+375293552746',NULL,4,4,'2009-06-04 18:13:56','2009-06-04 18:13:56',1,NULL,5,5000,NULL,NULL),(5,'Sergey','Moiseenko','Something',4,NULL,'+375293162746',NULL,5,5,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,9,5000000,NULL,NULL),(6,'Ivan','Ivanov','Something',4,NULL,'+375293162746',NULL,6,6,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,5000000,NULL,NULL),(7,'Anton','Dosov','Something',3,NULL,'+375293162746',NULL,7,7,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,7,5000000,NULL,NULL),(8,'Dmitry','Rusakov','Something',3,NULL,'+375293162746',NULL,8,1,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,7,5000000,NULL,NULL),(9,'Zhenya','Basaranovich','Something',7,NULL,'+375293162746',NULL,9,2,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,6,5000000,NULL,NULL),(10,'Ivan','Ivanov','Something',7,NULL,'+375293162746',NULL,1,3,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,2,5000000,NULL,NULL),(11,'Ilya','Sidorov','Something',10,NULL,'+375293162746',NULL,2,4,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,5,5000000,NULL,NULL),(12,'Alexey','Stsefanovich','Something',11,NULL,'+375293162746',NULL,3,5,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,3,5000000,NULL,NULL),(13,'Name','Surname','Something',11,NULL,'+375293162746',NULL,4,6,'2009-06-03 18:13:56','2009-06-03 18:13:56',2,NULL,3,5000000,NULL,NULL),(16,'myfavorite','unic','grixl',1,NULL,NULL,NULL,1,1,'2017-07-28 05:03:42','2017-07-28 06:43:16',1,NULL,1,NULL,NULL,NULL),(17,'myfavorite','unic','grixl',1,NULL,NULL,NULL,1,1,'2017-07-28 06:44:13','2017-07-28 06:44:13',1,NULL,1,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Minsk'),(2,'Mogilev'),(3,'Brest'),(4,'New-York'),(5,'Vitebsk'),(6,'Pinsk');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `english_levels`
--

DROP TABLE IF EXISTS `english_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `english_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `english_levels`
--

LOCK TABLES `english_levels` WRITE;
/*!40000 ALTER TABLE `english_levels` DISABLE KEYS */;
INSERT INTO `english_levels` VALUES (1,'0'),(2,'A1'),(3,'A2'),(4,'B1'),(5,'B2'),(6,'C1'),(7,'C2');
/*!40000 ALTER TABLE `english_levels` ENABLE KEYS */;
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
  `value` int(11) DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `type_skill` varchar(45) DEFAULT NULL,
  `feedback_id` int(11) NOT NULL,
  `type` set('tech','hr','owner') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feedback_fields_feedbacks1_idx` (`feedback_id`),
  CONSTRAINT `fk_feedback_fields_feedbacks1` FOREIGN KEY (`feedback_id`) REFERENCES `feedbacks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `candidate_id` int(11) NOT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `interview_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feedbacks_candidates1_idx` (`candidate_id`),
  KEY `fk_feedbacks_users1_idx` (`user_id`),
  KEY `fk_feedbacks_interviews1_idx` (`interview_id`),
  CONSTRAINT `fk_feedbacks_candidates1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedbacks_interviews1` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedbacks_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,2,1,'some comment',0,1),(2,3,1,'some comment 2',0,1),(3,4,1,'some comment 3',0,1),(4,2,1,'some comment 4',1,2),(5,3,1,'some comment 5',1,2),(6,4,1,'some comment 6',0,2),(7,5,2,'some comment 7',0,3),(8,1,2,'some comment 8',0,3),(9,9,1,'some comment',0,4),(10,9,1,'some comment',0,5),(11,10,5,NULL,1,6),(12,10,6,NULL,1,7),(13,10,7,NULL,0,8),(14,10,8,NULL,0,9),(15,10,9,NULL,0,10),(16,10,10,NULL,0,11),(17,10,11,NULL,0,12),(18,10,12,NULL,0,13),(19,10,13,NULL,1,14),(20,2,5,NULL,0,6),(21,2,6,NULL,0,7),(22,2,7,NULL,0,8),(23,2,8,NULL,0,9),(24,2,9,NULL,0,10),(25,2,10,NULL,0,11),(26,2,11,NULL,0,12),(27,2,12,NULL,0,13),(28,2,13,NULL,0,14);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
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
  `role` varchar(45) DEFAULT NULL,
  `event` varchar(45) DEFAULT NULL,
  `foreign_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `logs` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (12,'candidates','create',16,2,'2017-07-28 05:03:43','Some changes in table candidates: create some data.'),(13,'candidates','update',16,1,'2017-07-28 05:46:45','Some changes in table candidates: update some data.Insert data: {\"name\":\"myfavorite\",\"surname\":\"unic\",\"email\":\"grixl\",\"primarySkill\":1,\"lastChangeDate\":\"2017-07-28 05:46:44\",\"userId\":1,\"cityId\":1,\"englishLevelId\":1,\"statusId\":1} '),(19,'vacancies','update',1,1,'2017-07-28 06:33:08','Some changes in table vacancies: update some data.Insert data: {\"name\":\"job in exadel\",\"salary\":\"5000$\",\"primarySkill\":1,\"description\":\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\",\"city_id\":1,\"statusId\":1} '),(20,'vacancies','create',10,1,'2017-07-28 06:39:23','Some changes in table vacancies: create some data.'),(21,'vacancies','update',1,1,'2017-07-28 06:39:56','Some changes in table vacancies: update some data.Insert data: {\"name\":\"job in exadel\",\"salary\":\"5000$\",\"primarySkill\":1,\"description\":\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\",\"city_id\":1,\"statusId\":1} '),(22,'candidates','update',16,1,'2017-07-28 06:43:17','Some changes in table candidates: update some data.Insert data: {\"name\":\"myfavorite\",\"surname\":\"unic\",\"email\":\"grixl\",\"primarySkill\":1,\"lastChangeDate\":\"2017-07-28 06:43:16\",\"cityId\":1,\"englishLevelId\":1,\"statusId\":1} '),(23,'candidates','create',17,1,'2017-07-28 06:44:14','Some changes in table candidates: create some data.'),(24,'candidates','create',18,2,'2017-07-28 09:39:37','Some changes in table candidates: create some data.'),(25,'candidates','update',18,2,'2017-07-28 09:41:13','Some changes in table candidates: update some data.Insert data: {\"name\":\"myfavorite\",\"surname\":\"unic\",\"email\":\"grixl\",\"primarySkill\":1,\"lastChangeDate\":\"2017-07-28 09:41:12\",\"cityId\":1,\"englishLevelId\":1,\"statusId\":1} '),(26,'candidates','delete',18,1,'2017-07-28 09:44:18','Some changes in table candidates: delete some data.'),(27,'vacancies','delete',2,1,'2017-07-28 09:47:29','Some changes in table vacancies: delete some data.'),(28,'vacancies','create',11,1,'2017-07-28 09:48:49','Some changes in table vacancies: create some data.'),(29,'vacancies','update',11,1,'2017-07-28 09:49:52','Some changes in table vacancies: update some data.Insert data: {\"name\":\"job in exadel\",\"salary\":\"5000$\",\"primarySkill\":1,\"description\":\"But I must r avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\",\"city_id\":6,\"statusId\":1} '),(30,'hirings','create',13,1,'2017-07-28 10:11:04','Some changes in table hirings: create some data.'),(31,'hirings','delete',13,1,'2017-07-28 10:12:04','Some changes in table hirings: delete some data.');
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
INSERT INTO `interviews` VALUES (1,'HR','2009-06-03 11:13:56','exadel',1),(2,'TECH','2009-06-03 11:13:56','exadel 2',1),(3,'TECH','2009-06-03 11:13:56','exadel 3',2),(4,'TECH','2009-06-03 11:13:56','exadel 444444',2),(5,'TECH','2009-06-03 11:13:56','exadel 444444555555',2),(6,'TECH','2010-06-03 12:13:56','Exadel, ��.�. ���������, 3',4),(7,'TECH','2011-06-03 12:13:56','Exadel, ��.�. ���������, 3',5),(8,'TECH','2012-06-03 12:13:56','Exadel, ��.�. ���������, 3',6),(9,'TECH','2013-06-03 12:13:56','Exadel, ��.�. ���������, 3',7),(10,'TECH','2014-06-03 12:13:56','Exadel, ��.�. ���������, 3',8),(11,'TECH','2015-06-03 12:13:56','Exadel, ��.�. ���������, 3',9),(12,'TECH','2016-06-03 12:13:56','Exadel, ��.�. ���������, 3',10),(13,'TECH','2017-06-03 12:13:56','Exadel, ��.�. ���������, 3',11),(14,'TECH','2018-06-03 12:13:56','Exadel, ��.�. ���������, 3',12),(16,'TECH','2019-06-03 12:13:56','Exadel, ��.�. ���������, 3',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (1,'i dont no',1),(2,'i dont no but i',1),(3,'i dont no but i?',1),(4,'i',2),(5,'dont',2),(6,'no',3),(7,'on',3),(8,'nono',3),(9,'onon',3),(16,'1234',16),(17,'myl555nk',16),(18,'someting',16),(19,'1234',17),(20,'myl555nk',17),(21,'someting',17);
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
  `interview_id` int(11) NOT NULL,
    `status` int(11) NOT NULL DEFAULT 0,
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
INSERT INTO `sessions` VALUES ('JV2OcT7VzsHFPw4EYID2acHGc6b_FLc7',1501321885,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('nrYAsSglUztRRyjsITozWqB4HquAKPdb',1501321932,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('o7KUb6sfcmEDzaO0CvAdn1wVaPVdJlu3',1501320688,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}');
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
  `type` set('primary','secondary','other','hr') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'.NET','primary'),(2,'Android','primary'),(3,'BI','primary'),(4,'C++','primary'),(5,'DBE','primary'),(6,'Data Science','primary'),(7,'DWH','primary'),(8,'ETL','primary'),(9,'iOS','primary'),(10,'Java','primary'),(11,'JavaScript','primary'),(12,'PHP','primary'),(13,'Python','primary'),(14,'Ruby on Rails','primary'),(15,'QA','primary'),(16,'BA','primary'),(17,'DevOps','primary'),(18,'SysAdmin','primary'),(19,'HRM','primary'),(20,'Angular','secondary'),(21,'ReactJS','secondary'),(22,'NodeJS','secondary'),(23,'MongoDB','secondary'),(24,'Hadoop','secondary'),(25,'PosgreSQL','secondary'),(26,'Linux','secondary'),(27,'Spring','secondary'),(28,'Django','secondary'),(29,'Bootstrap','secondary'),(30,'Scrum','secondary'),(31,'Programming basics','other'),(32,'Networking','other'),(33,'Database','other'),(34,'Design Patterns','other'),(35,'Testing','other'),(36,'Design and Architecture','other'),(37,'������� ����� ������','hr'),(38,'���������� ���������� � ������','hr'),(39,'���������� � �������������','hr'),(40,'��������� (��� ���������)','hr'),(41,'������� ����������� �����','hr'),(42,'�������� �� ���������� �����','hr'),(43,'������ (���� ��� �����������)','hr');
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
  `status_id` int(11) NOT NULL,
  `job_start` date DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `salary` int(11) DEFAULT NULL,
  `primary_skill` int(11) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`),
  KEY `fk_vacancy_cities1_idx` (`city_id`),
  KEY `fk_vacancies_vacancy_statuses1_idx` (`status_id`),
  KEY `fk_vacancies_skills1_idx` (`primary_skill`),
  CONSTRAINT `fk_vacancies_skills1` FOREIGN KEY (`primary_skill`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancies_vacancy_statuses1` FOREIGN KEY (`status_id`) REFERENCES `vacancy_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancies_vacancy_statuses2` FOREIGN KEY (`status_id`) REFERENCES `vacancy_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_cities1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancies`
--

LOCK TABLES `vacancies` WRITE;
/*!40000 ALTER TABLE `vacancies` DISABLE KEYS */;
INSERT INTO `vacancies` VALUES (1,1,'job in exadel',1,'2009-06-03','2009-06-03 11:13:56',5000,1,'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'),(3,1,'job in exadel 3',3,'2009-06-03','2009-06-03 11:13:56',5000,2,'description 3'),(4,1,'job in exadel 4',4,'2009-06-03','2009-06-03 11:13:56',5000,4,'description 4'),(5,1,'job in exadel 5',5,'2009-06-03','2009-06-03 11:13:56',5000,5,'description 5'),(6,1,'job in exadel 6',6,'2009-06-03','2009-06-03 11:13:56',5000,1,'description 6'),(7,1,'Justify',7,NULL,'2017-07-24 12:31:49',NULL,1,'.................'),(10,1,'job in exadel',1,NULL,'2017-07-28 06:39:22',5000,1,'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'),(11,6,'job in exadel',1,NULL,'2017-07-28 09:48:48',5000,1,'But I must r avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?');
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
INSERT INTO `vacancy_has_skills` VALUES (1,2,2),(1,4,2),(1,8,2),(3,3,2),(3,4,2),(3,7,2),(4,1,2),(4,4,2),(5,3,2),(5,9,2),(6,2,2),(6,6,2),(6,7,2),(6,8,2),(6,10,2),(7,1,56),(7,2,1),(7,5,435),(7,6,1),(10,2,2),(10,4,2),(10,8,2),(11,8,2);
/*!40000 ALTER TABLE `vacancy_has_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy_statuses`
--

DROP TABLE IF EXISTS `vacancy_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


drop view if exists candidates_view;
create view candidates_view AS SELECT cnd.id, cnd.name, cnd.email, cnd.surname, 
               cnd.skype,cnd.phone,cnd.resume, e_l.name AS english_level, 
               cnd.created_date, cnd.last_change_date, u.name AS hrName, 
               cnd.linkedin, cnd.salary, cnd.notification_date, 
               cnd.primary_skill_year_start, s.name AS primary_skill,
               cs.name AS status,ct.name AS city,
               GROUP_CONCAT(DISTINCT sk.name SEPARATOR ', ') AS secondary_skills,
               GROUP_CONCAT(DISTINCT l.link SEPARATOR ', ') AS links FROM candidates cnd
              LEFT JOIN cities ct
              ON cnd.city_id = ct.id
              LEFT JOIN candidate_statuses cs
              ON cnd.status_id = cs.id
              LEFT JOIN skills s
              ON cnd.primary_skill = s.id
              LEFT JOIN users u
              ON u.id = cnd.user_id
              LEFT JOIN english_levels e_l
              ON e_l.id = cnd.english_level_id
              LEFT JOIN skills_has_candidates s_h_c
              ON s_h_c.candidate_id = cnd.id
              LEFT JOIN skills sk
              ON sk.id = s_h_c.skill_id 
              LEFT JOIN links l
              ON cnd.id = l.candidate_id GROUP BY cnd.id;
 drop view if exists vacancies_view;
create view vacancies_view AS SELECT v.id, v.name, vs.name AS status, v.job_start, ps.name AS primary_skill, ct.name AS city, v.created_date, v.salary, v.description,  GROUP_CONCAT(DISTINCT ss.name SEPARATOR ', ') AS secondary_skills
      from vacancies v
              LEFT JOIN cities ct
              ON v.city_id = ct.id
              LEFT JOIN vacancy_statuses vs
              ON v.status_id = vs.id
              LEFT JOIN skills ps
              ON v.primary_skill = ps.id
              LEFT JOIN vacancy_has_skills vhs
              ON vhs.vacancy_id = v.id
              LEFT JOIN skills ss
              ON ss.id = vhs.skill_id GROUP BY v.id;
 	DROP PROCEDURE IF EXISTS `smart search vacancies`;
DELIMITER // 


    DROP PROCEDURE IF EXISTS `smart search vacancies`;
DELIMITER //
 
 
CREATE PROCEDURE `smart search vacancies` (IN var1 INT)
BEGIN
    DROP TABLE IF EXISTS weights;
CREATE TEMPORARY TABLE IF NOT EXISTS weights AS SELECT T.*,v.id from (SELECT f_f.name AS name, f_f.value AS value, value AS avg ,f.candidate_id AS candidate_id
FROM exadelteamdb2.feedbacks f
INNER JOIN exadelteamdb2.feedback_fields f_f
ON f_f.feedback_id=f.id
WHERE f_f.type='tech'
AND f.candidate_id = var1
AND f_f.value IS NOT NULL
 
union select sk.name,5 AS value ,5 as avg, var1 as candidate_id
from candidates cnd
INNER JOIN skills_has_candidates  s_h_c ON s_h_c.candidate_id=cnd.id
INNER JOIN skills sk ON sk.id=s_h_c.skill_id WHERE cnd.id = 5
UNION select sk.name,5 AS value ,5 as avg, var1 as candidate_id
from candidates cnd
INNER JOIN skills sk ON sk.id=cnd.primary_skill WHERE cnd.id = var1
 
 
GROUP BY value)  AS T INNER JOIN candidates c ON c.id = T.candidate_id  JOIN vacancies v ON v.primary_skill=c.primary_skill
LEFT JOIN vacancy_has_skills v_h_s ON v_h_s.vacancy_id=v.id LEFT JOIN skills sk ON sk.id = v_h_s.skill_id INNER JOIN skills skil ON c.primary_skill = skil.id WHERE (T.name = sk.name) OR (T.name = skil.name) ;
 
 
select v_v.id, v_v.name, v_v.status, v_v.job_start, v_v.primary_skill, v_v.city from(select name,value,AVG(avg) AS avg, candidate_id,id from exadelteamdb2.weights group by name,id )as newT  INNER JOIN vacancies_view v_v ON v_v.id = newT.id group by newT.id order by SUM(newT.avg) DESC LIMIT 10;
END//
DELIMITER ;

      DROP PROCEDURE IF EXISTS `smart search candidates`;
DELIMITER //
 
 
CREATE PROCEDURE `smart search candidates` (IN var1 INT)
BEGIN
    DROP TABLE IF EXISTS weights;
CREATE TEMPORARY TABLE IF NOT EXISTS weights AS SELECT T.*,v.id from (SELECT f_f.name AS name, f_f.value AS value, value AS avg ,f.candidate_id AS candidate_id
FROM exadelteamdb2.feedbacks f
INNER JOIN exadelteamdb2.feedback_fields f_f
ON f_f.feedback_id=f.id
WHERE f_f.type='tech'
AND f_f.value IS NOT NULL
 
union select sk.name,5 AS value ,5 as avg, cnd.id as candidate_id
from candidates cnd
INNER JOIN skills_has_candidates  s_h_c ON s_h_c.candidate_id=cnd.id
INNER JOIN skills sk ON sk.id=s_h_c.skill_id 
UNION select sk.name,5 AS value ,5 as avg, cnd.id as candidate_id
from candidates cnd
INNER JOIN skills sk ON sk.id=cnd.primary_skill
 
 
GROUP BY name,candidate_id)  AS T INNER JOIN candidates c ON c.id = T.candidate_id  INNER JOIN vacancies v ON v.primary_skill=c.primary_skill
LEFT JOIN vacancy_has_skills v_h_s ON v_h_s.vacancy_id=v.id LEFT JOIN skills sk ON sk.id = v_h_s.skill_id INNER JOIN skills skil ON c.primary_skill = skil.id WHERE ((T.name = sk.name) OR (T.name = skil.name)) AND v.id=var1;
 
 
select c_v.id, c_v.name, c_v.surname, c_v.primary_skill,
               c_v.status, c_v.last_change_date, c_v.city from(select name,value,AVG(avg) AS avg, candidate_id,id from exadelteamdb2.weights group by name,candidate_id )as newT  INNER JOIN candidates_view c_v ON c_v.id = newT.candidate_id  group by newT.candidate_id order by SUM(newT.avg) DESC LIMIT 10;
END//
DELIMITER ;



 DROP PROCEDURE IF EXISTS `all interviews`;
DELIMITER //
CREATE PROCEDURE `all interviews` (IN myId INT,IN skip INT,IN top INT)
BEGIN
  SELECT i.id, i.type, i.date, i.place, c.name, c.surname FROM interviews i
            INNER JOIN hirings h ON i.hiring_id = h.id
            INNER JOIN candidates c ON h.candidate_id = c.id
            WHERE h.user_id = myId AND h.date_close IS NULL

            UNION

            SELECT i.id, i.type, i.date, i.place, c.name, c.surname FROM interviews i
            INNER JOIN feedbacks f ON f.interview_id = i.id
            INNER JOIN candidates c ON f.candidate_id = c.id
            WHERE f.user_id = myId AND f.status = 0

            ORDER BY date
            LIMIT skip, top;
  
END//
DELIMITER ;

CREATE VIEW all_interviews_view AS 
	(SELECT 
		'Hirings' AS source,
		i.id AS id, 
		i.type AS type, 
		i.date AS date, 
		i.place AS place, 
		c.name AS name, 
		c.surname AS surname,
		h.user_id AS user_id
	FROM interviews i
		INNER JOIN hirings h ON ((i.hiring_id = h.id) AND (h.date_close IS NULL))
		INNER JOIN candidates c ON (h.candidate_id = c.id)) 
UNION 
(SELECT 
	'Feedback' AS source,
    i.id AS id, 
    i.type AS type, 
    i.date AS date, 
    i.place AS place, 
    c.name AS name, 
    c.surname AS surname,
    f.user_id AS user_id
FROM interviews i
	INNER JOIN feedbacks f ON ((f.interview_id = i.id) AND (f.status = 0))
	INNER JOIN candidates c ON (f.candidate_id = c.id));

--
-- Dumping data for table `vacancy_statuses`
--

LOCK TABLES `vacancy_statuses` WRITE;
/*!40000 ALTER TABLE `vacancy_statuses` DISABLE KEYS */;
INSERT INTO `vacancy_statuses` VALUES (1,'On hold'),(2,'Active'),(3,'CV provided'),(4,'Waiting for interview with customer'),(5,'Interview with customer'),(6,'Candidate declined'),(7,'Candidate approved'),(8,'Closed'),(9,'Cancelled');
/*!40000 ALTER TABLE `vacancy_statuses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-28 13:00:28
