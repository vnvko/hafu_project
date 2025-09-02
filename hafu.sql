-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 22, 2025 lúc 06:34 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hafu`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `full_name` varchar(190) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `line1` varchar(255) NOT NULL,
  `ward` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(2) NOT NULL DEFAULT 'VN',
  `zip` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `full_name`, `phone`, `line1`, `ward`, `district`, `city`, `country`, `zip`, `is_default`, `created_at`) VALUES
(1, NULL, 'Nguyễn Văn A', '0909123456', '123 Lê Lợi', 'Bến Thành', 'Quận 1', 'TP.HCM', 'VN', '700000', 0, '2025-08-20 15:53:15.133');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(190) NOT NULL,
  `content` mediumtext DEFAULT NULL,
  `cover_url` varchar(500) DEFAULT NULL,
  `author_id` bigint(20) UNSIGNED DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('DRAFT','PUBLISHED') NOT NULL DEFAULT 'PUBLISHED',
  `published_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `added_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `slug` varchar(190) NOT NULL,
  `name` varchar(190) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `slug`, `name`, `active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, NULL, 'hashtag', 'Hashtag', 1, 1, '2025-08-20 15:53:15.101', '2025-08-20 15:53:15.101'),
(2, NULL, 'bang-welcome', 'Bảng Welcome', 1, 2, '2025-08-20 15:53:15.101', '2025-08-20 15:53:15.101'),
(3, NULL, 'sinh-nhat', 'Sinh nhật', 1, 3, '2025-08-20 15:53:15.101', '2025-08-20 15:53:15.101'),
(4, NULL, 'dam-cuoi', 'Đám cưới', 1, 4, '2025-08-20 15:53:15.101', '2025-08-20 15:53:15.101'),
(5, NULL, 'cong-ty', 'Công ty', 1, 5, '2025-08-20 15:53:15.101', '2025-08-20 15:53:15.101');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `email_subscriptions`
--

CREATE TABLE `email_subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(190) NOT NULL,
  `name` varchar(190) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `subscribed_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventory_txs`
--

CREATE TABLE `inventory_txs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('IN','OUT','ADJUST') NOT NULL,
  `quantity` int(11) NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `ref_type` varchar(50) DEFAULT NULL,
  `ref_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Bẫy `inventory_txs`
--
DELIMITER $$
CREATE TRIGGER `trg_inv_ai` AFTER INSERT ON `inventory_txs` FOR EACH ROW BEGIN
  IF NEW.type = 'IN' THEN
    UPDATE product_variants SET stock = GREATEST(0, stock + NEW.quantity) WHERE id = NEW.variant_id;
  ELSEIF NEW.type = 'OUT' THEN
    UPDATE product_variants SET stock = GREATEST(0, stock - NEW.quantity) WHERE id = NEW.variant_id;
  ELSEIF NEW.type = 'ADJUST' THEN
    UPDATE product_variants SET stock = GREATEST(0, stock + NEW.quantity) WHERE id = NEW.variant_id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(30) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email` varchar(190) DEFAULT NULL,
  `status` enum('PENDING','PAID','FULFILLING','SHIPPED','COMPLETED','CANCELED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT 0.00,
  `shipping_fee` decimal(12,2) NOT NULL DEFAULT 0.00,
  `discount_total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sales_applied` tinyint(1) NOT NULL DEFAULT 0,
  `note` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `code`, `user_id`, `email`, `status`, `address_id`, `subtotal`, `shipping_fee`, `discount_total`, `total`, `sales_applied`, `note`, `created_at`, `updated_at`) VALUES
(1, 'HF000001', NULL, 'guest@example.com', 'PENDING', 1, 270000.00, 20000.00, 0.00, 290000.00, 0, 'Đơn thử', '2025-08-20 15:53:15.136', '2025-08-20 15:53:15.136');

