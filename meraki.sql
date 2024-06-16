-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-06-16 09:06:04
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `meraki`
--

-- --------------------------------------------------------

--
-- 資料表結構 `ad`
--

CREATE TABLE `ad` (
  `adId` int(11) NOT NULL,
  `adURL` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ad`
--

INSERT INTO `ad` (`adId`, `adURL`) VALUES
(1, 'https://upcdn.io/W142iek/raw/ad/0001.png'),
(2, 'https://upcdn.io/W142iek/raw/ad/0002.png'),
(3, 'https://upcdn.io/W142iek/raw/ad/0003.png'),
(4, 'https://upcdn.io/W142iek/raw/ad/0004.png'),
(5, 'https://upcdn.io/W142iek/raw/ad/0005.png'),
(6, 'https://upcdn.io/W142iek/raw/ad/0006.png'),
(7, 'https://upcdn.io/W142iek/raw/ad/0007.png'),
(8, 'https://upcdn.io/W142iek/raw/ad/0008.png');

-- --------------------------------------------------------

--
-- 資料表結構 `author`
--

CREATE TABLE `author` (
  `authorId` int(11) NOT NULL,
  `authorName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `author`
--

INSERT INTO `author` (`authorId`, `authorName`) VALUES
(1, '陳薇安'),
(2, '龔郁婷'),
(3, '龔郁雯');

-- --------------------------------------------------------

--
-- 資料表結構 `book`
--

CREATE TABLE `book` (
  `bookId` int(11) NOT NULL,
  `bookName` text NOT NULL,
  `bookCategory` text NOT NULL,
  `bookAuthor` text NOT NULL,
  `bookCoverURL` text NOT NULL,
  `bookState` text NOT NULL,
  `bookPublish` date NOT NULL,
  `bookTag` text NOT NULL,
  `bookTotalpage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `book`
--

INSERT INTO `book` (`bookId`, `bookName`, `bookCategory`, `bookAuthor`, `bookCoverURL`, `bookState`, `bookPublish`, `bookTag`, `bookTotalpage`) VALUES
(1, '絲念', '古典文學', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000001.png', 'choice', '2024-06-02', '感人,詩經,經典,綠衣,思念', 6),
(2, '我已經長大了', '古典文學', '圖/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000002.png', 'no', '2024-05-29', '成長,洗衣,詩經,經典,葛覃', 2),
(3, 'BZ 鎮的雙色湖', '科普知識', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000003.png', 'choice', '2024-05-22', '化學,奇幻,BZ反應', 2),
(4, '五彩繽紛的願望', '科普知識', '圖/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000004.png', 'choice', '2024-06-03', '流星,許願,感人,溫馨', 2),
(5, '佳人素描', '古典文學', '圖：龔郁婷/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000005.png', 'no', '2024-06-07', '詩經,經典,美女,碩人', 2),
(6, '誰有綠眼睛？', '數學邏輯', '圖/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000006.png', 'no', '2024-05-23', '賽局理論,藍眼睛,綠眼睛,國王', 2),
(7, '盲人「看」顏色', '數學邏輯', '圖：龔郁雯/文 ：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000007.png', 'no', '2024-05-22', '賽局理論,死刑,機智', 2),
(8, 'What color is your hat?', '數學邏輯', '圖/文：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000008.png', 'no', '2024-06-09', '賽局理論,外星人,機智', 2),
(9, '天長地久的約定', '古典文學', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000009.png', 'no', '2024-05-25', '感人,白居易,楊貴妃,唐玄宗,長恨歌,樂府,愛情', 2),
(10, '容易受人影響的白絲', '古典文學', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000010.png', 'no', '2024-05-28', '墨子,悲素絲,所染', 2),
(11, '雨中燈下', '古典文學', '圖：龔郁雯/文 ：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000011.png', 'no', '2024-06-10', '唐詩,司空曙,喜外弟盧綸見宿,五言律詩,兄弟', 2),
(12, '愛穿紫色衣服的皇帝', '古典文學', '圖/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000012.png', 'reward', '2024-06-11', '韓非子,齊桓公,上行下效', 2),
(13, '西湖主', '古典文學', '圖：龔郁雯/文 ：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000013.png', 'no', '2024-05-23', '聊齋誌異,豬龍,紅巾,愛情,鬼怪', 2),
(14, '我所知道的家園', '童話故事', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000014.png', 'no', '2024-05-31', '環保,地球,愛', 2),
(15, '石頭的輪迴', '童話故事', '圖：龔郁雯/文 ：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000015.png', 'no', '2024-06-11', '哲學,搬運作用,山,河', 2),
(16, 'Happy Ever After', '童話故事', '圖：龔郁婷/文：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000016.png', 'no', '2024-05-28', '王子,公主,國王,皇后,愛情', 2),
(17, '笑一個', '童話故事', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000017.png', 'no', '2024-06-01', '蛋糕,貓,貓頭鷹,友誼', 2),
(18, '藍色小精靈', '童話故事', '圖：龔郁雯/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000018.png', 'no', '2024-05-29', '奇幻,冒險,可愛,搞笑', 2),
(19, 'How to Color', '色彩原理', '圖/文：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000019.png', 'choice', '2024-06-02', '上色,色階,色溫,DIY', 5),
(20, '遨遊色碼宇宙', '色彩原理', '圖/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000020.png', 'reward', '2024-05-20', '色碼,HEX,CMYK,RGB,外星人,太空人,星球', 2),
(21, '想嘗一口嗎？', '烹飪教室', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000021.png', 'no', '2024-06-03', '盤子,食慾,心理學', 2),
(22, '百變甜心', '烹飪教室', '圖：龔郁婷/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000022.png', 'no', '2024-06-01', '和菓子,日本,可愛,花', 2),
(23, 'Bon Appétit', '烹飪教室', '圖/文：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000023.png', 'no', '2024-05-24', '法國,米其林,高級餐廳,菜', 2),
(24, '白色山藥不見了', '科普知識', '圖：龔郁婷/文：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000024.png', 'no', '2024-05-26', '變色,天然色素,蝦子,茄子', 2),
(25, '福爾摩沙食物圖鑑', '烹飪教室', '圖/文：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000025.png', 'no', '2024-05-22', '台灣,原住民,漢人,族群融合', 2),
(26, '米米愛蛋糕', '烹飪教室', '圖：龔郁雯/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000026.png', 'no', '2024-05-30', '熊,蛋糕,肥胖,DIY', 2),
(27, '如果顏色是個人', '科普知識', '圖/文：陳薇安', 'https://upcdn.io/W142iek/raw/bookcover/000027.png', 'choice', '2024-06-01', '情緒,心情,喜怒哀樂愛惡欲,擬人化', 2),
(28, '換季的信息', '科普知識', '圖：龔郁婷/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000028.png', 'no', '2024-05-28', '四季,葉子,變色,山', 2),
(29, '你看不見我', '科普知識', '圖/文：龔郁婷', 'https://upcdn.io/W142iek/raw/bookcover/000029.png', 'no', '2024-05-27', '保護色,變色龍,蛇,叢林,樹蛙,北極熊', 2),
(30, '寵物國的世界觀', '科普知識', '圖/文：龔郁雯', 'https://upcdn.io/W142iek/raw/bookcover/000030.png', 'reward', '2024-06-12', '狗,貓,色盲,視錐', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, '童話故事'),
(2, '科普知識'),
(3, '色彩原理'),
(4, '古典文學'),
(5, '烹飪教室'),
(6, '數學邏輯');

-- --------------------------------------------------------

--
-- 資料表結構 `condi`
--

CREATE TABLE `condi` (
  `conditionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `conditionType` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `mark`
--

CREATE TABLE `mark` (
  `markId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `page`
--

CREATE TABLE `page` (
  `pageId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `pageNumber` int(11) NOT NULL,
  `frameURL` text NOT NULL,
  `diffURL` text NOT NULL,
  `gradientURL` text NOT NULL,
  `fixURL` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `page`
--

INSERT INTO `page` (`pageId`, `bookId`, `pageNumber`, `frameURL`, `diffURL`, `gradientURL`, `fixURL`) VALUES
(1, 1, 0, 'https://upcdn.io/W142iek/raw/bookpage/000001-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(2, 1, 1, 'https://upcdn.io/W142iek/raw/bookpage/000001-page1.png', 'https://upcdn.io/W142iek/raw/bookpage/000001-page1-df.png', 'https://upcdn.io/W142iek/raw/bookpage/000001-page1-gd.jpg', 'https://upcdn.io/W142iek/raw/bookpage/000001-page1-fx.png'),
(3, 1, 2, 'https://upcdn.io/W142iek/raw/bookpage/000001-page2.png', 'https://upcdn.io/W142iek/raw/bookpage/000001-page2-df.png', 'https://upcdn.io/W142iek/raw/bookpage/000001-page2-gd.jpg', 'https://upcdn.io/W142iek/raw/bookpage/000001-page2-fx.png'),
(4, 1, 3, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(5, 1, 4, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(6, 1, 5, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(7, 2, 0, 'https://upcdn.io/W142iek/raw/bookpage/000002-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(8, 2, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(9, 3, 0, 'https://upcdn.io/W142iek/raw/bookpage/000003-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(10, 3, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(11, 4, 0, 'https://upcdn.io/W142iek/raw/bookpage/000004-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(12, 4, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(13, 5, 0, 'https://upcdn.io/W142iek/raw/bookpage/000005-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(14, 5, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(15, 6, 0, 'https://upcdn.io/W142iek/raw/bookpage/000006-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(16, 6, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(17, 7, 0, 'https://upcdn.io/W142iek/raw/bookpage/000007-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(18, 7, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(19, 8, 0, 'https://upcdn.io/W142iek/raw/bookpage/000008-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(20, 8, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(21, 9, 0, 'https://upcdn.io/W142iek/raw/bookpage/000009-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(22, 9, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(23, 10, 0, 'https://upcdn.io/W142iek/raw/bookpage/000010-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(24, 10, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(25, 11, 0, 'https://upcdn.io/W142iek/raw/bookpage/000011-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(26, 11, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(27, 12, 0, 'https://upcdn.io/W142iek/raw/bookpage/000012-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(28, 12, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(29, 13, 0, 'https://upcdn.io/W142iek/raw/bookpage/000013-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(30, 13, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(31, 14, 0, 'https://upcdn.io/W142iek/raw/bookpage/000014-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(32, 14, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(33, 15, 0, 'https://upcdn.io/W142iek/raw/bookpage/000015-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(34, 15, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(35, 16, 0, 'https://upcdn.io/W142iek/raw/bookpage/000016-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(36, 16, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(37, 17, 0, 'https://upcdn.io/W142iek/raw/bookpage/000017-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(38, 17, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(39, 18, 0, 'https://upcdn.io/W142iek/raw/bookpage/000018-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(40, 18, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(41, 19, 0, 'https://upcdn.io/W142iek/raw/bookpage/000019-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(42, 19, 1, 'https://upcdn.io/W142iek/raw/bookpage/000019-page1.png', 'https://upcdn.io/W142iek/raw/bookpage/000019-page1-df.png', 'https://upcdn.io/W142iek/raw/bookpage/000019-page1-gd.jpg', 'https://upcdn.io/W142iek/raw/bookpage/000019-page1-fx.png'),
(43, 19, 2, 'https://upcdn.io/W142iek/raw/bookpage/000019-page2.png', 'https://upcdn.io/W142iek/raw/bookpage/000019-page2-df.png', 'https://upcdn.io/W142iek/raw/bookpage/000019-page2-gd.jpg', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(44, 19, 3, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(45, 19, 4, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(46, 20, 0, 'https://upcdn.io/W142iek/raw/bookpage/000020-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(47, 20, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(48, 21, 0, 'https://upcdn.io/W142iek/raw/bookpage/000021-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(49, 21, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(50, 22, 0, 'https://upcdn.io/W142iek/raw/bookpage/000022-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(51, 22, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(52, 23, 0, 'https://upcdn.io/W142iek/raw/bookpage/000023-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(53, 23, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(54, 24, 0, 'https://upcdn.io/W142iek/raw/bookpage/000024-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(55, 24, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(56, 25, 0, 'https://upcdn.io/W142iek/raw/bookpage/000025-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(57, 25, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(58, 26, 0, 'https://upcdn.io/W142iek/raw/bookpage/000026-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(59, 26, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(60, 27, 0, 'https://upcdn.io/W142iek/raw/bookpage/000027-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(61, 27, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(62, 28, 0, 'https://upcdn.io/W142iek/raw/bookpage/000028-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(63, 28, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(64, 29, 0, 'https://upcdn.io/W142iek/raw/bookpage/000029-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(65, 29, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(66, 30, 0, 'https://upcdn.io/W142iek/raw/bookpage/000030-page0.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png'),
(67, 30, 1, 'https://upcdn.io/W142iek/raw/bookpage/construction.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png', 'https://upcdn.io/W142iek/raw/bookpage/transparent.png');

-- --------------------------------------------------------

--
-- 資料表結構 `reward`
--

CREATE TABLE `reward` (
  `rewardId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookNum` int(11) NOT NULL,
  `rewardInfo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userName` text NOT NULL,
  `userEmail` text NOT NULL,
  `userPassword` text NOT NULL,
  `userPhoto` text NOT NULL,
  `userLogin` date NOT NULL,
  `userAccu` int(11) NOT NULL,
  `userSucc` int(11) NOT NULL,
  `userAward` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `work`
--

CREATE TABLE `work` (
  `workId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `pageNum` int(11) NOT NULL,
  `workURL` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `ad`
--
ALTER TABLE `ad`
  ADD PRIMARY KEY (`adId`);

--
-- 資料表索引 `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`authorId`);

--
-- 資料表索引 `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`bookId`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- 資料表索引 `condi`
--
ALTER TABLE `condi`
  ADD PRIMARY KEY (`conditionId`);

--
-- 資料表索引 `mark`
--
ALTER TABLE `mark`
  ADD PRIMARY KEY (`markId`);

--
-- 資料表索引 `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`pageId`);

--
-- 資料表索引 `reward`
--
ALTER TABLE `reward`
  ADD PRIMARY KEY (`rewardId`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`) USING HASH,
  ADD UNIQUE KEY `userPassword` (`userPassword`) USING HASH;

--
-- 資料表索引 `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`workId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
