-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2018 at 01:14 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_friends`
--

CREATE TABLE `tb_friends` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `is_friend` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Truncate table before insert `tb_friends`
--

TRUNCATE TABLE `tb_friends`;
-- --------------------------------------------------------

--
-- Table structure for table `tb_message`
--

CREATE TABLE `tb_message` (
  `message_id` bigint(20) NOT NULL,
  `user_own` varchar(15) NOT NULL,
  `user_receive` varchar(15) NOT NULL,
  `content` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Truncate table before insert `tb_message`
--

TRUNCATE TABLE `tb_message`;
--
-- Dumping data for table `tb_message`
--

INSERT INTO `tb_message` (`message_id`, `user_own`, `user_receive`, `content`) VALUES
(1, '01649214266', '0905242897', 'Xin chào!'),
(2, '0905242897', '01649214266', 'Hi'),
(3, '01649214266', '0905242897', 'What you name!'),
(4, '0905242897', '01649214266', 'My name Hi'),
(5, '0905242897', '0905406448', 'Hello'),
(35, '01649214266', '0905242897', 'shas'),
(36, '01649214266', '0905406448', 'alooo'),
(37, '01649214266', '0905242897', '1111'),
(38, '01649214266', '0905406448', '2222'),
(39, '0905242897', '01649214266', 'Hiii'),
(40, '01649214266', '0905242897', 'wwtf'),
(41, '01649214266', '0905406448', 'hihi'),
(42, '01649214266', '0905406448', 'haha'),
(43, '0905242897', '01649214266', 'Hellll'),
(44, '0905242897', '01649214266', 'doe'),
(45, '0905242897', '01649214266', 'hellll'),
(46, '01649214266', '0905242897', 'hi'),
(47, '01649214266', '0905242897', 'wat'),
(48, '0905242897', '01649214266', 'guuuu'),
(49, '0905242897', '01649214266', 'hhhi'),
(50, '0905242897', '01649214266', 'wwwww'),
(51, '01649214266', '0905242897', 'hihi'),
(52, '0905242897', '01649214266', 'what'),
(53, '01649214266', '0905242897', 'wtf'),
(54, '01649214266', '0905242897', 'cais gif'),
(55, '01649214266', '0905242897', 'có gì hông'),
(56, '01649214266', '0905242897', 'hoong có gì'),
(57, '01649214266', '0905242897', 'có online ko'),
(58, '01649214266', '0905242897', 'dcm'),
(59, '01649214266', '0905406448', 'wtf'),
(60, '0905406448', '01649214266', 'haha'),
(61, '0905242897', '01649214266', 'haha'),
(62, '0905242897', '01649214266', 'dfasd'),
(63, '0905242897', '01649214266', 'chi'),
(64, '0905242897', '01649214266', 'helllo'),
(65, '0905242897', '01649214266', 'wtf'),
(66, '01649214266', '0905242897', 'dcm'),
(67, '01649214266', '0905242897', 'helllo'),
(68, '01649214266', '0905242897', 'ukm'),
(69, '01649214266', '0905242897', 'kdjasj'),
(70, '01649214266', '0905242897', 'flaifdn sa'),
(71, '01649214266', '0905242897', 'hello'),
(72, '01649214266', '0905242897', 'allooo '),
(73, '0905242897', '01649214266', 'helllo'),
(74, '0905242897', '01649214266', 'ooooooooooo'),
(75, '0905242897', '01649214266', 'hihi'),
(76, '0905242897', '01649214266', '111111111111111111'),
(77, '0905242897', '01649214266', '3333333'),
(78, '0905242897', '01649214266', '5555555555'),
(79, '0905242897', '01649214266', '5555555555'),
(80, '0905242897', '01649214266', 'whttttttt'),
(81, '0905242897', '01649214266', 'gsd'),
(82, '0905242897', '01649214266', 'fgbfgdsfvdsvdsfvdsdsg'),
(83, '0905242897', '01649214266', 'fzdfvdfv'),
(84, '0905242897', '01649214266', 'aasadf'),
(85, '0905242897', '01649214266', 'kmm '),
(86, '0905242897', '01649214266', 'gzd rgsrg '),
(87, '01649214266', '0905242897', 'wwwwwwwww'),
(88, '0905242897', '01649214266', 'hellllloooooo'),
(89, '01649214266', '0905242897', '70i0894oijvlmv'),
(90, '01649214266', '0905242897', 'alllll'),
(91, '01649214266', '0905242897', 'aloooo'),
(92, '01649214266', '0905242897', 'jfoiajidajisasald'),
(93, '01649214266', '0905242897', 'dakslsdalmsdalkmasdlk'),
(94, '01649214266', '0905242897', 'ddd'),
(95, '01649214266', '0905242897', 'ffff'),
(96, '01649214266', '0905242897', 'hiiii'),
(97, '01649214266', '0905242897', 'sdfasd'),
(98, '01649214266', '0905242897', 'kjnkjnk'),
(99, '01649214266', '0905242897', 'adfasf'),
(100, '01649214266', '0905242897', 'dfasfas'),
(101, '01649214266', '0905242897', 'alllllllllllll'),
(102, '01649214266', '0905242897', 'alslksamlksd'),
(103, '01649214266', '0905242897', 'cos ddos ko'),
(104, '01649214266', '0905242897', 'aloooo'),
(105, '01649214266', '0905242897', 'hihi'),
(106, '01649214266', '0905242897', 'hihi'),
(107, '0905406448', '0905242897', 'co do khong'),
(108, '0905242897', '0905406448', 'cos'),
(109, '0905406448', '0905242897', 'lamf gif do cha'),
(110, '0905406448', '0905242897', 'ranh ko uong cafe'),
(111, '0905242897', '01649214266', 'aloooo'),
(112, '0905242897', '01649214266', 'cai gif vaay'),
(113, '0905242897', '01649214266', 'alooo'),
(114, '0905242897', '01649214266', 'aloooo'),
(115, '0905242897', '01649214266', 'helll'),
(116, '0905242897', '01649214266', 'cia gif vaay'),
(117, '0905242897', '01649214266', 'aloooo'),
(118, '0905242897', '01649214266', 'lamm lon gif do'),
(119, '0905242897', '01649214266', 'helll'),
(120, '01649214266', '0905242897', 'Ngur thooi'),
(121, '0905242897', '01649214266', 'ukm'),
(122, '0905242897', '01649214266', 'lamf lon gi do'),
(123, '0905242897', '01649214266', 'lam cc gi'),
(124, '01649214266', '', 'xong roi nhes'),
(125, '01649214266', '0905242897', 'cai noi if vay'),
(126, '01649214266', '0905242897', 'xong cau status'),
(127, '0905242897', '01649214266', ':)'),
(128, '0905242897', '01649214266', 'allll'),
(129, '0905242897', '01649214266', 'helll'),
(130, '0905242897', '01649214266', 'wwat'),
(131, '0905242897', '01649214266', 'helo'),
(132, '01649214266', '0905242897', 'ranh khong'),
(133, '01649214266', '0905242897', 'khoooooo'),
(134, '01649214266', '0905242897', 'lam meo gif do'),
(135, '01649214266', '0905242897', 'lm meo gi do'),
(136, '0905242897', '01649214266', '????'),
(137, '0905242897', '01649214266', 'nas'),
(138, '0905242897', '01649214266', 'fss'),
(139, '0905242897', '01649214266', 'dfzdf'),
(140, '0905242897', '01649214266', 'dgd'),
(141, '0905242897', '01649214266', 'fdfgdg\nddsdfs\ndsd\n'),
(142, '0905242897', '01649214266', 'fgd'),
(143, '0905242897', '01649214266', 'asvsf\n'),
(144, '0905242897', '01649214266', 'gdvsafsa'),
(145, '0905242897', '01649214266', 'fff'),
(146, '0905242897', '01649214266', 'af'),
(147, '01649214266', '0905406448', 'hi'),
(148, '01649214266', '0905406448', '????????????'),
(149, '01649214266', '0905406448', '????????????????????????'),
(150, '01649214266', '0905406448', '????????????????????????????'),
(151, '0905242897', '01649214266', 'helll');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `user_id` varchar(50) NOT NULL,
  `name` varchar(120) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `is_login` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Truncate table before insert `tb_user`
--

TRUNCATE TABLE `tb_user`;
--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `name`, `status`, `is_login`) VALUES
('01649214266', 'viettel', 1, 1),
('0905242897', 'mobile', 1, 1),
('0905406448', 'mobile', 0, 0),
('12345789098', 'mobiphone', 0, 0),
('abc', 'no name', 1, 0),
('abcd', 'no name', 0, 0),
('ffdf', 'no name', 0, 0),
('T065867_062017_01', 'no name', 0, 0),
('T065867_062017_02', 'no name', 0, 0),
('T065867_062017_03', 'no name', 0, 0),
('trieunb08@gmail.com', 'no name', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_friends`
--
ALTER TABLE `tb_friends`
  ADD PRIMARY KEY (`user_id`,`friend_id`);

--
-- Indexes for table `tb_message`
--
ALTER TABLE `tb_message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_message`
--
ALTER TABLE `tb_message`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
