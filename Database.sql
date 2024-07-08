-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2024 at 07:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin2000@gmail.com', '1234567');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `Name`) VALUES
(1, 'IT'),
(2, 'HR'),
(3, 'Design'),
(4, 'Design2'),
(9, 'Consultancy');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(140) NOT NULL,
  `address` varchar(100) NOT NULL,
  `salary` int(30) NOT NULL,
  `department_id` int(11) NOT NULL,
  `image` varchar(60) NOT NULL,
  `punched_in` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `fname`, `lname`, `email`, `password`, `address`, `salary`, `department_id`, `image`, `punched_in`) VALUES
(16, 'DEEKSHITH', 'Y K', 'deekshithyk86@gmail.com', '$2b$10$4d96uFiAmhwIAnyL4A3PmOPnZAFoi22Cbwho0lRnM8mtUHuHCcPMy', 'Deekshith Y K s/o Krishnamurthy Y K,beside Margada mahadevappa high school ,lingadahalli road,chilka', 8000000, 1, 'imageFile_1719403023986.jpeg', NULL),
(17, 'MITHUN', 'H K', 'mithunhk86@gmail.com', '$2b$10$BahE1e6mJQH8QDn15pkTvOrGU6HIaDgs3utVI6kBNdI3.La/NxSSC', 'Kumar H M,Halehonnapura,Hosahalli Post,Shivamogga', 1000000, 9, 'imageFile_1719403073391.jpg', NULL),
(19, 'Nischin ', 'Sagar', 'nischinsagar@gmail.com', '$2b$10$rfRQ7A.D5KmupRsDJ6bRJ.wUOR8t4UKqdTwVf5j6p6w2rgdF.h8iW', 'Prakash Building,isro Layout,harohalli,Govindapura.', 600000, 2, 'imageFile_1719414421936.jpg', NULL),
(23, 'Preetham', 'Y K', 'preethamyk7@gmail.com', '$2b$10$DpfS5Ri5y2cnbrH0kc1Ea.NdPoL6keA.2r39y7BlOCBCtt/X5tijm', 'ward no.23,Lingadahalli road,Birur,Chikkamagalu-577116', 1000000, 1, 'imageFile_1719655212007.jpeg', 0),
(24, 'Chethan', 'Arekal', 'chethanap@gmail.com', '$2b$10$cFvMmd33v61wmPqc.7mTBOzK9F.0EvmbinWiYTEdFB1rzfswHXZ0.', 'shimoga', 750000, 3, 'imageFile_1720209505620.jpg', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