--
-- Bẫy `orders`
--
DELIMITER $$
CREATE TRIGGER `trg_order_au` AFTER UPDATE ON `orders` FOR EACH ROW BEGIN
  -- apply khi chuyển từ chưa tính doanh số -> đã tính
  IF OLD.sales_applied = 0 AND NEW.sales_applied = 1 THEN
    UPDATE products p
      JOIN product_variants v ON v.product_id = p.id
      JOIN order_items oi ON oi.variant_id = v.id
      SET p.sold_count = p.sold_count + oi.quantity
      WHERE oi.order_id = NEW.id;

    INSERT INTO inventory_txs (variant_id, type, quantity, reason, ref_type, ref_id)
      SELECT oi.variant_id, 'OUT', oi.quantity, 'ORDER_SALE', 'ORDER', NEW.id
      FROM order_items oi WHERE oi.order_id = NEW.id;
  END IF;

  -- revert khi hủy đơn đã tính doanh số
  IF OLD.sales_applied = 1 AND NEW.sales_applied = 0 THEN
    UPDATE products p
      JOIN product_variants v ON v.product_id = p.id
      JOIN order_items oi ON oi.variant_id = v.id
      SET p.sold_count = GREATEST(0, p.sold_count - oi.quantity)
      WHERE oi.order_id = NEW.id;

    INSERT INTO inventory_txs (variant_id, type, quantity, reason, ref_type, ref_id)
      SELECT oi.variant_id, 'IN', oi.quantity, 'ORDER_CANCEL', 'ORDER', NEW.id
      FROM order_items oi WHERE oi.order_id = NEW.id;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_order_bu` BEFORE UPDATE ON `orders` FOR EACH ROW BEGIN
  IF NEW.status IN ('PAID','FULFILLING','SHIPPED','COMPLETED') THEN
    SET NEW.sales_applied = 1;
  END IF;
  IF NEW.status = 'CANCELED' THEN
    SET NEW.sales_applied = 0;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `variant_id`, `quantity`, `unit_price`, `note`) VALUES
(1, 1, 1, 1, 120000.00, NULL),
(2, 1, 3, 1, 350000.00, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `method` enum('COD','BANK_TRANSFER','MOMO') NOT NULL,
  `provider_txn_id` varchar(100) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'VND',
  `status` enum('INIT','PENDING','SUCCEEDED','FAILED','REFUNDED') NOT NULL DEFAULT 'INIT',
  `paid_at` datetime(3) DEFAULT NULL,
  `bank_info` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_transactions`
--

CREATE TABLE `payment_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` bigint(20) UNSIGNED NOT NULL,
  `event` varchar(100) NOT NULL,
  `raw_payload` mediumtext DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(190) NOT NULL,
  `name` varchar(190) NOT NULL,
  `short_desc` varchar(500) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `price_min` decimal(12,2) NOT NULL DEFAULT 0.00,
  `rating_avg` decimal(3,2) NOT NULL DEFAULT 0.00,
  `sold_count` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `slug`, `name`, `short_desc`, `description`, `thumbnail_url`, `price_min`, `rating_avg`, `sold_count`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'hashtag-cong-ty-cao-cap', 'Hashtag Công ty cao cấp', 'In PP + Formex, tay cầm chắc chắn', '<p>Chất lượng in UV, bền màu, chống nước.</p>', 'https://picsum.photos/seed/h1/900/600', 120000.00, 0.00, 0, 1, '2025-08-20 15:53:15.104', '2025-08-20 15:53:15.117'),
(2, 'bang-welcome-cuoi-sang-trong', 'Bảng Welcome cưới sang trọng', 'Mica/Acrylic trong, chân đế vững', '<p>Phù hợp đám cưới, sự kiện sang trọng.</p>', 'https://picsum.photos/seed/w1/900/600', 350000.00, 0.00, 0, 1, '2025-08-20 15:53:15.104', '2025-08-20 15:53:15.117');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_categories`
--

CREATE TABLE `product_categories` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_categories`
--

INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES
(1, 5),
(2, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(500) NOT NULL,
  `alt` varchar(190) DEFAULT NULL,
  `sort` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `url`, `alt`, `sort`, `created_at`) VALUES
