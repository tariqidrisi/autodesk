CREATE DATABASE autodesk;

CREATE TABLE users 
	( 
		`id` SMALLINT NOT NULL AUTO_INCREMENT , 
		`first_name` VARCHAR(30) NOT NULL , 
		`last_name` VARCHAR(30) NOT NULL , 
		`username` VARCHAR(80) NOT NULL , 
		`password` VARCHAR(100) NOT NULL , 
		PRIMARY KEY (`id`)
	) ENGINE = InnoDB DEFAULT CHARSET=utf8;