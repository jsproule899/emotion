-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2024 at 01:21 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `context`
--

INSERT INTO `context` (`context_id`, `context_comment`, `context_timestamp`) VALUES
(48, 'Overall today was a day and tomorrow will be another', '2024-01-09 22:51:09'),
(57, '', '2024-01-08 23:46:53'),
(58, '', '2024-01-08 23:46:58'),
(59, 'new comment', '2024-01-09 01:18:46'),
(60, 'updates', '2024-01-14 23:23:02'),
(61, 'updated', '2024-01-14 23:22:43'),
(64, 'time test', '2024-01-10 23:58:04'),
(90, 'comment', '2024-01-14 23:23:20'),
(91, '', '2024-01-14 23:24:00'),
(95, 'new', '2024-02-02 01:42:23'),
(99, '', '2024-01-24 02:15:57'),
(100, '', '2024-02-06 02:23:57'),
(106, '', '2024-02-06 02:24:01'),
(108, '', '2024-02-06 02:24:03'),
(109, '', '2024-02-06 02:24:06'),
(114, '', '2024-01-28 01:40:27'),
(115, '', '2024-01-28 01:49:54'),
(119, '', '2024-02-06 02:24:09'),
(120, '', '2024-02-06 02:10:26'),
(121, '', '2024-02-05 23:47:38'),
(122, '', '2024-02-06 02:21:32'),
(123, '', '2024-02-06 02:25:09'),
(124, '', '2024-02-06 02:25:18'),
(129, '', '2024-02-20 02:48:24'),
(130, '', '2024-02-21 21:31:36'),
(131, '', '2024-02-22 01:23:26'),
(132, '', '2024-02-22 02:31:50'),
(133, '', '2024-02-22 02:33:00'),
(136, 'Test mood 1', '2024-03-03 00:03:47'),
(137, 'Test mood 2', '2024-03-03 00:04:25'),
(139, 'Test mood 7', '2024-03-03 00:06:45'),
(140, 'Test mood 3', '2024-03-03 00:07:53'),
(141, 'Test mood 4', '2024-03-03 00:08:46');

-- --------------------------------------------------------

--
-- Table structure for table `context_context_type`
--

