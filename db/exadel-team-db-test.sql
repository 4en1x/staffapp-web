-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema exadelteamdbtest
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema exadelteamdbtest
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `exadelteamdbtest` DEFAULT CHARACTER SET utf8 ;
USE `exadelteamdbtest` ;

-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`cities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `role` SET('admin', 'hr', 'user') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`candidates` (
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
  `primary_skill_year_start` YEAR NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_candidates_users1_idx` (`user_id` ASC),
  INDEX `fk_candidates_cities1_idx` (`city_id` ASC),
  CONSTRAINT `fk_candidates_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `exadelteamdbtest`.`cities` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_candidates_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exadelteamdbtest`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`vacancies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`vacancies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `city_id` INT(11) NULL,
  `name` VARCHAR(120) NOT NULL,
  `status` SET('On hold', 'Active', 'CV provided', 'Waiting for interview with customer', 'Interview with customer', 'Candidate declined', 'Candidate approved', 'Closed', 'Cancelled') NOT NULL,
  `job_start` DATE NULL DEFAULT NULL,
  `created_date` DATETIME NOT NULL,
  `salary` VARCHAR(45) NULL,
  `primary_skill` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vacancy_cities1_idx` (`city_id` ASC),
  CONSTRAINT `fk_vacancy_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `exadelteamdbtest`.`cities` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`hirings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`hirings` (
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
    REFERENCES `exadelteamdbtest`.`candidates` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_hirings_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `exadelteamdbtest`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_hirings_vacancy1`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `exadelteamdbtest`.`vacancies` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role` SET('Candidate', 'Vacancy', 'Hiring') NOT NULL,
  `foreign_id` INT(11) NOT NULL,
  `time` DATETIME NOT NULL,
  `logs` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`interviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`interviews` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` SET('TECH', 'HR', 'CLIENT') NOT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `place` VARCHAR(45) NULL DEFAULT NULL,
  `hiring_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_interviews_hirings1_idx` (`hiring_id` ASC),
  CONSTRAINT `fk_interviews_hirings1`
    FOREIGN KEY (`hiring_id`)
    REFERENCES `exadelteamdbtest`.`hirings` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`skills` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`interviews_has_skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`interviews_has_skills` (
  `interview_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  PRIMARY KEY (`interview_id`, `skill_id`),
  INDEX `fk_interviews_has_skills_skills1_idx` (`skill_id` ASC),
  INDEX `fk_interviews_has_skills_interviews1_idx` (`interview_id` ASC),
  CONSTRAINT `fk_interviews_has_skills_interviews1`
    FOREIGN KEY (`interview_id`)
    REFERENCES `exadelteamdbtest`.`interviews` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interviews_has_skills_skills1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exadelteamdbtest`.`skills` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`interviews_has_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`interviews_has_users` (
  `interviews_id` INT(11) NOT NULL,
  `users_id` INT(11) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`interviews_id`, `users_id`),
  INDEX `fk_interviews_has_users_users1_idx` (`users_id` ASC),
  INDEX `fk_interviews_has_users_interviews1_idx` (`interviews_id` ASC),
  CONSTRAINT `fk_interviews_has_users_interviews1`
    FOREIGN KEY (`interviews_id`)
    REFERENCES `exadelteamdbtest`.`interviews` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interviews_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `exadelteamdbtest`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`links` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(45) NOT NULL,
  `candidate_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_links_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_links_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadelteamdbtest`.`candidates` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `text` LONGTEXT NOT NULL,
  `user_id` INT NOT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exadelteamdbtest`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`primary_expirience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`primary_expirience` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` INT(11) NOT NULL,
  `skill` VARCHAR(45) NOT NULL,
  `year_start` YEAR(4) NOT NULL,
  `year_end` YEAR(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_primary_expirience_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_primary_expirience_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadelteamdbtest`.`candidates` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`skills_has_candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`skills_has_candidates` (
  `skill_id` INT(11) NOT NULL,
  `candidate_id` INT(11) NOT NULL,
  PRIMARY KEY (`skill_id`, `candidate_id`),
  INDEX `fk_skills_has_candidates_candidates1_idx` (`candidate_id` ASC),
  INDEX `fk_skills_has_candidates_skills1_idx` (`skill_id` ASC),
  CONSTRAINT `fk_skills_has_candidates_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadelteamdbtest`.`candidates` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_skills_has_candidates_skills1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exadelteamdbtest`.`skills` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`vacancy_has_skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`vacancy_has_skills` (
  `vacancy_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  `weight` INT NOT NULL,
  PRIMARY KEY (`vacancy_id`, `skill_id`),
  INDEX `fk_vacancy_has_skills_skills1_idx` (`skill_id` ASC),
  INDEX `fk_vacancy_has_skills_vacancy1_idx` (`vacancy_id` ASC),
  CONSTRAINT `fk_vacancy_has_skills_skills1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exadelteamdbtest`.`skills` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_vacancy_has_skills_vacancy1`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `exadelteamdbtest`.`vacancies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`feedbacks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`feedbacks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `interview_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `comment` VARCHAR(45) NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_tech_users1_idx` (`user_id` ASC),
  INDEX `fk_feedback_tech_interviews1_idx` (`interview_id` ASC),
  INDEX `fk_feedback_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_feedback_tech_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exadelteamdbtest`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedback_tech_interviews1`
    FOREIGN KEY (`interview_id`)
    REFERENCES `exadelteamdbtest`.`interviews` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_feedback_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `exadelteamdbtest`.`candidates` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exadelteamdbtest`.`feedbacks_fields`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exadelteamdbtest`.`feedbacks_fields` (
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
    REFERENCES `exadelteamdbtest`.`feedbacks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
