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

-- -----------------------------------------------------
-- Table `exadel-team-db`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`cities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `role` SET('admin', 'hr', 'user') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`candidates` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `primary_skill` VARCHAR(45) NOT NULL,
  `skype` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `resume` VARCHAR(45) NULL DEFAULT NULL,
  `status` SET('Pool', 'In progress', 'On hold', 'Rejected', 'Interview', 'Job offer', 'Job offer rejected', 'Job offer accepted', 'Hired') NOT NULL,
  `english_level` SET('0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2') NOT NULL,
  `created_date` DATETIME NOT NULL,
  `last_change_date` DATETIME NOT NULL,
  `user_id` INT(11) NOT NULL,
  `linkedin` VARCHAR(45) NULL DEFAULT NULL,
  `city_id` INT(11) NULL DEFAULT NULL,
  `salary` VARCHAR(45) NULL DEFAULT NULL,
  `notification_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_candidates_users1_idx` (`user_id` ASC),
  INDEX `fk_candidates_cities1_idx` (`city_id` ASC),
  CONSTRAINT `fk_candidates_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `exadel-team-db`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidates_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exadel-team-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`vacancy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`vacancy` (
  `id` INT(11) NOT NULL,
  `city_id` INT(11) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `status` SET('On hold', 'Active', 'CV provided', 'Waiting for interview with customer', 'Interview with customer', 'Candidate declined', 'Candidate approved', 'Closed', 'Cancelled') NOT NULL,
  `job_start` DATE NULL DEFAULT NULL,
  `created_date` DATETIME NOT NULL,
  `salary` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vacancy_cities1_idx` (`city_id` ASC),
  CONSTRAINT `fk_vacancy_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `exadel-team-db`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`hirings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`hirings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `vacancy_id` INT(11) NULL DEFAULT NULL,
  `candidate_id` INT(11) NOT NULL,
  `date_open` DATETIME NOT NULL,
  `date_close` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_hirings_users_idx` (`user_id` ASC),
  INDEX `fk_hirings_vacancy1_idx` (`vacancy_id` ASC),
  INDEX `fk_hirings_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_hirings_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadel-team-db`.`candidates` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_hirings_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `exadel-team-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_hirings_vacancy1`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `exadel-team-db`.`vacancy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role` SET('Candidate', 'Vacancy', 'Hiring') NOT NULL,
  `foreign_id` INT(11) NOT NULL,
  `time` DATETIME NOT NULL,
  `logs` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`interviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`interviews` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` SET('TECH', 'HR', 'CLIENT') NOT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `place` VARCHAR(45) NULL DEFAULT NULL,
  `hiring_id` INT(11) NOT NULL,
  `status` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_interviews_hirings1_idx` (`hiring_id` ASC),
  CONSTRAINT `fk_interviews_hirings1`
    FOREIGN KEY (`hiring_id`)
    REFERENCES `exadel-team-db`.`hirings` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`skills` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`interviews_has_skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`interviews_has_skills` (
  `interviews_id` INT(11) NOT NULL,
  `skills_id` INT(11) NOT NULL,
  PRIMARY KEY (`interviews_id`, `skills_id`),
  INDEX `fk_interviews_has_skills_skills1_idx` (`skills_id` ASC),
  INDEX `fk_interviews_has_skills_interviews1_idx` (`interviews_id` ASC),
  CONSTRAINT `fk_interviews_has_skills_interviews1`
    FOREIGN KEY (`interviews_id`)
    REFERENCES `exadel-team-db`.`interviews` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interviews_has_skills_skills1`
    FOREIGN KEY (`skills_id`)
    REFERENCES `exadel-team-db`.`skills` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`interviews_has_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`interviews_has_users` (
  `interviews_id` INT(11) NOT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`interviews_id`, `users_id`),
  INDEX `fk_interviews_has_users_users1_idx` (`users_id` ASC),
  INDEX `fk_interviews_has_users_interviews1_idx` (`interviews_id` ASC),
  CONSTRAINT `fk_interviews_has_users_interviews1`
    FOREIGN KEY (`interviews_id`)
    REFERENCES `exadel-team-db`.`interviews` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interviews_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `exadel-team-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`links` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(45) NOT NULL,
  `candidate_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_links_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_links_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadel-team-db`.`candidates` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `text` LONGTEXT NOT NULL,
  `user_id` INT NOT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exadel-team-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`primary_expirience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`primary_expirience` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` INT(11) NOT NULL,
  `skill` VARCHAR(45) NOT NULL,
  `year_start` YEAR(4) NOT NULL,
  `year_end` YEAR(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_primary_expirience_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_primary_expirience_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadel-team-db`.`candidates` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`skills_has_candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`skills_has_candidates` (
  `skills_id` INT(11) NOT NULL,
  `candidates_id` INT(11) NOT NULL,
  PRIMARY KEY (`skills_id`, `candidates_id`),
  INDEX `fk_skills_has_candidates_candidates1_idx` (`candidates_id` ASC),
  INDEX `fk_skills_has_candidates_skills1_idx` (`skills_id` ASC),
  CONSTRAINT `fk_skills_has_candidates_candidates1`
    FOREIGN KEY (`candidates_id`)
    REFERENCES `exadel-team-db`.`candidates` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_skills_has_candidates_skills1`
    FOREIGN KEY (`skills_id`)
    REFERENCES `exadel-team-db`.`skills` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`vacancy_has_skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`vacancy_has_skills` (
  `vacancy_id` INT(11) NOT NULL,
  `skills_id` INT(11) NOT NULL,
  `weight` INT NOT NULL,
  PRIMARY KEY (`vacancy_id`, `skills_id`),
  INDEX `fk_vacancy_has_skills_skills1_idx` (`skills_id` ASC),
  INDEX `fk_vacancy_has_skills_vacancy1_idx` (`vacancy_id` ASC),
  CONSTRAINT `fk_vacancy_has_skills_skills1`
    FOREIGN KEY (`skills_id`)
    REFERENCES `exadel-team-db`.`skills` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_has_skills_vacancy1`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `exadel-team-db`.`vacancy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `interviews_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `comment` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_tech_users1_idx` (`users_id` ASC),
  INDEX `fk_feedback_tech_interviews1_idx` (`interviews_id` ASC),
  INDEX `fk_feedback_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_feedback_tech_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `exadel-team-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback_tech_interviews1`
    FOREIGN KEY (`interviews_id`)
    REFERENCES `exadel-team-db`.`interviews` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadel-team-db`.`candidates` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exadel-team-db`.`feedback_fields`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadel-team-db`.`feedback_fields` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `value` VARCHAR(45) NULL,
  `comment` VARCHAR(45) NULL,
  `type_skill` VARCHAR(45) NULL,
  `feedback_id` INT NOT NULL,
  `type` SET('tech', 'hr', 'owner') NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_table1_feedback_tech1_idx` (`feedback_id` ASC),
  CONSTRAINT `fk_table1_feedback_tech1`
    FOREIGN KEY (`feedback_id`)
    REFERENCES `exadel-team-db`.`feedback` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
