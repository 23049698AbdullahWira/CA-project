-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 04:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abdullahwira_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `pages` int(11) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `readLink` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `author`, `pages`, `cover`, `readLink`) VALUES
(1, 'Horus Rising', 'The Emperor’s favored son, Horus, is given command of the Imperial military expedition to expand the empire. As Horus rises to power, seeds of treachery are sown.', 'Dan Abnett', 416, '/images/81Q-cK3hDmL._AC_UF1000,1000_QL80_.jpg', '/pdfs/horus-rising.pdf'),
(2, 'False Gods', 'Horus is wounded in battle and is taken to a temple where dark forces begin to corrupt him, leading him to question his loyalty to the Emperor.', 'Graham Mcneill', 416, '/images/51l-Vd66qXL._AC_UF1000,1000_QL80_.jpg', '/pdfs/false-gods.pdf'),
(3, 'Galaxy in Flames', 'Horus openly declares his rebellion against the Emperor, resulting in the catastrophic battle on the planet Isstvan III.', 'Ben Counter', 416, '/images/71iRuxKH8oL._AC_UF1000,1000_QL80_.jpg', '/pdfs/1562643624921.pdf'),
(5, 'Flight of the Eisentein', 'Having witnessed the terrible massacre of Imperial forces on Isstvan III, Death Guard Captain Garro seizes a ship and sets a course for Terra to warn the Emperor of Horus\'s treachery. But when the fleeing Eisenstein is damaged by enemy fire, it becomes stranded in the warp - the realm of the Dark Powers. Can Garro and his men survive the depredations of Chaos and get his warning to the Emperor before Horus\'s plans reach fruition?', 'James Swallow', 399, '/uploads/1721303200778.jpg', '/pdfs/1721303200754.pdf'),
(6, 'Fulgrim', 'Under the command of the newly appointed Warmaster Horus, the Great Crusade continues. Fulgrim, Primarch of the Emperor’s Children, leads his warriors into battle against a vile alien foe, unaware of the darker forces that have already set their sights upon the Imperium of Man. Loyalties are tested, and every murderous whim indulged as the Emperor’s Children take their first steps down the road to true corruption – a road that will ultimately lead them to the killing fields of Isstvan V', 'Graham Mcneill', 490, '/uploads/1721303300388.jpg', '/pdfs/1721303300358.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'test', '1234'),
(2, 'test2', '1234'),
(3, 'test3', '1234'),
(4, 'test4', '1234'),
(5, 'test5', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
