-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2024 at 09:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emotion_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `context`
--

CREATE TABLE `context` (
  `context_id` int(11) NOT NULL,
  `context_comment` varchar(255) DEFAULT NULL,
  `context_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `context`
--

INSERT INTO `context` (`context_id`, `context_comment`, `context_timestamp`) VALUES
(48, 'Overall today was a day and tomorrow will be another', '2024-01-09 22:51:09'),
(56, 'new comment added....', '2024-01-09 22:30:46'),
(57, '', '2024-01-08 23:46:53'),
(58, '', '2024-01-08 23:46:58'),
(59, 'new comment', '2024-01-09 01:18:46'),
(60, 'updates', '2024-01-14 23:23:02'),
(61, 'updated', '2024-01-14 23:22:43'),
(64, 'time test', '2024-01-10 23:58:04'),
(65, 'edit test', '2024-01-10 23:26:43'),
(88, 'update', '2024-01-14 02:38:55'),
(89, '', '2024-01-14 02:39:02'),
(90, 'comment', '2024-01-14 23:23:20'),
(91, '', '2024-01-14 23:24:00'),
(95, 'new', '2024-01-15 01:19:56'),
(97, 'new', '2024-01-15 01:22:13');

-- --------------------------------------------------------

--
-- Table structure for table `context_context_type`
--

CREATE TABLE `context_context_type` (
  `context_context_type_id` int(11) NOT NULL,
  `context_id` int(11) NOT NULL,
  `context_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `context_context_type`
--

INSERT INTO `context_context_type` (`context_context_type_id`, `context_id`, `context_type_id`) VALUES
(137, 48, 1),
(138, 48, 3),
(139, 48, 6),
(148, 65, 1),
(149, 65, 2),
(181, 88, 3),
(182, 88, 4),
(183, 89, 1),
(184, 89, 2),
(185, 61, 1),
(186, 61, 2),
(187, 61, 4),
(188, 61, 5),
(189, 60, 5),
(190, 60, 6),
(191, 90, 1),
(192, 90, 2),
(193, 91, 3);

-- --------------------------------------------------------

--
-- Table structure for table `context_type`
--

CREATE TABLE `context_type` (
  `context_type_id` int(11) NOT NULL,
  `context_type_name` varchar(255) NOT NULL,
  `context_icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `context_type`
--

INSERT INTO `context_type` (`context_type_id`, `context_type_name`, `context_icon`) VALUES
(1, 'Romance', 'bi-chat-heart'),
(2, 'Family', 'bi-diagram-3'),
(3, 'Work', 'bi-briefcase'),
(4, 'Holiday', 'bi-luggage'),
(5, 'Lonely', 'bi-person'),
(6, 'Exercise', 'bi-heart-pulse'),
(7, 'Friends', 'bi-people'),
(8, 'Shopping', 'bi-cart4');

-- --------------------------------------------------------

--
-- Table structure for table `emotion`
--

CREATE TABLE `emotion` (
  `emotion_id` int(11) NOT NULL,
  `emotion_name` varchar(255) NOT NULL,
  `emotion_colour` varchar(255) NOT NULL,
  `emotion_icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emotion`
--

INSERT INTO `emotion` (`emotion_id`, `emotion_name`, `emotion_colour`, `emotion_icon`) VALUES
(1, 'enjoyment', '#8bc53f', 'bi-emoji-grin'),
(2, 'sadness', '#00a3e2', 'bi-emoji-tear'),
(3, 'anger', '#Eb0008', 'bi-emoji-angry'),
(4, 'contempt', '#eb008b', 'bi-emoji-expressionless'),
(5, 'disgust', '#734c9d', 'bi-emoji-astonished'),
(6, 'fear', '#f27121', 'bi-emoji-grimace'),
(7, 'surprise', '#ffd000', 'bi-emoji-surprise');

-- --------------------------------------------------------

--
-- Table structure for table `mood`
--

CREATE TABLE `mood` (
  `mood_id` int(11) NOT NULL,
  `mood_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  `context_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mood`
--

INSERT INTO `mood` (`mood_id`, `mood_timestamp`, `user_id`, `context_id`) VALUES
(37, '2024-01-08 21:44:56', 33, 48),
(45, '2024-01-08 23:46:49', 33, 56),
(46, '2024-01-08 23:46:53', 33, 57),
(47, '2024-01-08 23:46:58', 33, 58),
(48, '2024-01-09 00:57:04', 33, 59),
(49, '2024-01-09 22:50:18', 33, 60),
(50, '2024-01-09 22:50:28', 33, 61),
(53, '2024-01-09 19:14:00', 33, 64),
(54, '0000-00-00 00:00:00', 33, 65),
(74, '2024-01-14 02:03:00', 47, 88),
(75, '2024-01-14 02:38:00', 47, 89),
(76, '2024-01-14 23:23:00', 33, 90),
(77, '2024-01-13 13:23:00', 33, 91),
(78, '2024-01-15 01:19:00', 33, 95),
(80, '2024-01-15 01:22:00', 49, 97);

-- --------------------------------------------------------

--
-- Table structure for table `mood_emotion`
--

CREATE TABLE `mood_emotion` (
  `mood_emotion_id` int(11) NOT NULL,
  `emotion_level` int(2) NOT NULL,
  `mood_id` int(11) NOT NULL,
  `emotion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mood_emotion`
--

INSERT INTO `mood_emotion` (`mood_emotion_id`, `emotion_level`, `mood_id`, `emotion_id`) VALUES
(246, 2, 37, 1),
(247, 6, 37, 2),
(248, 0, 37, 3),
(249, 5, 37, 4),
(250, 4, 37, 5),
(251, 9, 37, 6),
(252, 5, 37, 7),
(302, 5, 45, 1),
(303, 5, 45, 2),
(304, 5, 45, 3),
(305, 5, 45, 4),
(306, 5, 45, 5),
(307, 5, 45, 6),
(308, 5, 45, 7),
(309, 5, 46, 1),
(310, 5, 46, 2),
(311, 5, 46, 3),
(312, 5, 46, 4),
(313, 5, 46, 5),
(314, 5, 46, 6),
(315, 5, 46, 7),
(316, 5, 47, 1),
(317, 5, 47, 2),
(318, 5, 47, 3),
(319, 5, 47, 4),
(320, 5, 47, 5),
(321, 5, 47, 6),
(322, 5, 47, 7),
(323, 5, 48, 1),
(324, 5, 48, 2),
(325, 5, 48, 3),
(326, 5, 48, 4),
(327, 5, 48, 5),
(328, 5, 48, 6),
(329, 5, 48, 7),
(330, 5, 49, 1),
(331, 5, 49, 2),
(332, 5, 49, 3),
(333, 5, 49, 4),
(334, 5, 49, 5),
(335, 5, 49, 6),
(336, 5, 49, 7),
(337, 5, 50, 1),
(338, 5, 50, 2),
(339, 5, 50, 3),
(340, 5, 50, 4),
(341, 5, 50, 5),
(342, 5, 50, 6),
(343, 5, 50, 7),
(353, 5, 53, 1),
(354, 5, 53, 2),
(355, 5, 53, 3),
(356, 5, 53, 4),
(357, 5, 53, 5),
(358, 5, 53, 6),
(359, 5, 53, 7),
(360, 5, 54, 1),
(361, 5, 54, 2),
(362, 5, 54, 3),
(363, 5, 54, 4),
(364, 5, 54, 5),
(365, 5, 54, 6),
(366, 5, 54, 7),
(506, 5, 74, 1),
(507, 5, 74, 2),
(508, 5, 74, 3),
(509, 5, 74, 4),
(510, 5, 74, 5),
(511, 5, 74, 6),
(512, 5, 74, 7),
(513, 5, 75, 1),
(514, 5, 75, 2),
(515, 5, 75, 3),
(516, 5, 75, 4),
(517, 5, 75, 5),
(518, 5, 75, 6),
(519, 5, 75, 7),
(520, 3, 76, 1),
(521, 2, 76, 2),
(522, 8, 76, 3),
(523, 2, 76, 4),
(524, 3, 76, 5),
(525, 9, 76, 6),
(526, 2, 76, 7),
(527, 2, 77, 1),
(528, 9, 77, 2),
(529, 9, 77, 3),
(530, 9, 77, 4),
(531, 9, 77, 5),
(532, 9, 77, 6),
(533, 2, 77, 7),
(540, 5, 78, 1),
(541, 5, 78, 2),
(542, 5, 78, 3),
(543, 5, 78, 4),
(544, 5, 78, 5),
(545, 5, 78, 6),
(546, 5, 78, 7),
(554, 5, 80, 1),
(555, 5, 80, 2),
(556, 5, 80, 3),
(557, 5, 80, 4),
(558, 5, 80, 5),
(559, 5, 80, 6),
(560, 5, 80, 7);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varbinary(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES
(31, 'jsproule899', 'jsproule899@live.co.uk', 0x2432622431302447626a724e6c472e38576b766375367a6935334b5a2e775448714a704d57446149773157706947316c555363543361614238642e36),
(33, 'jsproule72', 'jsproule72@live.co.uk', 0x2432622431302436394e41617a414c434c565848336531705531673775356d5338484332526b41767566617033547777504a765a7253517a67412e4b),
(34, 'jsproule899', 'jsproule@live.co.uk', 0x2432622431302455747a7a74353139504b4865733673616d2f5244432e495142694e78324572463031414b526a4f305535597850344c6f696730394f),
(47, 'jsproule899', 'joshsproule@live.co.uk', 0x2432622431302437754c357159395a5750645155706768387756666c754d69697446646e46306b714839666a5154336e4739734566306f6254553747),
(49, 'jsproule899', 'jsproule05@qub.ac.uk', 0x24326224313024307773735974423753514b58577a4f4153787142692e7a31767a79322f364b4a45666c79756779554c2e3543637059306c7563634b);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `context`
--
ALTER TABLE `context`
  ADD PRIMARY KEY (`context_id`);

--
-- Indexes for table `context_context_type`
--
ALTER TABLE `context_context_type`
  ADD PRIMARY KEY (`context_context_type_id`),
  ADD KEY `FK_context_id_context_type` (`context_id`),
  ADD KEY `FK_context_type_id_context` (`context_type_id`);

--
-- Indexes for table `context_type`
--
ALTER TABLE `context_type`
  ADD PRIMARY KEY (`context_type_id`);

--
-- Indexes for table `emotion`
--
ALTER TABLE `emotion`
  ADD PRIMARY KEY (`emotion_id`);

--
-- Indexes for table `mood`
--
ALTER TABLE `mood`
  ADD PRIMARY KEY (`mood_id`),
  ADD KEY `FK_user_user_id_mood` (`user_id`),
  ADD KEY `FK_context_context_id_mood` (`context_id`);

--
-- Indexes for table `mood_emotion`
--
ALTER TABLE `mood_emotion`
  ADD PRIMARY KEY (`mood_emotion_id`),
  ADD KEY `FK_mood_mood_id` (`mood_id`),
  ADD KEY `FK_emotion_emotion_id` (`emotion_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `context`
--
ALTER TABLE `context`
  MODIFY `context_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `context_context_type`
--
ALTER TABLE `context_context_type`
  MODIFY `context_context_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT for table `context_type`
--
ALTER TABLE `context_type`
  MODIFY `context_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `emotion`
--
ALTER TABLE `emotion`
  MODIFY `emotion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mood`
--
ALTER TABLE `mood`
  MODIFY `mood_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `mood_emotion`
--
ALTER TABLE `mood_emotion`
  MODIFY `mood_emotion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=561;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `context_context_type`
--
ALTER TABLE `context_context_type`
  ADD CONSTRAINT `FK_context_id_context_type` FOREIGN KEY (`context_id`) REFERENCES `context` (`context_id`),
  ADD CONSTRAINT `FK_context_type_id_context` FOREIGN KEY (`context_type_id`) REFERENCES `context_type` (`context_type_id`);

--
-- Constraints for table `mood`
--
ALTER TABLE `mood`
  ADD CONSTRAINT `FK_context_context_id_mood` FOREIGN KEY (`context_id`) REFERENCES `context` (`context_id`),
  ADD CONSTRAINT `FK_user_user_id_mood` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `mood_emotion`
--
ALTER TABLE `mood_emotion`
  ADD CONSTRAINT `FK_emotion_emotion_id` FOREIGN KEY (`emotion_id`) REFERENCES `emotion` (`emotion_id`),
  ADD CONSTRAINT `FK_mood_mood_id` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`mood_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