(1, 1, 'https://picsum.photos/seed/h1a/900/600', 'Hashtag công ty 1', 1, '2025-08-20 15:53:15.123'),
(2, 2, 'https://picsum.photos/seed/w1a/900/600', 'Welcome cưới 1', 1, '2025-08-20 15:53:15.123');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(190) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `name`, `size`, `material`, `sku`, `price`, `stock`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'M (30x20cm)', 'M', 'PP+Formex', 'HT-001-M', 120000.00, 50, 'ACTIVE', '2025-08-20 15:53:15.117', '2025-08-20 15:53:15.117'),
(2, 1, 'L (40x30cm)', 'L', 'PP+Formex', 'HT-001-L', 150000.00, 30, 'ACTIVE', '2025-08-20 15:53:15.117', '2025-08-20 15:53:15.117'),
(3, 2, '60x90cm', '60x90', 'Mica', 'BW-001-60x90', 350000.00, 20, 'ACTIVE', '2025-08-20 15:53:15.117', '2025-08-20 15:53:15.117');

--
-- Bẫy `product_variants`
--
DELIMITER $$
CREATE TRIGGER `trg_variant_ad` AFTER DELETE ON `product_variants` FOR EACH ROW BEGIN
  UPDATE products p
  SET price_min = COALESCE((SELECT MIN(price) FROM product_variants v WHERE v.product_id = OLD.product_id), 0)
  WHERE p.id = OLD.product_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_variant_ai` AFTER INSERT ON `product_variants` FOR EACH ROW BEGIN
  UPDATE products p
  SET price_min = COALESCE((SELECT MIN(price) FROM product_variants v WHERE v.product_id = NEW.product_id), 0)
  WHERE p.id = NEW.product_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_variant_au` AFTER UPDATE ON `product_variants` FOR EACH ROW BEGIN
  IF OLD.product_id IS NOT NULL THEN
    UPDATE products p
    SET price_min = COALESCE((SELECT MIN(price) FROM product_variants v WHERE v.product_id = OLD.product_id), 0)
    WHERE p.id = OLD.product_id;
  END IF;
  UPDATE products p
  SET price_min = COALESCE((SELECT MIN(price) FROM product_variants v WHERE v.product_id = NEW.product_id), 0)
  WHERE p.id = NEW.product_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(190) NOT NULL,
  `type` enum('PERCENT','AMOUNT') NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `min_order_total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `start_at` datetime(3) DEFAULT NULL,
  `end_at` datetime(3) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `rating` tinyint(4) NOT NULL,
  `content` text DEFAULT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'APPROVED',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `rating`, `content`, `status`, `created_at`) VALUES
(1, 1, 2, 5, 'Đẹp, giao nhanh!', 'APPROVED', '2025-08-20 15:53:15.129');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `code`, `name`) VALUES
(1, 'ADMIN', 'Quản trị cao nhất'),
(2, 'MANAGER', 'Quản lý'),
(3, 'STAFF', 'Nhân viên'),
(4, 'CUSTOMER', 'Khách hàng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `skey` varchar(190) NOT NULL,
  `svalue` text DEFAULT NULL,
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `settings`
--

INSERT INTO `settings` (`id`, `skey`, `svalue`, `updated_at`) VALUES
(1, 'support.phone', '0902 905 638', '2025-08-20 15:53:15.094'),
(2, 'support.zalo_url', 'https://zalo.me/0902905638', '2025-08-20 15:53:15.094'),
(3, 'support.facebook_url', 'https://facebook.com/hafuhouse', '2025-08-20 15:53:15.094'),
(4, 'support.instagram_url', 'https://instagram.com/hafuhouse', '2025-08-20 15:53:15.094'),
(5, 'map.embed_url', 'https://www.google.com/maps?q=10.839700,106.718200&hl=vi&z=14&output=embed', '2025-08-20 15:53:15.094');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipments`
--

CREATE TABLE `shipments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `carrier` varchar(50) NOT NULL,
  `service` varchar(50) DEFAULT NULL,
  `tracking_number` varchar(100) DEFAULT NULL,
  `label_url` varchar(500) DEFAULT NULL,
  `status` enum('PENDING','CREATED','PICKED','IN_TRANSIT','DELIVERED','FAILED') NOT NULL DEFAULT 'PENDING',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipment_items`
--

CREATE TABLE `shipment_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shipment_id` bigint(20) UNSIGNED NOT NULL,
  `order_item_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `store_locations`
--

CREATE TABLE `store_locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(190) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `lat` decimal(10,7) DEFAULT NULL,
  `lng` decimal(10,7) DEFAULT NULL,
  `map_url` varchar(500) DEFAULT NULL,
  `hours` varchar(190) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `store_locations`