CREATE TABLE `context_context_type` (
  `context_context_type_id` int(11) NOT NULL,
  `context_id` int(11) NOT NULL,
  `context_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `context_context_type`
--

INSERT INTO `context_context_type` (`context_context_type_id`, `context_id`, `context_type_id`) VALUES
(137, 48, 1),
(138, 48, 3),
(139, 48, 6),
(185, 61, 1),
(186, 61, 2),
(187, 61, 4),
(188, 61, 5),
(189, 60, 5),
(190, 60, 6),
(191, 90, 1),
(192, 90, 2),
(193, 91, 3),
(209, 99, 1),
(210, 99, 2),
(211, 99, 3),
(212, 99, 6),
(213, 99, 7),
(227, 115, 7),
(265, 95, 3),
(267, 121, 2),
(268, 121, 3),
(269, 120, 2),
(270, 120, 4),
(271, 122, 7),
(272, 123, 1),
(277, 136, 3),
(278, 136, 5),
(279, 137, 2),
(280, 137, 3),
(284, 139, 2),
(285, 139, 6),
(286, 140, 3),
(287, 140, 5),
(290, 141, 3),
(291, 141, 8);

-- --------------------------------------------------------

--
-- Table structure for table `context_type`
--

CREATE TABLE `context_type` (
  `context_type_id` int(11) NOT NULL,
  `context_type_name` varchar(255) NOT NULL,
  `context_icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `emotion`
--

INSERT INTO `emotion` (`emotion_id`, `emotion_name`, `emotion_colour`, `emotion_icon`) VALUES
(1, 'enjoyment', 'MediumSeaGreen', 'bi-emoji-grin'),
(2, 'sadness', 'CornflowerBlue', 'bi-emoji-tear'),
(3, 'anger', 'Indianred', 'bi-emoji-angry'),
(4, 'contempt', 'LightPink', 'bi-emoji-expressionless'),
(5, 'disgust', 'MediumPurple', 'bi-emoji-astonished'),
(6, 'fear', 'Chocolate', 'bi-emoji-grimace'),
(7, 'surprise', 'Goldenrod', 'bi-emoji-surprise');

-- --------------------------------------------------------

--
-- Table structure for table `mood`
--

CREATE TABLE `mood` (
  `mood_id` int(11) NOT NULL,
  `mood_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  `context_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mood`
--

INSERT INTO `mood` (`mood_id`, `mood_timestamp`, `user_id`, `context_id`) VALUES
(37, '2024-01-08 21:44:56', 33, 48),
(46, '2024-01-08 23:46:53', 33, 57),
(47, '2024-01-08 23:46:58', 33, 58),
(48, '2024-01-09 00:57:04', 33, 59),
(49, '2024-01-09 22:50:18', 33, 60),
(50, '2024-01-09 22:50:28', 33, 61),
(53, '2024-01-09 19:14:00', 33, 64),
(76, '2024-01-14 23:23:00', 33, 90),
(77, '2024-01-13 13:23:00', 33, 91),
(78, '2024-01-15 01:19:00', 33, 95),
(82, '2024-01-16 21:12:00', 33, 99),
(83, '2024-01-16 22:15:00', 33, 100),
(89, '2024-01-25 03:31:00', 33, 106),
(91, '2024-01-27 22:21:00', 33, 108),
(92, '2024-01-27 22:21:00', 33, 109),
(96, '2024-01-28 01:40:00', 47, 114),
(97, '2024-01-28 01:49:00', 47, 115),
(101, '2024-01-31 02:11:55', 33, 119),
(102, '2024-02-02 01:48:00', 33, 120),
(103, '2024-02-05 23:46:00', 47, 121),
(104, '2024-02-06 02:21:00', 33, 122),
(105, '2024-02-06 02:25:00', 33, 123),
(106, '2024-02-06 02:25:00', 33, 124),
(111, '2024-02-20 02:48:00', 33, 129),
(112, '2024-02-21 21:31:00', 33, 130),
(113, '2024-02-22 01:23:00', 33, 131),
(114, '2023-12-22 02:31:00', 33, 132),
(115, '2023-12-21 02:32:00', 33, 133),
(118, '2024-02-25 00:03:00', 52, 136),
(119, '2024-02-26 00:03:00', 52, 137),
(121, '2024-03-03 00:05:00', 52, 139),
(122, '2024-02-27 00:07:00', 52, 140),
(123, '2024-02-28 00:08:00', 52, 141);

-- --------------------------------------------------------

--
-- Table structure for table `mood_emotion`
--

CREATE TABLE `mood_emotion` (
  `mood_emotion_id` int(11) NOT NULL,
  `emotion_level` int(2) NOT NULL,
  `mood_id` int(11) NOT NULL,
  `emotion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(568, 8, 82, 1),
(569, 5, 82, 2),
(570, 5, 82, 3),
(571, 5, 82, 4),
(572, 5, 82, 5),
(573, 5, 82, 6),
(574, 5, 82, 7),
(575, 8, 83, 1),
(576, 1, 83, 2),
(577, 1, 83, 3),
(578, 1, 83, 4),
(579, 1, 83, 5),
(580, 4, 83, 6),
(581, 3, 83, 7),
(617, 5, 89, 1),
(618, 5, 89, 2),
(619, 5, 89, 3),
(620, 5, 89, 4),
(621, 5, 89, 5),
(622, 5, 89, 6),
(623, 5, 89, 7),
(631, 5, 91, 1),
(632, 5, 91, 2),
(633, 5, 91, 3),
(634, 5, 91, 4),
(635, 5, 91, 5),
(636, 5, 91, 6),
(637, 5, 91, 7),
(638, 10, 92, 1),
(639, 5, 92, 2),
(640, 5, 92, 3),
(641, 5, 92, 4),
(642, 5, 92, 5),
(643, 5, 92, 6),
(644, 5, 92, 7),
(666, 5, 96, 1),
(667, 5, 96, 2),
(668, 5, 96, 3),
(669, 5, 96, 4),
(670, 5, 96, 5),
(671, 5, 96, 6),
(672, 5, 96, 7),
(673, 5, 97, 1),
(674, 5, 97, 2),
(675, 5, 97, 3),
(676, 5, 97, 4),
(677, 5, 97, 5),
(678, 5, 97, 6),
(679, 5, 97, 7),
(700, 7, 101, 1),
(701, 10, 101, 2),
(702, 5, 101, 3),
(703, 6, 101, 4),
(704, 2, 101, 5),
(705, 7, 101, 6),
(706, 5, 101, 7),
(707, 5, 102, 1),
(708, 5, 102, 2),
(709, 5, 102, 3),
(710, 5, 102, 4),
(711, 5, 102, 5),
(712, 5, 102, 6),
(713, 5, 102, 7),
(714, 10, 103, 1),
(715, 5, 103, 2),
(716, 5, 103, 3),
(717, 5, 103, 4),
(718, 5, 103, 5),
(719, 5, 103, 6),
(720, 5, 103, 7),
(721, 5, 104, 1),
(722, 5, 104, 2),
(723, 5, 104, 3),
(724, 5, 104, 4),
(725, 5, 104, 5),
(726, 5, 104, 6),
(727, 5, 104, 7),
(728, 5, 105, 1),
(729, 5, 105, 2),
(730, 9, 105, 3),
(731, 5, 105, 4),
(732, 5, 105, 5),
(733, 5, 105, 6),
(734, 5, 105, 7),
(735, 5, 106, 1),
(736, 5, 106, 2),
(737, 5, 106, 3),
(738, 5, 106, 4),
(739, 5, 106, 5),
(740, 9, 106, 6),
(741, 5, 106, 7),
(770, 9, 111, 1),
(771, 1, 111, 2),
(772, 1, 111, 3),
(773, 1, 111, 4),
(774, 2, 111, 5),
(775, 1, 111, 6),
(776, 8, 111, 7),
(777, 1, 112, 1),
(778, 8, 112, 2),
(779, 7, 112, 3),
(780, 7, 112, 4),
(781, 9, 112, 5),
(782, 7, 112, 6),
(783, 2, 112, 7),
(784, 5, 113, 1),
(785, 5, 113, 2),
(786, 5, 113, 3),
(787, 5, 113, 4),
(788, 5, 113, 5),
(789, 5, 113, 6),
(790, 5, 113, 7),
(791, 5, 114, 1),
(792, 5, 114, 2),
(793, 5, 114, 3),
(794, 5, 114, 4),
(795, 5, 114, 5),
(796, 5, 114, 6),
(797, 5, 114, 7),
(798, 5, 115, 1),
(799, 5, 115, 2),
(800, 5, 115, 3),
(801, 5, 115, 4),
(802, 5, 115, 5),
(803, 5, 115, 6),
(804, 5, 115, 7),
(819, 3, 118, 1),
(820, 8, 118, 2),
(821, 10, 118, 3),
(822, 6, 118, 4),
(823, 1, 118, 5),
(824, 7, 118, 6),
(825, 1, 118, 7),
(826, 2, 119, 1),
(827, 9, 119, 2),
(828, 9, 119, 3),
(829, 9, 119, 4),
(830, 2, 119, 5),
(831, 7, 119, 6),
(832, 2, 119, 7),
(840, 9, 121, 1),
(841, 2, 121, 2),
(842, 0, 121, 3),
(843, 0, 121, 4),
(844, 0, 121, 5),
(845, 8, 121, 6),
(846, 5, 121, 7),
(847, 1, 122, 1),
(848, 9, 122, 2),
(849, 9, 122, 3),
(850, 7, 122, 4),
(851, 10, 122, 5),
(852, 7, 122, 6),
(853, 1, 122, 7),
(854, 6, 123, 1),
(855, 4, 123, 2),
(856, 7, 123, 3),
(857, 4, 123, 4),
(858, 7, 123, 5),
(859, 2, 123, 6),
(860, 9, 123, 7);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varbinary(255) NOT NULL,
  `reset_token` varbinary(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `reset_token`) VALUES
(31, 'jsproule899', 'jsproule899@live.co.uk', 0x2432622431302447626a724e6c472e38576b766375367a6935334b5a2e775448714a704d57446149773157706947316c555363543361614238642e36, NULL),
(33, 'jsproule72', 'jsproule72@live.co.uk', 0x2432622431302436394e41617a414c434c565848336531705531673775356d5338484332526b41767566617033547777504a765a7253517a67412e4b, NULL),
(34, 'jsproule899', 'jsproule@live.co.uk', 0x2432622431302455747a7a74353139504b4865733673616d2f5244432e495142694e78324572463031414b526a4f305535597850344c6f696730394f, NULL),
(47, 'jsproule899', 'joshsproule@live.co.uk', 0x24326224313024742f677971413638697a31515a52616b71306f6b612e6372485649556c665137774a7635666c6c585a31304d45553368366755316d, NULL),
(49, 'jsproule899', 'jsproule05@qub.ac.uk', 0x24326224313024307773735974423753514b58577a4f4153787142692e7a31767a79322f364b4a45666c79756779554c2e3543637059306c7563634b, NULL),
(51, 'jsproule899', 'joshsproule1@live.co.uk', 0x2432622431302475584567786a566b2e453759315270626c4233576f4f64492f387164465565704f61393531746770534f425750695653576d715175, NULL),
(52, 'testuser', 'testuser@test.com', 0x243262243130244b735479384c703671794671326e2e56554a4541472e4c65462e516649725a7646473873505879386e68636b2f4b36694230344f32, NULL);

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
  MODIFY `context_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `context_context_type`
--
ALTER TABLE `context_context_type`
  MODIFY `context_context_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

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
  MODIFY `mood_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `mood_emotion`
--
ALTER TABLE `mood_emotion`
  MODIFY `mood_emotion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=861;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

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
