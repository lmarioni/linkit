-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-12-2019 a las 03:09:13
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `link`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(256) COLLATE utf8_spanish_ci DEFAULT NULL,
  `name` varchar(256) COLLATE utf8_spanish_ci DEFAULT NULL,
  `email` varchar(256) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(256) COLLATE utf8_spanish_ci DEFAULT NULL,
  `lastName` varchar(256) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `password`, `lastName`) VALUES
(4, 'cazaputas42', NULL, 'lucas.marioni@axont.com', '$2b$10$K6F3Z8aTVcjBZMG.1wXndOqCVo7aMk64YGmI1YgBVjnfE.QsCijgW', NULL),
(5, 'lucas222', NULL, 'lucas.m222arioni@axont.com', '$2b$10$B7.kZtk/.Azliw7CkBHIpeHcv7vgAh4IPJ7U3kwXZ/A3a9ruonH.2', NULL),
(6, 'lucasm', NULL, 'lala@gmail.com', '$2b$10$QrXA54DmMffqwoj8zkXzG.tS81zLqrSAx20BTO1YrOoaP5cb/LN6u', NULL),
(7, 'lucas1234', NULL, 'lucas@axont.com', '$2b$10$xCjP0i6qAdbLBPa7OOzVZOePLqRHfqyeExTuEGU4db/4X5Y7fJSXq', NULL),
(8, 'lucas', NULL, 'lucas3@axont.com', '$2b$10$xnH3M/iAOEp306TysPp6B.Q2CYZQbMLriPkmkp.CIKWTp66iGIcZG', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