--

INSERT INTO `store_locations` (`id`, `name`, `address`, `city`, `phone`, `lat`, `lng`, `map_url`, `hours`, `active`, `sort`) VALUES
(1, 'HAFU HOUSE', '6/2 đường số 40, Hiệp Bình Chánh, Thủ Đức', 'TP.HCM', '0902 905 638', 10.8397000, 106.7182000, 'https://maps.google.com/?q=10.8397,106.7182', '08:00-21:00', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `support_messages`
--

CREATE TABLE `support_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ticket_id` bigint(20) UNSIGNED NOT NULL,
  `sender_type` enum('USER','STAFF','SYSTEM') NOT NULL,
  `sender_id` bigint(20) UNSIGNED DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `support_tickets`
--

CREATE TABLE `support_tickets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `status` enum('OPEN','PENDING','RESOLVED','CLOSED') NOT NULL DEFAULT 'OPEN',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('OPEN','IN_PROGRESS','DONE') NOT NULL DEFAULT 'OPEN',
  `priority` enum('LOW','MEDIUM','HIGH') NOT NULL DEFAULT 'MEDIUM',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(190) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(190) NOT NULL DEFAULT '',
  `phone` varchar(30) DEFAULT NULL,
  `status` enum('ACTIVE','SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin@hafu.local', 'Admin@123', 'System Admin', '0900000001', 'ACTIVE', '2025-08-20 15:53:15.081', '2025-08-20 15:53:15.081'),
(2, 'user@demo.local', 'User@123', 'Demo Customer', '0900000002', 'ACTIVE', '2025-08-20 15:53:15.081', '2025-08-20 15:53:15.081');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 4);

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `v_products_min`
-- (See below for the actual view)
--
CREATE TABLE `v_products_min` (
`id` bigint(20) unsigned
,`slug` varchar(190)
,`name` varchar(190)
,`price_min` decimal(12,2)
,`calc_min` decimal(12,2)
);

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `v_revenue_monthly`
-- (See below for the actual view)
--
CREATE TABLE `v_revenue_monthly` (
`y` int(4)
,`m` int(2)
,`orders_count` bigint(21)
,`revenue` decimal(34,2)
);

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `v_top_products`
-- (See below for the actual view)
--
CREATE TABLE `v_top_products` (
`product_id` bigint(20) unsigned
,`name` varchar(190)
,`slug` varchar(190)
,`qty_sold` decimal(32,0)
,`gross` decimal(44,2)
);

-- --------------------------------------------------------

--
-- Cấu trúc cho view `v_products_min`
--
DROP TABLE IF EXISTS `v_products_min`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_products_min`  AS SELECT `p`.`id` AS `id`, `p`.`slug` AS `slug`, `p`.`name` AS `name`, `p`.`price_min` AS `price_min`, coalesce(min(`v`.`price`),`p`.`price_min`) AS `calc_min` FROM (`products` `p` left join `product_variants` `v` on(`v`.`product_id` = `p`.`id`)) GROUP BY `p`.`id` ;

-- --------------------------------------------------------

--
-- Cấu trúc cho view `v_revenue_monthly`
--
DROP TABLE IF EXISTS `v_revenue_monthly`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_revenue_monthly`  AS SELECT year(`orders`.`created_at`) AS `y`, month(`orders`.`created_at`) AS `m`, count(0) AS `orders_count`, sum(`orders`.`total`) AS `revenue` FROM `orders` WHERE `orders`.`status` in ('PAID','FULFILLING','SHIPPED','COMPLETED') GROUP BY year(`orders`.`created_at`), month(`orders`.`created_at`) ORDER BY year(`orders`.`created_at`) DESC, month(`orders`.`created_at`) DESC ;

-- --------------------------------------------------------

--
-- Cấu trúc cho view `v_top_products`
--
DROP TABLE IF EXISTS `v_top_products`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_top_products`  AS SELECT `p`.`id` AS `product_id`, `p`.`name` AS `name`, `p`.`slug` AS `slug`, sum(`oi`.`quantity`) AS `qty_sold`, sum(`oi`.`quantity` * `oi`.`unit_price`) AS `gross` FROM (((`order_items` `oi` join `orders` `o` on(`o`.`id` = `oi`.`order_id`)) join `product_variants` `v` on(`v`.`id` = `oi`.`variant_id`)) join `products` `p` on(`p`.`id` = `v`.`product_id`)) WHERE `o`.`status` in ('PAID','FULFILLING','SHIPPED','COMPLETED') GROUP BY `p`.`id`, `p`.`name`, `p`.`slug` ORDER BY sum(`oi`.`quantity`) DESC ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addr_user` (`user_id`);

--
-- Chỉ mục cho bảng `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_blog_author` (`author_id`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_cart_user` (`user_id`),
  ADD KEY `idx_cart_session` (`session_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_cart_variant` (`cart_id`,`variant_id`),
  ADD KEY `fk_ci_variant` (`variant_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_cat_parent` (`parent_id`),
  ADD KEY `idx_categories_active` (`active`,`sort_order`);

--
-- Chỉ mục cho bảng `email_subscriptions`
--
ALTER TABLE `email_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_email` (`email`);

--
-- Chỉ mục cho bảng `inventory_txs`
--
ALTER TABLE `inventory_txs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_inv_variant` (`variant_id`),
  ADD KEY `idx_inv_type` (`type`),
  ADD KEY `idx_inv_ref` (`ref_type`,`ref_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `fk_order_user` (`user_id`),
  ADD KEY `fk_order_addr` (`address_id`),
  ADD KEY `idx_order_status` (`status`,`created_at`),
  ADD KEY `idx_orders_created` (`created_at`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_oi_variant` (`variant_id`),
  ADD KEY `idx_oi_order` (`order_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pt_payment` (`payment_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_products_active` (`is_active`,`created_at`),
  ADD KEY `idx_products_sold` (`sold_count`);
ALTER TABLE `products` ADD FULLTEXT KEY `ft_products` (`name`,`short_desc`,`description`);

--
-- Chỉ mục cho bảng `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `fk_pc_c` (`category_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_img_product` (`product_id`);

--
-- Chỉ mục cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `idx_var_product` (`product_id`),
  ADD KEY `idx_var_status` (`status`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rev_user` (`user_id`),
  ADD KEY `idx_rev_product` (`product_id`),
  ADD KEY `idx_rev_status` (`status`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Chỉ mục cho bảng `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `skey` (`skey`);

--
-- Chỉ mục cho bảng `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ship_order` (`order_id`);

--
-- Chỉ mục cho bảng `shipment_items`
--
ALTER TABLE `shipment_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_si_ship` (`shipment_id`),
  ADD KEY `fk_si_oi` (`order_item_id`);

--
-- Chỉ mục cho bảng `store_locations`
--
ALTER TABLE `store_locations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `support_messages`
--
ALTER TABLE `support_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_msg_ticket` (`ticket_id`);

--
-- Chỉ mục cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ticket_user` (`user_id`);

--
-- Chỉ mục cho bảng `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_task_assignee` (`assigned_to`),
  ADD KEY `fk_task_creator` (`created_by`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `fk_ur_role` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `email_subscriptions`
--
ALTER TABLE `email_subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `inventory_txs`
--
ALTER TABLE `inventory_txs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payment_transactions`
--
ALTER TABLE `payment_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `shipment_items`
--
ALTER TABLE `shipment_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `store_locations`
--
ALTER TABLE `store_locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `support_messages`
--
ALTER TABLE `support_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `fk_addr_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `fk_blog_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_ci_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ci_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`);

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_cat_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `inventory_txs`
--
ALTER TABLE `inventory_txs`
  ADD CONSTRAINT `fk_inv_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_order_addr` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_oi_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_oi_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`);

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_pay_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD CONSTRAINT `fk_pt_payment` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `fk_pc_c` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pc_p` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_img_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `fk_var_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_rev_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rev_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `fk_ship_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `shipment_items`
--
ALTER TABLE `shipment_items`
  ADD CONSTRAINT `fk_si_oi` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_si_ship` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `support_messages`
--
ALTER TABLE `support_messages`
  ADD CONSTRAINT `fk_msg_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `support_tickets` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD CONSTRAINT `fk_ticket_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `fk_task_assignee` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_task_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `fk_ur_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ur_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
