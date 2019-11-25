-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2019 at 10:53 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `players`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `User_ID` int(15) NOT NULL,
  `Username` varchar(10) NOT NULL,
  `Password` varchar(1000) NOT NULL,
  `Current_Score` int(11) NOT NULL,
  `Highest_Score` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`User_ID`, `Username`, `Password`, `Current_Score`, `Highest_Score`, `timestamp`) VALUES
(60, 'test1', '0ea5770dd3dd31c8e054a348538a0b69', 3, 3, '2019-11-25 08:48:11'),
(61, 'ddd', 'c9f7aea2f1e80789e5a0d32658cc51dc', 3, 3, '2019-11-25 08:31:51'),
(62, 'ss', '129b5190d20b0cd1bb28dd82ec82a75d', 1, 1, '2019-11-25 08:33:26'),
(63, 'cccccc', '47c26bf311194597ecc3f969fb41fe5a', 0, 0, '2019-11-25 08:34:55'),
(64, 'vv', '97c2b066584894cfa1df2526c57a8a2e', 0, 0, '2019-11-25 08:35:41'),
(65, 'xasxs', '4fd435d43705fab4be954771ad5e14a1', 0, 0, '2019-11-25 08:36:15'),
(66, 'asas', '129b5190d20b0cd1bb28dd82ec82a75d', 0, 0, '2019-11-25 08:39:14'),
(67, 'aassddd', 'a0137ffdb21546425dd26d4cd5d57a74', 0, 0, '2019-11-25 08:41:17'),
(68, 'ssszasaz', '47c26bf311194597ecc3f969fb41fe5a', 0, 0, '2019-11-25 08:44:26'),
(69, 'nnn', 'f6e9f83bece7f752a4024ec67866ce53', 0, 0, '2019-11-25 08:50:28'),
(70, 'hel', 'f0aa63e2ea73568324778c6dc25476af', 7, 7, '2019-11-25 08:52:04'),
(71, 'test22', '164e897be3bd4e6907ce921bd7d4ecab', 8, 8, '2019-11-25 09:26:41'),
(72, 'test23', '93153444962af669d299e142a981ab1e', 5, 5, '2019-11-25 09:25:58'),
(73, 'tttl', 'f85a3661a7df9c3b468c1d5028db7370', 1, 1, '2019-11-25 09:28:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `User_ID` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
