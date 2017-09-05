/*
SQLyog Trial v12.4.1 (64 bit)
MySQL - 10.1.23-MariaDB : Database - elparron
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`elparron` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `elparron`;

/*Table structure for table `historicocab` */

DROP TABLE IF EXISTS `historicocab`;

CREATE TABLE `historicocab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `sucursal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_FECHA` (`fecha`,`sucursal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `historicocab` */

insert  into `historicocab`(`id`,`fecha`,`sucursal_id`) values 
(1,'2017-05-09',1),
(2,'2017-05-09',2),
(3,'2017-05-09',3);

/*Table structure for table `historicodet` */

DROP TABLE IF EXISTS `historicodet`;

CREATE TABLE `historicodet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `historicoCab_id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `historicodet` */

insert  into `historicodet`(`id`,`historicoCab_id`,`torta_id`,`tamano_id`,`cantidad`) values 
(1,1,1,1,4),
(2,1,1,2,8),
(3,1,1,3,6),
(4,1,2,2,4),
(5,1,2,3,6);

/*Table structure for table `masasabor` */

DROP TABLE IF EXISTS `masasabor`;

CREATE TABLE `masasabor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `masasabor` */

insert  into `masasabor`(`id`,`nombre`) values 
(1,'Blanco'),
(2,'Chocolate'),
(3,'Nuez');

/*Table structure for table `masatipo` */

DROP TABLE IF EXISTS `masatipo`;

CREATE TABLE `masatipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `masatipo` */

insert  into `masatipo`(`id`,`nombre`) values 
(1,'Bizcocho'),
(2,'Hoja'),
(3,'Merengue'),
(4,'Panqueque');

/*Table structure for table `sabor` */

DROP TABLE IF EXISTS `sabor`;

CREATE TABLE `sabor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `sabor` */

insert  into `sabor`(`id`,`nombre`) values 
(1,'Piña'),
(2,'Lúcuma'),
(3,'Nuez'),
(4,'Frambuesa'),
(5,'Chocolate'),
(6,'Solo manjar'),
(7,'Vainilla'),
(8,'Chantilly');

/*Table structure for table `sucursal` */

DROP TABLE IF EXISTS `sucursal`;

CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comuna` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `sucursal` */

insert  into `sucursal`(`id`,`nombre`,`direccion`,`comuna`) values 
(1,'La Cisterna','Gran Avenida 7960 (Paradero 21)','La Cisterna'),
(2,'La Florida','Serafín Zamora 46','La Florida'),
(3,'Maipú','Gonzalo Pérez Llona 138','Maipú'),
(4,'San Bernardo','Arturo Pratt 668','San Bernardo');

/*Table structure for table `tamano` */

DROP TABLE IF EXISTS `tamano`;

CREATE TABLE `tamano` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `personas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tamano` */

insert  into `tamano`(`id`,`personas`) values 
(1,6),
(2,12),
(3,18),
(4,24),
(5,30),
(6,40),
(7,50);

/*Table structure for table `torta` */

DROP TABLE IF EXISTS `torta`;

CREATE TABLE `torta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `masaTipo_id` int(11) NOT NULL,
  `masaSabor_id` int(11) NOT NULL,
  `sabor_id` int(11) NOT NULL,
  `imagen` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `torta` */

insert  into `torta`(`id`,`masaTipo_id`,`masaSabor_id`,`sabor_id`,`imagen`) values 
(1,1,1,1,NULL),
(2,1,1,2,NULL),
(3,1,3,3,NULL),
(4,1,1,4,NULL),
(5,1,1,5,NULL),
(6,1,1,6,NULL),
(7,2,1,8,NULL),
(8,2,1,2,NULL),
(9,2,1,3,NULL),
(10,2,1,7,NULL),
(11,2,1,6,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
