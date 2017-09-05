-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-08-2017 a las 20:12:37
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `elparron`
--
CREATE DATABASE IF NOT EXISTS `elparron` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `elparron`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `masaSabor`
--

CREATE TABLE `masaSabor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `masaSabor`
--

INSERT INTO `masaSabor` (`id`, `nombre`) VALUES
(1, 'Blanco'),
(2, 'Chocolate'),
(3, 'Nuez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `masaTipo`
--

CREATE TABLE `masaTipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `masaTipo`
--

INSERT INTO `masaTipo` (`id`, `nombre`) VALUES
(1, 'Bizcocho'),
(2, 'Hoja'),
(3, 'Merengue'),
(4, 'Panqueque');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `solicitante` varchar(200) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fechaEntrega` datetime NOT NULL,
  `sucursalRetiro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `torta_id`, `solicitante`, `telefono`, `tamano_id`, `precio`, `fechaEntrega`, `sucursalRetiro`) VALUES
(1, 1, 'Max Rojas', '21358234', 1, 10000, '2017-07-18 00:00:00', 1),
(2, 1, 'Pablo Mendez', '654654654', 2, 20000, '2017-07-18 00:00:00', 1),
(3, 1, 'Federico fritz', '6556456435', 3, 30000, '2017-07-18 00:00:00', 1),
(4, 1, 'Claudio Matus', '2132345245', 4, 40000, '2017-07-18 00:00:00', 1),
(5, 2, 'asawdsss', '21312312', 1, 21321, '2017-07-18 00:00:00', 1),
(6, 2, 'qwewqe', '213213', 1, 12321, '2017-07-18 00:00:00', 1),
(7, 3, 'Tomy Rojas Flores', '46455665', 1, 10000, '2017-07-18 01:24:00', 1),
(8, 1, 'Rollo El vikingo', '2713272', 2, 10000, '2017-07-18 10:28:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidoEspecial`
--

CREATE TABLE `pedidoEspecial` (
  `id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `solicitante` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fechaEntrega` datetime NOT NULL,
  `sucursal_id` int(11) NOT NULL,
  `caracteristicas` text NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  `abono` int(11) NOT NULL,
  `forma` tinyint(1) NOT NULL,
  `diet` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedidoEspecial`
--

INSERT INTO `pedidoEspecial` (`id`, `torta_id`, `solicitante`, `telefono`, `tamano_id`, `precio`, `fechaEntrega`, `sucursal_id`, `caracteristicas`, `mensaje`, `abono`, `forma`, `diet`) VALUES
(1, 1, 'Maximiliano Rojas', '2725885', 1, 10000, '2017-07-18 00:00:00', 1, 'Dibujo Batman', 'Feliz cumpleaños Maxi', 5000, 1, 0),
(2, 2, 'Pablo Mendez', '65214562', 2, 20000, '2017-07-18 00:00:00', 1, 'Torta de cumpleaños', 'Feliz cumple pablo!!', 10000, 0, 1),
(3, 6, 'Claudio Matus', '85215875', 3, 30000, '2017-07-18 00:00:00', 1, 'Dibujo Ironman', 'Feliz cumpleaños Claudio!', 15000, 1, 1),
(4, 3, 'Camila Rios', '45564465', 2, 20000, '2017-07-18 00:00:00', 1, 'Toques rosados', 'aa', 10000, 1, 1),
(5, 1, 'Fabian Pozo', '5446546', 1, 10000, '2017-07-18 23:12:00', 1, 'Mucha piña', 'Feliz cumpleaños!', 5000, 0, 1),
(6, 1, 'Rick Sanchez', '8798789', 1, 10000, '2017-07-18 10:33:00', 1, 'Dibujo Nave Espacial', 'Feliz cumpleaño Beth!', 1000, 0, 0),
(7, 1, 'Morty Smith', '514654', 1, 10000, '2017-07-18 10:34:00', 1, 'Dibujo', 'Feliz cumpleaños Jesica!', 1000, 0, 0),
(8, 1, 'Rollo ', '546654654', 1, 10000, '2017-07-18 10:41:00', 1, 'Dibujo', 'Feliz Cumpleaños', 1000, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precio`
--

CREATE TABLE `precio` (
  `id` int(11) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `precio`
--

INSERT INTO `precio` (`id`, `precio`) VALUES
(1, 10000),
(2, 20000),
(3, 30000),
(4, 40000),
(5, 50000),
(6, 60000),
(7, 70000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacionDiariaCab`
--

CREATE TABLE `programacionDiariaCab` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `sucursal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `programacionDiariaCab`
--

INSERT INTO `programacionDiariaCab` (`id`, `fecha`, `sucursal_id`) VALUES
(4, '2017-07-18', 1),
(5, '2017-07-18', 2),
(6, '2017-08-11', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacionDiariaEsp`
--

CREATE TABLE `programacionDiariaEsp` (
  `id` int(11) NOT NULL,
  `programacionDiariaCab_id` int(11) NOT NULL,
  `pedidoEspecial_id` int(11) NOT NULL,
  `impreso` datetime DEFAULT NULL,
  `fabricado` datetime DEFAULT NULL,
  `camioneta` datetime DEFAULT NULL,
  `guiaDespacho` datetime DEFAULT NULL,
  `recepcionado` datetime DEFAULT NULL,
  `vendido` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacionDiariaNor`
--

CREATE TABLE `programacionDiariaNor` (
  `id` int(11) NOT NULL,
  `programacionDiariaCab_id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `impreso` datetime DEFAULT NULL,
  `fabricado` datetime DEFAULT NULL,
  `camioneta` datetime DEFAULT NULL,
  `guiaDespacho` datetime DEFAULT NULL,
  `recepcionado` datetime DEFAULT NULL,
  `vendido` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `programacionDiariaNor`
--

INSERT INTO `programacionDiariaNor` (`id`, `programacionDiariaCab_id`, `torta_id`, `tamano_id`, `impreso`, `fabricado`, `camioneta`, `guiaDespacho`, `recepcionado`, `vendido`) VALUES
(17, 6, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 6, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 6, 1, 3, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 6, 1, 4, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacionDiariaPed`
--

CREATE TABLE `programacionDiariaPed` (
  `id` int(11) NOT NULL,
  `programacionDiariaCab_id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `impreso` datetime DEFAULT NULL,
  `fabricado` datetime DEFAULT NULL,
  `camioneta` datetime DEFAULT NULL,
  `guiaDespacho` datetime DEFAULT NULL,
  `recepcionado` datetime DEFAULT NULL,
  `vendido` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `programacionDiariaPed`
--

INSERT INTO `programacionDiariaPed` (`id`, `programacionDiariaCab_id`, `torta_id`, `tamano_id`, `impreso`, `fabricado`, `camioneta`, `guiaDespacho`, `recepcionado`, `vendido`) VALUES
(9, 6, 4, 4, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacionDiariaSob`
--

CREATE TABLE `programacionDiariaSob` (
  `id` int(11) NOT NULL,
  `programacionDiariaCab_id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `programacionDiariaSob`
--

INSERT INTO `programacionDiariaSob` (`id`, `programacionDiariaCab_id`, `torta_id`, `tamano_id`, `cantidad`) VALUES
(194, 4, 1, 1, 3),
(195, 4, 1, 2, 1),
(196, 4, 1, 3, 1),
(197, 4, 1, 4, 1),
(198, 4, 2, 1, 1),
(199, 4, 2, 2, 1),
(200, 4, 2, 3, 1),
(201, 4, 2, 4, 1),
(202, 4, 3, 1, 1),
(203, 4, 3, 2, 1),
(204, 4, 3, 3, 1),
(205, 4, 3, 4, 1),
(206, 4, 4, 1, 1),
(207, 4, 4, 2, 1),
(208, 4, 4, 3, 1),
(209, 4, 4, 4, 1),
(210, 4, 5, 1, 1),
(211, 4, 5, 2, 1),
(212, 4, 5, 3, 1),
(213, 4, 5, 4, 1),
(214, 4, 6, 1, 1),
(215, 4, 6, 2, 1),
(216, 4, 6, 3, 1),
(217, 4, 6, 4, 1),
(218, 4, 7, 1, 1),
(219, 4, 7, 2, 1),
(220, 4, 7, 3, 1),
(221, 4, 7, 4, 1),
(222, 4, 8, 1, 1),
(223, 4, 8, 2, 1),
(224, 4, 8, 3, 1),
(225, 4, 8, 4, 1),
(226, 4, 9, 1, 2),
(227, 4, 9, 2, 5),
(228, 4, 9, 3, 2),
(229, 4, 9, 4, 1),
(230, 4, 10, 1, 0),
(231, 4, 10, 2, 2),
(232, 4, 10, 3, 1),
(233, 4, 10, 4, 1),
(234, 4, 11, 1, 1),
(235, 4, 11, 2, 2),
(236, 4, 11, 3, 2),
(237, 4, 11, 4, 5),
(238, 4, 12, 1, 2),
(239, 4, 12, 2, 2),
(240, 4, 12, 3, 5),
(241, 4, 12, 4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sabor`
--

CREATE TABLE `sabor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `sabor`
--

INSERT INTO `sabor` (`id`, `nombre`) VALUES
(1, 'Piña'),
(2, 'Lúcuma'),
(3, 'Nuez'),
(4, 'Frambuesa'),
(5, 'Chocolate'),
(6, 'Solo manjar'),
(7, 'Vainilla'),
(8, 'Chantilly');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semanaCab`
--

CREATE TABLE `semanaCab` (
  `id` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `sucursal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `semanaCab`
--

INSERT INTO `semanaCab` (`id`, `dia`, `sucursal_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 1),
(6, 2, 2),
(7, 2, 3),
(8, 2, 4),
(9, 3, 1),
(10, 3, 2),
(11, 3, 3),
(12, 3, 4),
(13, 4, 1),
(14, 4, 2),
(15, 4, 3),
(16, 4, 4),
(17, 5, 1),
(18, 5, 2),
(19, 5, 3),
(20, 5, 4),
(21, 6, 1),
(22, 6, 2),
(23, 6, 3),
(24, 6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semanaDet`
--

CREATE TABLE `semanaDet` (
  `semanaCab_id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `semanaDet`
--

INSERT INTO `semanaDet` (`semanaCab_id`, `torta_id`, `tamano_id`, `cantidad`) VALUES
(7, 1, 1, 4),
(7, 1, 2, 8),
(7, 1, 3, 6),
(7, 1, 4, 4),
(7, 2, 1, 6),
(7, 2, 2, 5),
(7, 2, 3, 4),
(7, 2, 4, 5),
(7, 3, 1, 3),
(7, 3, 2, 4),
(7, 3, 3, 5),
(7, 3, 4, 5),
(7, 4, 1, 5),
(7, 4, 2, 3),
(7, 4, 3, 6),
(7, 4, 4, 4),
(7, 5, 1, 4),
(7, 5, 2, 4),
(7, 5, 3, 4),
(7, 5, 4, 4),
(7, 6, 1, 4),
(7, 6, 2, 4),
(7, 6, 3, 4),
(7, 6, 4, 4),
(7, 7, 1, 4),
(7, 7, 2, 4),
(7, 7, 3, 4),
(7, 7, 4, 4),
(7, 8, 1, 4),
(7, 8, 2, 4),
(7, 8, 3, 4),
(7, 8, 4, 4),
(7, 9, 1, 4),
(7, 9, 2, 4),
(7, 9, 3, 4),
(7, 9, 4, 4),
(7, 10, 1, 4),
(7, 10, 2, 4),
(7, 10, 3, 4),
(7, 10, 4, 4),
(7, 11, 1, 4),
(7, 11, 2, 4),
(7, 11, 3, 4),
(7, 11, 4, 4),
(2, 1, 1, 0),
(2, 1, 2, 0),
(2, 1, 3, 0),
(2, 1, 4, 0),
(2, 2, 1, 0),
(2, 2, 2, 0),
(2, 2, 3, 0),
(2, 2, 4, 0),
(2, 3, 1, 0),
(2, 3, 2, 0),
(2, 3, 3, 0),
(2, 3, 4, 0),
(2, 4, 1, 0),
(2, 4, 2, 0),
(2, 4, 3, 0),
(2, 4, 4, 0),
(2, 5, 1, 0),
(2, 5, 2, 1),
(2, 5, 3, 2),
(2, 5, 4, 0),
(2, 6, 1, 0),
(2, 6, 2, 0),
(2, 6, 3, 0),
(2, 6, 4, 0),
(2, 7, 1, 0),
(2, 7, 2, 0),
(2, 7, 3, 0),
(2, 7, 4, 0),
(2, 8, 1, 0),
(2, 8, 2, 0),
(2, 8, 3, 0),
(2, 8, 4, 0),
(2, 9, 1, 0),
(2, 9, 2, 0),
(2, 9, 3, 0),
(2, 9, 4, 0),
(2, 10, 1, 0),
(2, 10, 2, 0),
(2, 10, 3, 0),
(2, 10, 4, 0),
(2, 11, 1, 0),
(2, 11, 2, 0),
(2, 11, 3, 0),
(2, 11, 4, 0),
(2, 12, 1, 0),
(2, 12, 2, 0),
(2, 12, 3, 0),
(2, 12, 4, 0),
(3, 1, 1, 2),
(3, 1, 2, 0),
(3, 1, 3, 0),
(3, 1, 4, 0),
(3, 2, 1, 0),
(3, 2, 2, 0),
(3, 2, 3, 0),
(3, 2, 4, 0),
(3, 3, 1, 0),
(3, 3, 2, 0),
(3, 3, 3, 0),
(3, 3, 4, 0),
(3, 4, 1, 0),
(3, 4, 2, 0),
(3, 4, 3, 0),
(3, 4, 4, 0),
(3, 5, 1, 0),
(3, 5, 2, 0),
(3, 5, 3, 0),
(3, 5, 4, 0),
(3, 6, 1, 0),
(3, 6, 2, 0),
(3, 6, 3, 0),
(3, 6, 4, 0),
(3, 7, 1, 0),
(3, 7, 2, 0),
(3, 7, 3, 0),
(3, 7, 4, 0),
(3, 8, 1, 0),
(3, 8, 2, 0),
(3, 8, 3, 0),
(3, 8, 4, 0),
(3, 9, 1, 0),
(3, 9, 2, 0),
(3, 9, 3, 0),
(3, 9, 4, 0),
(3, 10, 1, 0),
(3, 10, 2, 0),
(3, 10, 3, 0),
(3, 10, 4, 0),
(3, 11, 1, 0),
(3, 11, 2, 0),
(3, 11, 3, 0),
(3, 11, 4, 0),
(3, 12, 1, 0),
(3, 12, 2, 0),
(3, 12, 3, 0),
(3, 12, 4, 0),
(1, 1, 1, 5),
(1, 1, 2, 4),
(1, 1, 3, 5),
(1, 1, 4, 2),
(1, 2, 1, 3),
(1, 2, 2, 5),
(1, 2, 3, 2),
(1, 2, 4, 4),
(1, 3, 1, 8),
(1, 3, 2, 5),
(1, 3, 3, 2),
(1, 3, 4, 1),
(1, 4, 1, 3),
(1, 4, 2, 5),
(1, 4, 3, 9),
(1, 4, 4, 1),
(1, 5, 1, 2),
(1, 5, 2, 5),
(1, 5, 3, 8),
(1, 5, 4, 4),
(1, 6, 1, 6),
(1, 6, 2, 5),
(1, 6, 3, 2),
(1, 6, 4, 1),
(1, 7, 1, 4),
(1, 7, 2, 6),
(1, 7, 3, 2),
(1, 7, 4, 5),
(1, 8, 1, 3),
(1, 8, 2, 5),
(1, 8, 3, 6),
(1, 8, 4, 2),
(1, 9, 1, 1),
(1, 9, 2, 0),
(1, 9, 3, 3),
(1, 9, 4, 5),
(1, 10, 1, 2),
(1, 10, 2, 5),
(1, 10, 3, 6),
(1, 10, 4, 2),
(1, 11, 1, 0),
(1, 11, 2, 6),
(1, 11, 3, 3),
(1, 11, 4, 0),
(1, 12, 1, 6),
(1, 12, 2, 6),
(1, 12, 3, 0),
(1, 12, 4, 6),
(5, 1, 1, 5),
(5, 1, 2, 4),
(5, 1, 3, 6),
(5, 1, 4, 2),
(5, 2, 1, 5),
(5, 2, 2, 4),
(5, 2, 3, 2),
(5, 2, 4, 6),
(5, 3, 1, 4),
(5, 3, 2, 6),
(5, 3, 3, 7),
(5, 3, 4, 2),
(5, 4, 1, 1),
(5, 4, 2, 2),
(5, 4, 3, 5),
(5, 4, 4, 4),
(5, 5, 1, 6),
(5, 5, 2, 5),
(5, 5, 3, 3),
(5, 5, 4, 4),
(5, 6, 1, 5),
(5, 6, 2, 6),
(5, 6, 3, 2),
(5, 6, 4, 5),
(5, 7, 1, 5),
(5, 7, 2, 4),
(5, 7, 3, 6),
(5, 7, 4, 4),
(5, 8, 1, 5),
(5, 8, 2, 4),
(5, 8, 3, 6),
(5, 8, 4, 5),
(5, 9, 1, 6),
(5, 9, 2, 5),
(5, 9, 3, 4),
(5, 9, 4, 6),
(5, 10, 1, 4),
(5, 10, 2, 6),
(5, 10, 3, 4),
(5, 10, 4, 5),
(5, 11, 1, 5),
(5, 11, 2, 4),
(5, 11, 3, 5),
(5, 11, 4, 6),
(5, 12, 1, 6),
(5, 12, 2, 4),
(5, 12, 3, 5),
(5, 12, 4, 4),
(9, 1, 1, 2),
(9, 1, 2, 5),
(9, 1, 3, 2),
(9, 1, 4, 5),
(9, 2, 1, 2),
(9, 2, 2, 5),
(9, 2, 3, 2),
(9, 2, 4, 5),
(9, 3, 1, 2),
(9, 3, 2, 5),
(9, 3, 3, 2),
(9, 3, 4, 3),
(9, 4, 1, 2),
(9, 4, 2, 3),
(9, 4, 3, 2),
(9, 4, 4, 1),
(9, 5, 1, 2),
(9, 5, 2, 5),
(9, 5, 3, 2),
(9, 5, 4, 3),
(9, 6, 1, 2),
(9, 6, 2, 2),
(9, 6, 3, 2),
(9, 6, 4, 1),
(9, 7, 1, 2),
(9, 7, 2, 2),
(9, 7, 3, 2),
(9, 7, 4, 2),
(9, 8, 1, 1),
(9, 8, 2, 2),
(9, 8, 3, 2),
(9, 8, 4, 1),
(9, 9, 1, 2),
(9, 9, 2, 2),
(9, 9, 3, 2),
(9, 9, 4, 2),
(9, 10, 1, 2),
(9, 10, 2, 2),
(9, 10, 3, 2),
(9, 10, 4, 2),
(9, 11, 1, 2),
(9, 11, 2, 2),
(9, 11, 3, 2),
(9, 11, 4, 2),
(9, 12, 1, 2),
(9, 12, 2, 2),
(9, 12, 3, 2),
(9, 12, 4, 2),
(13, 1, 1, 2),
(13, 1, 2, 2),
(13, 1, 3, 2),
(13, 1, 4, 2),
(13, 2, 1, 2),
(13, 2, 2, 2),
(13, 2, 3, 2),
(13, 2, 4, 2),
(13, 3, 1, 2),
(13, 3, 2, 2),
(13, 3, 3, 2),
(13, 3, 4, 2),
(13, 4, 1, 2),
(13, 4, 2, 2),
(13, 4, 3, 2),
(13, 4, 4, 2),
(13, 5, 1, 2),
(13, 5, 2, 2),
(13, 5, 3, 2),
(13, 5, 4, 2),
(13, 6, 1, 2),
(13, 6, 2, 2),
(13, 6, 3, 2),
(13, 6, 4, 2),
(13, 7, 1, 2),
(13, 7, 2, 2),
(13, 7, 3, 2),
(13, 7, 4, 2),
(13, 8, 1, 5),
(13, 8, 2, 5),
(13, 8, 3, 5),
(13, 8, 4, 5),
(13, 9, 1, 5),
(13, 9, 2, 5),
(13, 9, 3, 5),
(13, 9, 4, 5),
(13, 10, 1, 5),
(13, 10, 2, 5),
(13, 10, 3, 5),
(13, 10, 4, 5),
(13, 11, 1, 5),
(13, 11, 2, 5),
(13, 11, 3, 5),
(13, 11, 4, 5),
(13, 12, 1, 5),
(13, 12, 2, 5),
(13, 12, 3, 5),
(13, 12, 4, 5),
(17, 1, 1, 1),
(17, 1, 2, 2),
(17, 1, 3, 1),
(17, 1, 4, 2),
(17, 2, 1, 1),
(17, 2, 2, 1),
(17, 2, 3, 1),
(17, 2, 4, 1),
(17, 3, 1, 5),
(17, 3, 2, 5),
(17, 3, 3, 5),
(17, 3, 4, 5),
(17, 4, 1, 4),
(17, 4, 2, 4),
(17, 4, 3, 4),
(17, 4, 4, 4),
(17, 5, 1, 2),
(17, 5, 2, 2),
(17, 5, 3, 2),
(17, 5, 4, 2),
(17, 6, 1, 4),
(17, 6, 2, 4),
(17, 6, 3, 5),
(17, 6, 4, 2),
(17, 7, 1, 2),
(17, 7, 2, 2),
(17, 7, 3, 2),
(17, 7, 4, 2),
(17, 8, 1, 2),
(17, 8, 2, 2),
(17, 8, 3, 2),
(17, 8, 4, 2),
(17, 9, 1, 1),
(17, 9, 2, 1),
(17, 9, 3, 1),
(17, 9, 4, 1),
(17, 10, 1, 1),
(17, 10, 2, 1),
(17, 10, 3, 1),
(17, 10, 4, 1),
(17, 11, 1, 1),
(17, 11, 2, 1),
(17, 11, 3, 1),
(17, 11, 4, 1),
(17, 12, 1, 1),
(17, 12, 2, 1),
(17, 12, 3, 1),
(17, 12, 4, 1),
(21, 1, 1, 2),
(21, 1, 2, 2),
(21, 1, 3, 2),
(21, 1, 4, 2),
(21, 2, 1, 2),
(21, 2, 2, 2),
(21, 2, 3, 2),
(21, 2, 4, 2),
(21, 3, 1, 2),
(21, 3, 2, 2),
(21, 3, 3, 2),
(21, 3, 4, 2),
(21, 4, 1, 2),
(21, 4, 2, 2),
(21, 4, 3, 2),
(21, 4, 4, 2),
(21, 5, 1, 2),
(21, 5, 2, 2),
(21, 5, 3, 2),
(21, 5, 4, 2),
(21, 6, 1, 2),
(21, 6, 2, 2),
(21, 6, 3, 2),
(21, 6, 4, 2),
(21, 7, 1, 2),
(21, 7, 2, 2),
(21, 7, 3, 2),
(21, 7, 4, 2),
(21, 8, 1, 2),
(21, 8, 2, 2),
(21, 8, 3, 2),
(21, 8, 4, 2),
(21, 9, 1, 2),
(21, 9, 2, 2),
(21, 9, 3, 2),
(21, 9, 4, 2),
(21, 10, 1, 2),
(21, 10, 2, 2),
(21, 10, 3, 2),
(21, 10, 4, 2),
(21, 11, 1, 2),
(21, 11, 2, 2),
(21, 11, 3, 2),
(21, 11, 4, 2),
(21, 12, 1, 2),
(21, 12, 2, 2),
(21, 12, 3, 2),
(21, 12, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sobranteCab`
--

CREATE TABLE `sobranteCab` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `sucursal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sobranteCab`
--

INSERT INTO `sobranteCab` (`id`, `fecha`, `sucursal_id`) VALUES
(1, '2017-07-17', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sobranteDet`
--

CREATE TABLE `sobranteDet` (
  `id` int(11) NOT NULL,
  `sobranteCab_id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sobranteDet`
--

INSERT INTO `sobranteDet` (`id`, `sobranteCab_id`, `torta_id`, `tamano_id`, `cantidad`) VALUES
(50, 1, 1, 1, 3),
(51, 1, 1, 2, 1),
(52, 1, 1, 3, 1),
(53, 1, 1, 4, 1),
(54, 1, 2, 1, 1),
(55, 1, 2, 2, 1),
(56, 1, 2, 3, 1),
(57, 1, 2, 4, 1),
(58, 1, 3, 1, 1),
(59, 1, 3, 2, 1),
(60, 1, 3, 3, 1),
(61, 1, 3, 4, 1),
(62, 1, 4, 1, 1),
(63, 1, 4, 2, 1),
(64, 1, 4, 3, 1),
(65, 1, 4, 4, 1),
(66, 1, 5, 1, 1),
(67, 1, 5, 2, 1),
(68, 1, 5, 3, 1),
(69, 1, 5, 4, 1),
(70, 1, 6, 1, 1),
(71, 1, 6, 2, 1),
(72, 1, 6, 3, 1),
(73, 1, 6, 4, 1),
(74, 1, 7, 1, 1),
(75, 1, 7, 2, 1),
(76, 1, 7, 3, 1),
(77, 1, 7, 4, 1),
(78, 1, 8, 1, 1),
(79, 1, 8, 2, 1),
(80, 1, 8, 3, 1),
(81, 1, 8, 4, 1),
(82, 1, 9, 1, 2),
(83, 1, 9, 2, 5),
(84, 1, 9, 3, 2),
(85, 1, 9, 4, 1),
(86, 1, 10, 1, 0),
(87, 1, 10, 2, 2),
(88, 1, 10, 3, 1),
(89, 1, 10, 4, 1),
(90, 1, 11, 1, 1),
(91, 1, 11, 2, 2),
(92, 1, 11, 3, 2),
(93, 1, 11, 4, 5),
(94, 1, 12, 1, 2),
(95, 1, 12, 2, 2),
(96, 1, 12, 3, 5),
(97, 1, 12, 4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `comuna` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`id`, `nombre`, `direccion`, `comuna`) VALUES
(1, 'La Cisterna', 'Gran Avenida 7960 (Paradero 21)', 'La Cisterna'),
(2, 'La Florida', 'Serafín Zamora 46', 'La Florida'),
(3, 'Maipú', 'Gonzalo Pérez Llona 138', 'Maipú'),
(4, 'San Bernardo', 'Arturo Pratt 668', 'San Bernardo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tamano`
--

CREATE TABLE `tamano` (
  `id` int(11) NOT NULL,
  `num` varchar(20) NOT NULL,
  `personas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tamano`
--

INSERT INTO `tamano` (`id`, `num`, `personas`) VALUES
(1, '1/2', 6),
(2, '1', 12),
(3, '2', 18),
(4, '3', 24),
(5, '4', 30),
(6, '5', 40),
(7, '6', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torta`
--

CREATE TABLE `torta` (
  `id` int(11) NOT NULL,
  `masaTipo_id` int(11) NOT NULL,
  `masaSabor_id` int(11) NOT NULL,
  `sabor_id` int(11) NOT NULL,
  `imagen` text CHARACTER SET latin1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `torta`
--

INSERT INTO `torta` (`id`, `masaTipo_id`, `masaSabor_id`, `sabor_id`, `imagen`) VALUES
(1, 1, 1, 1, NULL),
(2, 1, 1, 2, NULL),
(3, 1, 3, 3, NULL),
(4, 1, 1, 4, NULL),
(5, 1, 1, 5, NULL),
(6, 1, 1, 6, NULL),
(7, 2, 1, 8, NULL),
(8, 2, 1, 2, NULL),
(9, 2, 1, 3, NULL),
(10, 2, 1, 7, NULL),
(11, 2, 1, 6, NULL),
(12, 3, 2, 7, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tortaPrecio`
--

CREATE TABLE `tortaPrecio` (
  `id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `precio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tortaPrecio`
--

INSERT INTO `tortaPrecio` (`id`, `torta_id`, `tamano_id`, `precio_id`) VALUES
(1, 1, 1, 1),
(3, 1, 3, 3),
(4, 1, 4, 4),
(5, 1, 5, 5),
(6, 1, 6, 6),
(7, 1, 7, 7),
(8, 2, 1, 1),
(9, 2, 2, 2),
(10, 2, 3, 3),
(11, 2, 4, 4),
(12, 2, 5, 5),
(13, 2, 6, 6),
(14, 2, 7, 7),
(15, 3, 1, 1),
(16, 3, 2, 2),
(17, 3, 3, 3),
(18, 3, 4, 4),
(19, 3, 5, 5),
(20, 3, 6, 6),
(21, 3, 7, 7),
(22, 4, 1, 1),
(23, 4, 2, 2),
(24, 4, 3, 3),
(25, 4, 4, 4),
(26, 4, 5, 5),
(27, 4, 6, 6),
(28, 4, 7, 7),
(29, 5, 1, 1),
(30, 5, 2, 2),
(31, 5, 3, 3),
(32, 5, 4, 4),
(33, 5, 5, 5),
(34, 5, 6, 6),
(35, 5, 7, 7),
(36, 6, 1, 1),
(37, 6, 2, 2),
(38, 6, 3, 3),
(39, 6, 4, 4),
(40, 6, 5, 5),
(41, 6, 6, 6),
(42, 6, 7, 7),
(43, 7, 1, 1),
(44, 7, 2, 2),
(45, 7, 3, 3),
(46, 7, 4, 4),
(47, 7, 5, 5),
(48, 7, 6, 6),
(49, 7, 7, 7),
(50, 8, 1, 1),
(51, 8, 2, 2),
(52, 8, 3, 3),
(53, 8, 4, 4),
(54, 8, 5, 5),
(55, 8, 6, 6),
(56, 8, 7, 7),
(57, 9, 1, 1),
(58, 9, 2, 2),
(59, 9, 3, 3),
(60, 9, 4, 4),
(61, 9, 5, 5),
(62, 9, 6, 6),
(63, 9, 7, 7),
(64, 10, 1, 1),
(65, 10, 2, 2),
(66, 10, 3, 3),
(67, 10, 4, 4),
(68, 10, 5, 5),
(69, 10, 6, 6),
(70, 10, 7, 7),
(71, 11, 1, 1),
(72, 11, 2, 2),
(73, 11, 3, 3),
(74, 11, 4, 4),
(75, 11, 5, 5),
(76, 11, 6, 6),
(77, 11, 7, 7),
(78, 12, 1, 1),
(79, 12, 2, 2),
(80, 12, 3, 3),
(81, 12, 4, 4),
(82, 12, 5, 5),
(83, 12, 6, 6),
(84, 12, 7, 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `masaSabor`
--
ALTER TABLE `masaSabor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `masaTipo`
--
ALTER TABLE `masaTipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `torta_id` (`torta_id`,`tamano_id`),
  ADD KEY `tamano_id` (`tamano_id`),
  ADD KEY `sucursalRetiro` (`sucursalRetiro`);

--
-- Indices de la tabla `pedidoEspecial`
--
ALTER TABLE `pedidoEspecial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `torta_id` (`torta_id`),
  ADD KEY `tamano_id` (`tamano_id`),
  ADD KEY `sucursal_id` (`sucursal_id`);

--
-- Indices de la tabla `precio`
--
ALTER TABLE `precio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `programacionDiariaCab`
--
ALTER TABLE `programacionDiariaCab`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sucursal_id` (`sucursal_id`);

--
-- Indices de la tabla `programacionDiariaEsp`
--
ALTER TABLE `programacionDiariaEsp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `programacionDiariaCab_id` (`programacionDiariaCab_id`),
  ADD KEY `pedidoEspecial_id` (`pedidoEspecial_id`);

--
-- Indices de la tabla `programacionDiariaNor`
--
ALTER TABLE `programacionDiariaNor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `programacionDiariaCab_id` (`programacionDiariaCab_id`),
  ADD KEY `torta_id` (`torta_id`),
  ADD KEY `tamano_id` (`tamano_id`);

--
-- Indices de la tabla `programacionDiariaPed`
--
ALTER TABLE `programacionDiariaPed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `programacionDiariaCab_id` (`programacionDiariaCab_id`),
  ADD KEY `torta_id` (`torta_id`),
  ADD KEY `tamano_id` (`tamano_id`);

--
-- Indices de la tabla `programacionDiariaSob`
--
ALTER TABLE `programacionDiariaSob`
  ADD PRIMARY KEY (`id`),
  ADD KEY `programacionDiariaCab_id` (`programacionDiariaCab_id`),
  ADD KEY `torta_id` (`torta_id`),
  ADD KEY `tamano_id` (`tamano_id`);

--
-- Indices de la tabla `sabor`
--
ALTER TABLE `sabor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `semanaCab`
--
ALTER TABLE `semanaCab`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_DIA` (`dia`,`sucursal_id`),
  ADD KEY `sucursal_id` (`sucursal_id`);

--
-- Indices de la tabla `semanaDet`
--
ALTER TABLE `semanaDet`
  ADD KEY `historicoCab_id` (`semanaCab_id`,`torta_id`,`tamano_id`),
  ADD KEY `torta_id` (`torta_id`),
  ADD KEY `tamano_id` (`tamano_id`);

--
-- Indices de la tabla `sobranteCab`
--
ALTER TABLE `sobranteCab`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sucursal_id` (`sucursal_id`);

--
-- Indices de la tabla `sobranteDet`
--
ALTER TABLE `sobranteDet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sobranteCab_id` (`sobranteCab_id`),
  ADD KEY `torta_id` (`torta_id`),
  ADD KEY `tamano_id` (`tamano_id`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tamano`
--
ALTER TABLE `tamano`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `torta`
--
ALTER TABLE `torta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_torta` (`masaTipo_id`,`masaSabor_id`,`sabor_id`) USING BTREE,
  ADD KEY `masaTipo_id` (`masaTipo_id`,`masaSabor_id`,`sabor_id`),
  ADD KEY `masaSabor_id` (`masaSabor_id`),
  ADD KEY `sabor_id` (`sabor_id`);

--
-- Indices de la tabla `tortaPrecio`
--
ALTER TABLE `tortaPrecio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tamanoPrecioTorta_id` (`torta_id`,`tamano_id`,`precio_id`) USING BTREE,
  ADD KEY `tamano_id` (`tamano_id`),
  ADD KEY `precio_id` (`precio_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `masaSabor`
--
ALTER TABLE `masaSabor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `masaTipo`
--
ALTER TABLE `masaTipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `pedidoEspecial`
--
ALTER TABLE `pedidoEspecial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `precio`
--
ALTER TABLE `precio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `programacionDiariaCab`
--
ALTER TABLE `programacionDiariaCab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `programacionDiariaEsp`
--
ALTER TABLE `programacionDiariaEsp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `programacionDiariaNor`
--
ALTER TABLE `programacionDiariaNor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `programacionDiariaPed`
--
ALTER TABLE `programacionDiariaPed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `programacionDiariaSob`
--
ALTER TABLE `programacionDiariaSob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;
--
-- AUTO_INCREMENT de la tabla `sabor`
--
ALTER TABLE `sabor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `semanaCab`
--
ALTER TABLE `semanaCab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `sobranteCab`
--
ALTER TABLE `sobranteCab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `sobranteDet`
--
ALTER TABLE `sobranteDet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tamano`
--
ALTER TABLE `tamano`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `torta`
--
ALTER TABLE `torta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `tortaPrecio`
--
ALTER TABLE `tortaPrecio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`),
  ADD CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`sucursalRetiro`) REFERENCES `sucursal` (`id`),
  ADD CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`);

--
-- Filtros para la tabla `pedidoEspecial`
--
ALTER TABLE `pedidoEspecial`
  ADD CONSTRAINT `pedidoEspecial_ibfk_1` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`),
  ADD CONSTRAINT `pedidoEspecial_ibfk_2` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`),
  ADD CONSTRAINT `pedidoEspecial_ibfk_3` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id`);

--
-- Filtros para la tabla `programacionDiariaCab`
--
ALTER TABLE `programacionDiariaCab`
  ADD CONSTRAINT `programacionDiariaCab_ibfk_1` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id`);

--
-- Filtros para la tabla `programacionDiariaEsp`
--
ALTER TABLE `programacionDiariaEsp`
  ADD CONSTRAINT `programacionDiariaEsp_ibfk_1` FOREIGN KEY (`programacionDiariaCab_id`) REFERENCES `programacionDiariaCab` (`id`),
  ADD CONSTRAINT `programacionDiariaEsp_ibfk_2` FOREIGN KEY (`pedidoEspecial_id`) REFERENCES `pedidoEspecial` (`id`);

--
-- Filtros para la tabla `programacionDiariaNor`
--
ALTER TABLE `programacionDiariaNor`
  ADD CONSTRAINT `programacionDiariaNor_ibfk_1` FOREIGN KEY (`programacionDiariaCab_id`) REFERENCES `programacionDiariaCab` (`id`),
  ADD CONSTRAINT `programacionDiariaNor_ibfk_2` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`),
  ADD CONSTRAINT `programacionDiariaNor_ibfk_3` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`);

--
-- Filtros para la tabla `programacionDiariaPed`
--
ALTER TABLE `programacionDiariaPed`
  ADD CONSTRAINT `programacionDiariaPed_ibfk_1` FOREIGN KEY (`programacionDiariaCab_id`) REFERENCES `programacionDiariaCab` (`id`),
  ADD CONSTRAINT `programacionDiariaPed_ibfk_2` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`),
  ADD CONSTRAINT `programacionDiariaPed_ibfk_3` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`);

--
-- Filtros para la tabla `programacionDiariaSob`
--
ALTER TABLE `programacionDiariaSob`
  ADD CONSTRAINT `programacionDiariaSob_ibfk_1` FOREIGN KEY (`programacionDiariaCab_id`) REFERENCES `programacionDiariaCab` (`id`),
  ADD CONSTRAINT `programacionDiariaSob_ibfk_2` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`),
  ADD CONSTRAINT `programacionDiariaSob_ibfk_3` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`);

--
-- Filtros para la tabla `semanaCab`
--
ALTER TABLE `semanaCab`
  ADD CONSTRAINT `semanaCab_ibfk_1` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id`);

--
-- Filtros para la tabla `semanaDet`
--
ALTER TABLE `semanaDet`
  ADD CONSTRAINT `semanaDet_ibfk_1` FOREIGN KEY (`semanaCab_id`) REFERENCES `semanaCab` (`id`),
  ADD CONSTRAINT `semanaDet_ibfk_3` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`),
  ADD CONSTRAINT `semanaDet_ibfk_4` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`);

--
-- Filtros para la tabla `sobranteCab`
--
ALTER TABLE `sobranteCab`
  ADD CONSTRAINT `sobranteCab_ibfk_1` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id`);

--
-- Filtros para la tabla `sobranteDet`
--
ALTER TABLE `sobranteDet`
  ADD CONSTRAINT `sobranteDet_ibfk_1` FOREIGN KEY (`sobranteCab_id`) REFERENCES `sobranteCab` (`id`),
  ADD CONSTRAINT `sobranteDet_ibfk_2` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`),
  ADD CONSTRAINT `sobranteDet_ibfk_3` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`);

--
-- Filtros para la tabla `torta`
--
ALTER TABLE `torta`
  ADD CONSTRAINT `torta_ibfk_1` FOREIGN KEY (`masaTipo_id`) REFERENCES `masaTipo` (`id`),
  ADD CONSTRAINT `torta_ibfk_2` FOREIGN KEY (`masaSabor_id`) REFERENCES `masaSabor` (`id`),
  ADD CONSTRAINT `torta_ibfk_3` FOREIGN KEY (`sabor_id`) REFERENCES `sabor` (`id`);

--
-- Filtros para la tabla `tortaPrecio`
--
ALTER TABLE `tortaPrecio`
  ADD CONSTRAINT `tortaPrecio_ibfk_1` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`),
  ADD CONSTRAINT `tortaPrecio_ibfk_2` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`),
  ADD CONSTRAINT `tortaPrecio_ibfk_3` FOREIGN KEY (`precio_id`) REFERENCES `precio` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
