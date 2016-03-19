-- MySQL dump 10.13  Distrib 5.6.19, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: blog_edc80_com
-- ------------------------------------------------------
-- Server version	5.6.19-1~exp1ubuntu2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `keywords` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `image` varchar(90) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `list_order` tinyint(4) NOT NULL DEFAULT '100',
  `show_in_nav` tinyint(4) NOT NULL DEFAULT '0',
  `is_show` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (11,0,'repudiandae qui','consequatur','http://lorempixel.com/680/300/?42960','ONE.',35,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(12,0,'rerum et repudiandae','vero,qui,ab,repellendus','http://lorempixel.com/680/300/?30259','King, and he.',31,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(13,0,'amet soluta','esse','http://lorempixel.com/680/300/?58553','I hadn\'t.',11,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(14,0,'sed totam sit sequi','et,atque,iusto','http://lorempixel.com/680/300/?74970','Alice did not.',66,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(15,0,'aspernatur quis corrupti','necessitatibus,eveniet,ipsum,aliquam','http://lorempixel.com/680/300/?61230','I\'d only.',94,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(16,0,'aspernatur et rerum ea','perferendis','http://lorempixel.com/680/300/?13581','There seemed.',77,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(17,0,'nam sed','culpa,voluptas,non,aspernatur','http://lorempixel.com/680/300/?21491','Alice, very much.',53,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(18,0,'voluptas dolorem recusandae','temporibus,a,omnis,veniam','http://lorempixel.com/680/300/?47845','Gryphon, \'she.',73,1,1,'2016-03-17 14:49:50','2016-03-17 14:49:50');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2016_01_02_184209_create_categories_table',1),('2016_01_03_070056_create_posts_table',1),('2016_01_24_112817_create_tags_table',1),('2016_02_04_174028_create_post_tag_pivot',1),('2016_02_12_161544_entrust_setup_tables',1),('2016_02_18_131555_create_user_groups_table',1),('2016_02_18_131818_update_users_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES (1,1),(2,1),(2,2);
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'admin','超级管理员权限','超级管理员权限..','2016-02-13 11:13:58','2016-03-19 03:01:56'),(2,'test','测试权限','测试权限..','2016-03-19 03:02:21','2016-03-19 03:02:21');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tag_pivot`
--

DROP TABLE IF EXISTS `post_tag_pivot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_tag_pivot` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_tag_pivot_post_id_index` (`post_id`),
  KEY `post_tag_pivot_tag_id_index` (`tag_id`),
  CONSTRAINT `post_tag_pivot_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_tag_pivot_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tag_pivot`
--

LOCK TABLES `post_tag_pivot` WRITE;
/*!40000 ALTER TABLE `post_tag_pivot` DISABLE KEYS */;
INSERT INTO `post_tag_pivot` VALUES (11,84,2),(12,84,1),(13,92,1);
/*!40000 ALTER TABLE `post_tag_pivot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `keywords` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content_raw` text COLLATE utf8_unicode_ci NOT NULL,
  `content_html` text COLLATE utf8_unicode_ci NOT NULL,
  `list_order` tinyint(4) NOT NULL DEFAULT '100',
  `is_draft` tinyint(1) NOT NULL,
  `layout` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'blog.layouts.show',
  `published_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`),
  KEY `posts_category_id_foreign` (`category_id`),
  KEY `posts_published_at_index` (`published_at`),
  CONSTRAINT `posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (81,11,'Aliquam eos aspernatur voluptas eaque expedita.','earum,libero,excepturi,corporis','aut-qui-ex-ut-illum-sapiente-qui-quibusdam','http://lorempixel.com/680/300/?17163','WILL be a Caucus-race.\' \'What IS the use of a muchness\"--did you ever eat a bat?\' when suddenly, thump! thump! down she came in with a table in.','Quos labore et magnam ullam omnis. Aut animi sunt dolores quae.\n\nAb at ullam nemo ut. Aliquid et voluptate quod qui. Pariatur sint voluptatibus qui quae maiores sit vel velit. Ut fugiat nisi dolorum et quidem labore enim voluptatum.\n\nAut aut voluptas vel facere voluptatem ex maxime. Exercitationem incidunt repudiandae est quo. Maxime nostrum exercitationem ad nihil harum laudantium.\n\nDolores omnis architecto unde perferendis aut enim asperiores. Non dolores fugiat quo sapiente.','<p>Quos labore et magnam ullam omnis. Aut animi sunt dolores quae.</p>\n\n<p>Ab at ullam nemo ut. Aliquid et voluptate quod qui. Pariatur sint voluptatibus qui quae maiores sit vel velit. Ut fugiat nisi dolorum et quidem labore enim voluptatum.</p>\n\n<p>Aut aut voluptas vel facere voluptatem ex maxime. Exercitationem incidunt repudiandae est quo. Maxime nostrum exercitationem ad nihil harum laudantium.</p>\n\n<p>Dolores omnis architecto unde perferendis aut enim asperiores. Non dolores fugiat quo sapiente.</p>\n',37,0,'blog.layouts.show','2016-02-23 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(82,11,'Quia dignissimos soluta laboriosam ut ad numquam.','aut,aut,nemo','temporibus-temporibus-odit-ad-nihil-adipisci-quis','http://lorempixel.com/680/300/?66619','All this time she saw in my own tears! That WILL be a queer thing, to be treated with respect. \'Cheshire.','Molestiae non voluptatem earum modi consectetur aut est. Quis eum fugit dolores eos ut voluptatem ab. Aliquid eaque dicta voluptatem excepturi illum quis ut. Ab incidunt ad quaerat recusandae eius nisi minus.\n\nConsequatur dignissimos odit eos voluptas vero placeat repellendus. In sapiente accusamus minus voluptas non sint et. Mollitia cum doloribus tempora porro. Asperiores error ut omnis labore ut.\n\nRatione beatae autem et impedit exercitationem aut deleniti recusandae. Quia minima asperiores veritatis voluptate blanditiis fugiat. Numquam molestias hic architecto magnam est blanditiis facilis. Id excepturi magnam sit aliquid architecto nemo repudiandae.','<p>Molestiae non voluptatem earum modi consectetur aut est. Quis eum fugit dolores eos ut voluptatem ab. Aliquid eaque dicta voluptatem excepturi illum quis ut. Ab incidunt ad quaerat recusandae eius nisi minus.</p>\n\n<p>Consequatur dignissimos odit eos voluptas vero placeat repellendus. In sapiente accusamus minus voluptas non sint et. Mollitia cum doloribus tempora porro. Asperiores error ut omnis labore ut.</p>\n\n<p>Ratione beatae autem et impedit exercitationem aut deleniti recusandae. Quia minima asperiores veritatis voluptate blanditiis fugiat. Numquam molestias hic architecto magnam est blanditiis facilis. Id excepturi magnam sit aliquid architecto nemo repudiandae.</p>\n',26,0,'blog.layouts.show','2016-02-28 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(83,11,'Eveniet aperiam eum est ea dolore.','aut,ducimus,aut,non','enim-omnis-officia-itaque-nulla-amet-similique','http://lorempixel.com/680/300/?22645','Soup of the March Hare. Alice was not easy to take MORE than nothing.\' \'Nobody asked YOUR opinion,\' said Alice. \'Anything you.','Veritatis sed voluptatem exercitationem. Ipsa ea eum debitis et voluptas.\n\nDignissimos unde sunt qui natus. Dolorem quo debitis laborum qui impedit rerum necessitatibus dolore. Ullam in corrupti fugiat eaque eligendi. Dolor similique et et soluta et amet itaque dolorem.\n\nEst voluptatem illo explicabo sapiente. Autem nesciunt velit aut id enim enim et. Mollitia architecto voluptate placeat rerum qui aut provident voluptas.\n\nFuga incidunt ea nemo quisquam velit. Sequi rerum accusantium modi vel atque. Dolor perferendis minima voluptatem ipsam alias. Excepturi officia facilis eaque.','<p>Veritatis sed voluptatem exercitationem. Ipsa ea eum debitis et voluptas.</p>\n\n<p>Dignissimos unde sunt qui natus. Dolorem quo debitis laborum qui impedit rerum necessitatibus dolore. Ullam in corrupti fugiat eaque eligendi. Dolor similique et et soluta et amet itaque dolorem.</p>\n\n<p>Est voluptatem illo explicabo sapiente. Autem nesciunt velit aut id enim enim et. Mollitia architecto voluptate placeat rerum qui aut provident voluptas.</p>\n\n<p>Fuga incidunt ea nemo quisquam velit. Sequi rerum accusantium modi vel atque. Dolor perferendis minima voluptatem ipsam alias. Excepturi officia facilis eaque.</p>\n',97,0,'blog.layouts.show','2016-03-14 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(84,11,'Ab unde qui nisi impedit est.','molestias,corporis,reprehenderit','occaecati-laboriosam-accusamus-qui-accusantium','http://lorempixel.com/680/300/?57331','Lobster Quadrille is!\' \'No, indeed,\' said Alice. \'I\'ve read that in about half no time! Take your choice!\' The Duchess took her choice, and was going to dive in.','Eveniet et consectetur necessitatibus omnis. Ipsam minima molestias dolores nulla suscipit necessitatibus. Numquam inventore vel consectetur molestiae voluptas.\r\n\r\nEveniet voluptatem iure itaque eius totam tempore. Et harum expedita unde repudiandae voluptates. Veniam quas recusandae a quo quo repudiandae.\r\n\r\nIste illo veniam cumque illo quia id sit nam. Quas dolorum consequatur commodi a minus maiores qui. Aut velit debitis eos aut.','<p>Eveniet et consectetur necessitatibus omnis. Ipsam minima molestias dolores nulla suscipit necessitatibus. Numquam inventore vel consectetur molestiae voluptas.</p>\n\n<p>Eveniet voluptatem iure itaque eius totam tempore. Et harum expedita unde repudiandae voluptates. Veniam quas recusandae a quo quo repudiandae.</p>\n\n<p>Iste illo veniam cumque illo quia id sit nam. Quas dolorum consequatur commodi a minus maiores qui. Aut velit debitis eos aut.</p>\n',1,0,'blog.layouts.show','2016-03-06 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-18 14:45:32'),(85,11,'Facilis rerum vero magni ut eligendi.','ut,ut','odit-recusandae-ipsa-molestiae-qui','http://lorempixel.com/680/300/?63113','ME\' beautifully printed on it in asking riddles that have no answers.\' \'If you can\'t think! And oh, my poor little thing was snorting like a.','Modi vel et eligendi blanditiis omnis dolorem iusto. Placeat aperiam esse dolor quas iusto aut veniam ea. Ab vel fuga aspernatur et iure rerum. Illo illum error atque modi.\n\nEt quia excepturi dolorum omnis. Consequuntur provident odio laudantium quidem occaecati maiores. Qui enim illo ad qui aspernatur. Quia voluptatem ea nisi molestiae.\n\nHarum dolore eum dolores et eos accusamus consequatur. Laborum vel quas magni rem beatae et. Sed labore omnis eos corporis dolorum. Sed iure quidem pariatur earum et id in.\n\nVel quis quae qui molestiae quis vero et. Eveniet quas qui vero hic quo blanditiis in. Molestiae sed sint soluta est.\n\nDolorum enim aperiam adipisci sequi odio. Dolor voluptas numquam consequuntur temporibus ipsa. Ullam quod optio et et assumenda voluptatem nulla. Autem voluptas dolore et deleniti veniam molestias.\n\nDucimus vel ad velit omnis nobis et sed aut. Consequatur distinctio officiis id deleniti facilis. Odit rerum ipsa consectetur et. Repudiandae quia cumque non iusto.','<p>Modi vel et eligendi blanditiis omnis dolorem iusto. Placeat aperiam esse dolor quas iusto aut veniam ea. Ab vel fuga aspernatur et iure rerum. Illo illum error atque modi.</p>\n\n<p>Et quia excepturi dolorum omnis. Consequuntur provident odio laudantium quidem occaecati maiores. Qui enim illo ad qui aspernatur. Quia voluptatem ea nisi molestiae.</p>\n\n<p>Harum dolore eum dolores et eos accusamus consequatur. Laborum vel quas magni rem beatae et. Sed labore omnis eos corporis dolorum. Sed iure quidem pariatur earum et id in.</p>\n\n<p>Vel quis quae qui molestiae quis vero et. Eveniet quas qui vero hic quo blanditiis in. Molestiae sed sint soluta est.</p>\n\n<p>Dolorum enim aperiam adipisci sequi odio. Dolor voluptas numquam consequuntur temporibus ipsa. Ullam quod optio et et assumenda voluptatem nulla. Autem voluptas dolore et deleniti veniam molestias.</p>\n\n<p>Ducimus vel ad velit omnis nobis et sed aut. Consequatur distinctio officiis id deleniti facilis. Odit rerum ipsa consectetur et. Repudiandae quia cumque non iusto.</p>\n',74,0,'blog.layouts.show','2016-03-15 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(86,11,'Suscipit nisi dicta libero ad et est.','molestiae,ab','sunt-itaque-mollitia-reiciendis-quos-qui-eaque','http://lorempixel.com/680/300/?20921','As she said aloud. \'I shall sit here,\' the Footman continued in the act of crawling away: besides all this, there was silence for some time.','Accusamus sequi ratione ipsa magnam. Consectetur corrupti dicta eius velit laudantium. Cum vero quia consequatur sed et mollitia sint. Incidunt a et explicabo voluptatem voluptatem fugiat porro.\n\nAb corporis quod et laboriosam sapiente officiis. Nesciunt ut explicabo nulla. Voluptatem sed est quia.\n\nOmnis totam sapiente culpa saepe ut itaque non. Nesciunt iusto numquam et odio voluptatum. Nostrum beatae rerum perferendis sit ut eius sed. Minima recusandae adipisci similique sit modi.','<p>Accusamus sequi ratione ipsa magnam. Consectetur corrupti dicta eius velit laudantium. Cum vero quia consequatur sed et mollitia sint. Incidunt a et explicabo voluptatem voluptatem fugiat porro.</p>\n\n<p>Ab corporis quod et laboriosam sapiente officiis. Nesciunt ut explicabo nulla. Voluptatem sed est quia.</p>\n\n<p>Omnis totam sapiente culpa saepe ut itaque non. Nesciunt iusto numquam et odio voluptatum. Nostrum beatae rerum perferendis sit ut eius sed. Minima recusandae adipisci similique sit modi.</p>\n',55,0,'blog.layouts.show','2016-02-23 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(87,11,'Repudiandae distinctio ipsa deserunt ut impedit eaque vel necessitatibus vitae consectetur.','ipsam,voluptatem,numquam','cum-recusandae-quam-aliquid-explicabo','http://lorempixel.com/680/300/?82868','Lory, as soon as there was nothing on it except a little queer, won\'t you?\' \'Not a bit,\' said the Hatter: \'as the things being alive; for instance, there\'s the arch I\'ve got to the other,.','Deleniti et error excepturi consequatur. Assumenda quae et eligendi unde temporibus. A quia optio eligendi labore. Consequatur non velit voluptatum eius earum.\n\nUllam dolor ducimus nostrum quia voluptatem autem voluptatum. Eaque et voluptas incidunt et magnam ipsa laborum. Ut dolores doloribus voluptatem labore. Blanditiis neque laboriosam aut est aliquam enim. Est ad minus voluptates provident quod quia itaque.\n\nTenetur soluta sit vel. Aut nam id culpa officia. Earum quidem qui vel deleniti in. Ullam odio assumenda totam magnam sint illum totam.\n\nOfficiis ab aut autem dolorem. Natus voluptatem reiciendis mollitia et pariatur distinctio.\n\nEos laudantium quia rerum quibusdam et doloremque quia. Sit consequatur repellat culpa et ut. Temporibus odio eum libero quaerat voluptatem.','<p>Deleniti et error excepturi consequatur. Assumenda quae et eligendi unde temporibus. A quia optio eligendi labore. Consequatur non velit voluptatum eius earum.</p>\n\n<p>Ullam dolor ducimus nostrum quia voluptatem autem voluptatum. Eaque et voluptas incidunt et magnam ipsa laborum. Ut dolores doloribus voluptatem labore. Blanditiis neque laboriosam aut est aliquam enim. Est ad minus voluptates provident quod quia itaque.</p>\n\n<p>Tenetur soluta sit vel. Aut nam id culpa officia. Earum quidem qui vel deleniti in. Ullam odio assumenda totam magnam sint illum totam.</p>\n\n<p>Officiis ab aut autem dolorem. Natus voluptatem reiciendis mollitia et pariatur distinctio.</p>\n\n<p>Eos laudantium quia rerum quibusdam et doloremque quia. Sit consequatur repellat culpa et ut. Temporibus odio eum libero quaerat voluptatem.</p>\n',62,0,'blog.layouts.show','2016-02-20 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(88,11,'At saepe ab deleniti omnis dolore quia optio occaecati voluptatem.','vel,tenetur,consequatur,eius','quasi-architecto-dolorem-quisquam-facere-non-eos-qui','http://lorempixel.com/680/300/?76478','There seemed to her great delight it fitted! Alice opened the door of the lefthand bit. * * * * * * CHAPTER II. The Pool of Tears \'Curiouser and curiouser!\' cried Alice.','Quod voluptatem ut natus rerum dolor eum quaerat. Quibusdam ea vitae quia ut suscipit omnis id. Ducimus illo omnis eos iusto velit harum ea.\n\nNatus fuga occaecati necessitatibus. Tenetur dolore rerum et voluptas. Quo corrupti sit quisquam voluptate nemo expedita. Quia voluptatem occaecati eum corporis dolor.\n\nAtque qui laboriosam ullam culpa. Reiciendis voluptatem dignissimos delectus tempore. Quidem sit aut iste. Vel temporibus voluptas amet dolor ad laboriosam.\n\nAut qui adipisci molestiae et ut quis possimus. In in eaque illum est reiciendis nulla alias. Omnis minima et dolorum eaque tempore est consequatur ut.\n\nOfficia dolorem molestiae est error perferendis. Ut et fugit suscipit. Sequi voluptatem est est recusandae porro aliquid.','<p>Quod voluptatem ut natus rerum dolor eum quaerat. Quibusdam ea vitae quia ut suscipit omnis id. Ducimus illo omnis eos iusto velit harum ea.</p>\n\n<p>Natus fuga occaecati necessitatibus. Tenetur dolore rerum et voluptas. Quo corrupti sit quisquam voluptate nemo expedita. Quia voluptatem occaecati eum corporis dolor.</p>\n\n<p>Atque qui laboriosam ullam culpa. Reiciendis voluptatem dignissimos delectus tempore. Quidem sit aut iste. Vel temporibus voluptas amet dolor ad laboriosam.</p>\n\n<p>Aut qui adipisci molestiae et ut quis possimus. In in eaque illum est reiciendis nulla alias. Omnis minima et dolorum eaque tempore est consequatur ut.</p>\n\n<p>Officia dolorem molestiae est error perferendis. Ut et fugit suscipit. Sequi voluptatem est est recusandae porro aliquid.</p>\n',84,0,'blog.layouts.show','2016-03-04 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(89,11,'Voluptatum sint inventore occaecati dicta odit et eveniet quis et libero.','similique','consectetur-rerum-quia-libero','http://lorempixel.com/680/300/?99303','Alice; \'it\'s laid for a good deal: this fireplace is narrow, to be no chance of getting up and went on again:-- \'You may go,\' said the Mock Turtle angrily: \'really you are very dull!\' \'You.','Sunt odio distinctio inventore. Quidem laborum sequi earum aut occaecati ea. Ex aliquam deserunt impedit reprehenderit dolor aperiam ut. Iusto dolores tenetur ut culpa beatae.\n\nRepellendus vel facilis consequatur enim. Consectetur dolorem delectus velit et dolor. Doloremque qui accusamus nobis blanditiis debitis nulla. Voluptatibus hic deserunt rerum sint voluptatem dolores.\n\nProvident voluptatem quae assumenda illum et. Dolores et ex et molestiae delectus odio. Aut aperiam rem facilis.\n\nDolor hic dolor nihil fuga. Commodi nihil dolore velit facere maiores ut. Minima animi et totam maxime consequuntur blanditiis. Est dolorem rerum sapiente et nemo. Et quia et nemo doloremque dolore.\n\nItaque aspernatur perferendis rem distinctio temporibus. Porro quis maxime sed porro. Repudiandae et error ullam aperiam.\n\nRecusandae ut quaerat consequatur. Est ut eveniet velit itaque sint. Omnis tempora nobis distinctio provident dolores aut voluptas est. Sint alias sint vitae assumenda ducimus dolorum.','<p>Sunt odio distinctio inventore. Quidem laborum sequi earum aut occaecati ea. Ex aliquam deserunt impedit reprehenderit dolor aperiam ut. Iusto dolores tenetur ut culpa beatae.</p>\n\n<p>Repellendus vel facilis consequatur enim. Consectetur dolorem delectus velit et dolor. Doloremque qui accusamus nobis blanditiis debitis nulla. Voluptatibus hic deserunt rerum sint voluptatem dolores.</p>\n\n<p>Provident voluptatem quae assumenda illum et. Dolores et ex et molestiae delectus odio. Aut aperiam rem facilis.</p>\n\n<p>Dolor hic dolor nihil fuga. Commodi nihil dolore velit facere maiores ut. Minima animi et totam maxime consequuntur blanditiis. Est dolorem rerum sapiente et nemo. Et quia et nemo doloremque dolore.</p>\n\n<p>Itaque aspernatur perferendis rem distinctio temporibus. Porro quis maxime sed porro. Repudiandae et error ullam aperiam.</p>\n\n<p>Recusandae ut quaerat consequatur. Est ut eveniet velit itaque sint. Omnis tempora nobis distinctio provident dolores aut voluptas est. Sint alias sint vitae assumenda ducimus dolorum.</p>\n',27,0,'blog.layouts.show','2016-03-16 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(90,11,'Sit sequi vero enim.','eum,molestiae,error','culpa-ipsa-et-neque-dolor-sint-in','http://lorempixel.com/680/300/?28438','Cat, \'a dog\'s not mad. You grant that?\' \'I suppose so,\' said Alice. \'Come, let\'s try Geography. London is the same when I was a different person then.\' \'Explain all that,\' said the.','Distinctio temporibus qui qui quo. Quibusdam perferendis fugit voluptatum consequatur aut.\n\nFacilis aliquid nemo dolore deserunt aliquid beatae. Eligendi nesciunt ut dolorem ut. Fugit deleniti facilis debitis cupiditate voluptatibus nihil. Sint dolor laudantium in voluptas aut sit harum.\n\nProvident atque autem inventore molestiae occaecati ex. Fugit quisquam inventore laboriosam eligendi quia soluta et. Dolores repudiandae saepe dolorum aut quis animi ut ducimus.','<p>Distinctio temporibus qui qui quo. Quibusdam perferendis fugit voluptatum consequatur aut.</p>\n\n<p>Facilis aliquid nemo dolore deserunt aliquid beatae. Eligendi nesciunt ut dolorem ut. Fugit deleniti facilis debitis cupiditate voluptatibus nihil. Sint dolor laudantium in voluptas aut sit harum.</p>\n\n<p>Provident atque autem inventore molestiae occaecati ex. Fugit quisquam inventore laboriosam eligendi quia soluta et. Dolores repudiandae saepe dolorum aut quis animi ut ducimus.</p>\n',40,0,'blog.layouts.show','2016-02-18 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(91,11,'Assumenda distinctio laborum delectus enim ea voluptate ipsam.','aut,itaque','dolor-et-iure-accusamus-a','http://lorempixel.com/680/300/?62663','MORE than nothing.\' \'Nobody asked YOUR opinion,\' said Alice. \'Exactly so,\' said the March Hare said in an encouraging.','Deserunt praesentium tempora blanditiis. Quisquam pariatur quas rerum qui rem ullam consequatur. Ducimus ipsa et vel quam itaque iure aut. Natus sed maxime et voluptatum qui. Reiciendis repellat ullam quas eum harum ipsa.\n\nQui quod dignissimos dolor ducimus. Soluta omnis est et. Exercitationem minus maiores recusandae.\n\nEt molestiae rerum iusto ut hic qui reiciendis. Commodi cupiditate natus aut ad ut. Quos saepe dicta numquam commodi.\n\nSunt sint ut dolores voluptatem nisi molestiae. Amet eveniet est dolore officia aut corrupti nulla cumque. Debitis veritatis nobis rerum sit ipsum molestiae. Tempora consectetur sit odit.\n\nQuia quam aspernatur nihil cupiditate. Et alias temporibus assumenda ut illum provident. Saepe quibusdam labore magnam ut. Voluptas aut rerum dolorum mollitia molestiae est natus.\n\nQuos eius dolor repudiandae ut veritatis. Quisquam voluptatum natus sit et repellendus sapiente. Laboriosam iste consequatur rerum harum omnis nostrum.','<p>Deserunt praesentium tempora blanditiis. Quisquam pariatur quas rerum qui rem ullam consequatur. Ducimus ipsa et vel quam itaque iure aut. Natus sed maxime et voluptatum qui. Reiciendis repellat ullam quas eum harum ipsa.</p>\n\n<p>Qui quod dignissimos dolor ducimus. Soluta omnis est et. Exercitationem minus maiores recusandae.</p>\n\n<p>Et molestiae rerum iusto ut hic qui reiciendis. Commodi cupiditate natus aut ad ut. Quos saepe dicta numquam commodi.</p>\n\n<p>Sunt sint ut dolores voluptatem nisi molestiae. Amet eveniet est dolore officia aut corrupti nulla cumque. Debitis veritatis nobis rerum sit ipsum molestiae. Tempora consectetur sit odit.</p>\n\n<p>Quia quam aspernatur nihil cupiditate. Et alias temporibus assumenda ut illum provident. Saepe quibusdam labore magnam ut. Voluptas aut rerum dolorum mollitia molestiae est natus.</p>\n\n<p>Quos eius dolor repudiandae ut veritatis. Quisquam voluptatum natus sit et repellendus sapiente. Laboriosam iste consequatur rerum harum omnis nostrum.</p>\n',98,0,'blog.layouts.show','2016-02-28 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(92,11,'Ut hic eligendi magnam et quam non recusandae hic numquam.','rem','id-aperiam-sint-sunt-adipisci-maiores-omnis','http://lorempixel.com/680/300/?45660','Queen. \'Their heads are gone, if it makes me grow smaller, I can listen all day about it!\' and he says it\'s so useful, it\'s worth a hundred pounds! He.','Ut iusto et eligendi ut. Explicabo a rerum numquam sit temporibus aspernatur.\r\n\r\nEt dignissimos eveniet est aut qui. Veritatis unde ea labore omnis quia laborum aut itaque. Et dicta optio maiores quia recusandae. Nihil rerum fuga eum repellendus fuga iste mollitia. Aut optio dicta accusantium rerum repellat.\r\n\r\nId voluptate dicta amet enim. Impedit facilis illum asperiores in. Delectus voluptatem voluptas cumque molestiae. Quia reprehenderit et autem.\r\n\r\nMolestias et qui commodi velit qui eveniet dolores. Eligendi sequi eos in aliquam qui. Nesciunt dicta pariatur et sit perferendis. Eos corrupti et autem minima repellendus quas in.\r\n\r\nLaudantium et doloribus ut sapiente. Non quis eveniet assumenda et eos sed. Ipsam delectus incidunt placeat nam molestiae.','<p>Ut iusto et eligendi ut. Explicabo a rerum numquam sit temporibus aspernatur.</p>\n\n<p>Et dignissimos eveniet est aut qui. Veritatis unde ea labore omnis quia laborum aut itaque. Et dicta optio maiores quia recusandae. Nihil rerum fuga eum repellendus fuga iste mollitia. Aut optio dicta accusantium rerum repellat.</p>\n\n<p>Id voluptate dicta amet enim. Impedit facilis illum asperiores in. Delectus voluptatem voluptas cumque molestiae. Quia reprehenderit et autem.</p>\n\n<p>Molestias et qui commodi velit qui eveniet dolores. Eligendi sequi eos in aliquam qui. Nesciunt dicta pariatur et sit perferendis. Eos corrupti et autem minima repellendus quas in.</p>\n\n<p>Laudantium et doloribus ut sapiente. Non quis eveniet assumenda et eos sed. Ipsam delectus incidunt placeat nam molestiae.</p>\n',2,0,'blog.layouts.show','2016-03-01 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:51:26'),(93,11,'Vel officiis ut quia et minima quia.','deserunt','error-rem-aut-consequatur-optio-dolorem-ea-similique','http://lorempixel.com/680/300/?66192','Alice, she went down on her spectacles, and began picking them up again as she could see, when she.','Aut dolor culpa nisi sit. Qui impedit animi aspernatur dolores cupiditate modi. A deserunt fugit odio vel quia sit. Deserunt quod molestias sit voluptas ipsum hic maiores eaque.\n\nFacilis repellat quod ut reiciendis exercitationem eum temporibus. Illo asperiores nesciunt ratione deserunt velit at quas. Ducimus tempore aliquid dolorem ut in. Id ad consectetur quasi quod repudiandae.\n\nLaudantium cumque non iure veritatis occaecati id culpa. Dolor suscipit consequatur aut reiciendis sapiente. Mollitia laborum dolorem ea.\n\nUt et molestiae dolor suscipit. Exercitationem quia inventore dolores alias sed. Similique voluptatem et qui totam.\n\nLaborum voluptatum corrupti sequi et non. Suscipit molestiae officia et est sint eveniet laudantium maiores. Repellendus occaecati aut nulla id qui totam.\n\nEst sequi tempore impedit quae totam quaerat. Ut deserunt amet eum vero et. Aut in ullam atque laborum. Accusamus ipsum modi tempora quis atque quaerat.','<p>Aut dolor culpa nisi sit. Qui impedit animi aspernatur dolores cupiditate modi. A deserunt fugit odio vel quia sit. Deserunt quod molestias sit voluptas ipsum hic maiores eaque.</p>\n\n<p>Facilis repellat quod ut reiciendis exercitationem eum temporibus. Illo asperiores nesciunt ratione deserunt velit at quas. Ducimus tempore aliquid dolorem ut in. Id ad consectetur quasi quod repudiandae.</p>\n\n<p>Laudantium cumque non iure veritatis occaecati id culpa. Dolor suscipit consequatur aut reiciendis sapiente. Mollitia laborum dolorem ea.</p>\n\n<p>Ut et molestiae dolor suscipit. Exercitationem quia inventore dolores alias sed. Similique voluptatem et qui totam.</p>\n\n<p>Laborum voluptatum corrupti sequi et non. Suscipit molestiae officia et est sint eveniet laudantium maiores. Repellendus occaecati aut nulla id qui totam.</p>\n\n<p>Est sequi tempore impedit quae totam quaerat. Ut deserunt amet eum vero et. Aut in ullam atque laborum. Accusamus ipsum modi tempora quis atque quaerat.</p>\n',52,0,'blog.layouts.show','2016-03-09 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(94,11,'Error dolorem nulla qui et.','totam,sed,reiciendis,animi','ad-ut-ea-quam-commodi-reiciendis-placeat','http://lorempixel.com/680/300/?40709','Alice, a little timidly, for she was now only ten inches high, and she put her hand on the trumpet, and called out as loud as she did not venture to go near the King.','Quam omnis omnis eos reiciendis non officia iure in. Ab eum quaerat unde aliquam vel maiores. Voluptatem distinctio similique quis quam. Quisquam sint eum rerum eos maxime pariatur.\n\nCupiditate nam dolore sunt molestiae consectetur dignissimos qui. Commodi vel ex beatae earum iure dolor occaecati provident. Earum minima corrupti nihil deserunt.\n\nEt quaerat debitis quidem distinctio dolor. Sint blanditiis doloribus dolorem ea autem sequi. Perspiciatis aperiam et repellat officia quos. Sit qui voluptatem ipsam assumenda est id. Nihil ipsum reprehenderit veritatis distinctio dignissimos.\n\nAnimi nostrum voluptates et cum. Aut rerum quia possimus eveniet expedita. Omnis at qui cupiditate aspernatur alias.','<p>Quam omnis omnis eos reiciendis non officia iure in. Ab eum quaerat unde aliquam vel maiores. Voluptatem distinctio similique quis quam. Quisquam sint eum rerum eos maxime pariatur.</p>\n\n<p>Cupiditate nam dolore sunt molestiae consectetur dignissimos qui. Commodi vel ex beatae earum iure dolor occaecati provident. Earum minima corrupti nihil deserunt.</p>\n\n<p>Et quaerat debitis quidem distinctio dolor. Sint blanditiis doloribus dolorem ea autem sequi. Perspiciatis aperiam et repellat officia quos. Sit qui voluptatem ipsam assumenda est id. Nihil ipsum reprehenderit veritatis distinctio dignissimos.</p>\n\n<p>Animi nostrum voluptates et cum. Aut rerum quia possimus eveniet expedita. Omnis at qui cupiditate aspernatur alias.</p>\n',25,0,'blog.layouts.show','2016-02-21 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(95,11,'Vitae et harum eum molestias at hic sit minima at.','ut,enim,aut','vitae-recusandae-et-explicabo-aut-similique-iure-velit','http://lorempixel.com/680/300/?18266','Alice quietly said, just as the question was evidently meant for her. \'Yes!\' shouted Alice. \'Come on, then!\' roared the.','Qui repellendus modi culpa molestias. Sequi explicabo nostrum culpa quisquam praesentium corporis vel. Placeat rerum nostrum hic sunt iusto illo aut. Aut repellendus ut sed consequuntur.\n\nEos ut earum non et. Quod rem illo occaecati sit. Totam excepturi vel hic possimus qui perferendis culpa. Et dolores eveniet iste ut sit labore.\n\nQui dignissimos error numquam ut distinctio possimus. Enim necessitatibus accusamus quia reprehenderit non. Molestiae eius sunt enim fugit ut modi sit.','<p>Qui repellendus modi culpa molestias. Sequi explicabo nostrum culpa quisquam praesentium corporis vel. Placeat rerum nostrum hic sunt iusto illo aut. Aut repellendus ut sed consequuntur.</p>\n\n<p>Eos ut earum non et. Quod rem illo occaecati sit. Totam excepturi vel hic possimus qui perferendis culpa. Et dolores eveniet iste ut sit labore.</p>\n\n<p>Qui dignissimos error numquam ut distinctio possimus. Enim necessitatibus accusamus quia reprehenderit non. Molestiae eius sunt enim fugit ut modi sit.</p>\n',21,0,'blog.layouts.show','2016-02-21 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(96,11,'Labore pariatur asperiores.','qui,animi,aliquam,sequi','molestias-sunt-non-harum-doloribus-distinctio','http://lorempixel.com/680/300/?49985','Alice knew it was a real nose; also its eyes by this time). \'Don\'t grunt,\' said Alice; \'that\'s not.','Et est dolore quo totam quasi totam. Perspiciatis accusamus voluptas hic voluptatum asperiores. Veritatis voluptas velit dolores quia tempore quis et.\n\nLaborum delectus nulla cumque ab. Nemo recusandae sint quos. Quae facere esse dolores eum qui a eum.\n\nAspernatur vitae et voluptates dolor quidem. Alias cum consequatur quis dolorem ducimus. A debitis nobis fugiat. Rerum laudantium distinctio est voluptatibus sunt eius et consequatur.\n\nEos facilis dolor voluptatem. Autem dicta voluptas voluptates esse ab. Aut rerum quia excepturi non impedit.\n\nLaudantium aliquid dolores aut qui iusto. Nam quisquam sed voluptate. Et vero et hic et mollitia. Sit nesciunt laboriosam consequatur.\n\nRepellendus natus cum ab est commodi doloremque voluptate. Et et sint consequatur harum quasi. Ut numquam non harum suscipit in omnis. Et et culpa enim sit modi. Vitae nemo ea optio impedit quo nihil reiciendis.','<p>Et est dolore quo totam quasi totam. Perspiciatis accusamus voluptas hic voluptatum asperiores. Veritatis voluptas velit dolores quia tempore quis et.</p>\n\n<p>Laborum delectus nulla cumque ab. Nemo recusandae sint quos. Quae facere esse dolores eum qui a eum.</p>\n\n<p>Aspernatur vitae et voluptates dolor quidem. Alias cum consequatur quis dolorem ducimus. A debitis nobis fugiat. Rerum laudantium distinctio est voluptatibus sunt eius et consequatur.</p>\n\n<p>Eos facilis dolor voluptatem. Autem dicta voluptas voluptates esse ab. Aut rerum quia excepturi non impedit.</p>\n\n<p>Laudantium aliquid dolores aut qui iusto. Nam quisquam sed voluptate. Et vero et hic et mollitia. Sit nesciunt laboriosam consequatur.</p>\n\n<p>Repellendus natus cum ab est commodi doloremque voluptate. Et et sint consequatur harum quasi. Ut numquam non harum suscipit in omnis. Et et culpa enim sit modi. Vitae nemo ea optio impedit quo nihil reiciendis.</p>\n',11,0,'blog.layouts.show','2016-02-19 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(97,11,'Corrupti eum architecto totam ullam dolor doloribus.','animi','odio-voluptates-consectetur-repellat-maxime-possimus','http://lorempixel.com/680/300/?80924','I to get hold of anything, but she knew she had this fit) An obstacle that came between Him, and ourselves, and it. Don\'t let him know she liked them best, For this must be kind to them,\'.','Libero ea ipsam quas ipsam ut beatae autem. Id consequatur aut consequuntur architecto.\n\nVeniam quo nulla atque eaque eum necessitatibus. Sunt nihil fuga atque voluptatem quasi fuga. Amet consectetur ratione quas facilis.\n\nUt unde consequatur velit soluta nam ad vel. Dolores velit voluptatem et tempore possimus numquam. Et corrupti temporibus doloremque minima dolores.\n\nMinima eum nemo culpa aut. Quo necessitatibus deserunt enim quos sed blanditiis. Totam suscipit rerum corrupti eos autem qui.\n\nVel qui aut omnis similique nostrum consequatur. Debitis quas ut quasi. Alias et quod non dolor reiciendis culpa quos.\n\nId nesciunt sequi eius maxime et necessitatibus. Ad molestias non quis blanditiis voluptas modi. Architecto sed similique et voluptatem.','<p>Libero ea ipsam quas ipsam ut beatae autem. Id consequatur aut consequuntur architecto.</p>\n\n<p>Veniam quo nulla atque eaque eum necessitatibus. Sunt nihil fuga atque voluptatem quasi fuga. Amet consectetur ratione quas facilis.</p>\n\n<p>Ut unde consequatur velit soluta nam ad vel. Dolores velit voluptatem et tempore possimus numquam. Et corrupti temporibus doloremque minima dolores.</p>\n\n<p>Minima eum nemo culpa aut. Quo necessitatibus deserunt enim quos sed blanditiis. Totam suscipit rerum corrupti eos autem qui.</p>\n\n<p>Vel qui aut omnis similique nostrum consequatur. Debitis quas ut quasi. Alias et quod non dolor reiciendis culpa quos.</p>\n\n<p>Id nesciunt sequi eius maxime et necessitatibus. Ad molestias non quis blanditiis voluptas modi. Architecto sed similique et voluptatem.</p>\n',11,0,'blog.layouts.show','2016-03-13 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(98,11,'Quasi minus quo atque doloribus qui nisi.','maxime,ullam,voluptatibus','voluptas-quidem-dolores-aut-aut-nihil','http://lorempixel.com/680/300/?94395','Please, Ma\'am, is this New Zealand or Australia?\' (and she tried hard to whistle to it; but she had caught the baby with some curiosity. \'What a curious dream!\' said Alice, who was.','Dicta ipsam aliquam expedita eos. Eligendi voluptatem culpa inventore voluptatem. Officia adipisci voluptas praesentium nesciunt quisquam est. Delectus alias necessitatibus tempore accusamus reprehenderit.\n\nDebitis iste quod ut in maxime ea sint. Quia culpa rerum facilis blanditiis mollitia quia. Sit dignissimos aliquid similique.\n\nNihil vel aut deleniti. Amet doloribus autem facere deleniti magni. Autem commodi ad est cumque. Tempore occaecati sit ea sequi consectetur.\n\nPerspiciatis quo aut voluptatum porro. Et veniam odit qui. Necessitatibus qui fugiat ut soluta ipsum. Ea tempore voluptatibus necessitatibus et ut.\n\nIn dolorum et quo nesciunt aut. Et eum deserunt vel quibusdam. Optio omnis facere qui aut sapiente similique adipisci.','<p>Dicta ipsam aliquam expedita eos. Eligendi voluptatem culpa inventore voluptatem. Officia adipisci voluptas praesentium nesciunt quisquam est. Delectus alias necessitatibus tempore accusamus reprehenderit.</p>\n\n<p>Debitis iste quod ut in maxime ea sint. Quia culpa rerum facilis blanditiis mollitia quia. Sit dignissimos aliquid similique.</p>\n\n<p>Nihil vel aut deleniti. Amet doloribus autem facere deleniti magni. Autem commodi ad est cumque. Tempore occaecati sit ea sequi consectetur.</p>\n\n<p>Perspiciatis quo aut voluptatum porro. Et veniam odit qui. Necessitatibus qui fugiat ut soluta ipsum. Ea tempore voluptatibus necessitatibus et ut.</p>\n\n<p>In dolorum et quo nesciunt aut. Et eum deserunt vel quibusdam. Optio omnis facere qui aut sapiente similique adipisci.</p>\n',37,0,'blog.layouts.show','2016-02-23 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(99,11,'Recusandae voluptatem molestiae ducimus odio ut ullam at qui commodi accusamus sint qui.','fugiat','consequuntur-eos-non-unde-dolore-explicabo-incidunt-nulla','http://lorempixel.com/680/300/?66614','Alice remained looking thoughtfully at the March Hare: she thought of herself, \'I wonder what I like\"!\' \'You might just as well wait, as she could, and soon found an opportunity of.','Maxime aperiam fugit accusantium et et voluptas dignissimos. Hic quia doloribus et blanditiis quia. Dolor omnis vel vel non. Sint eveniet vero omnis unde.\n\nId dolores harum et ipsam. Mollitia earum porro impedit aut autem neque. Eos eligendi ut aut quas quia dolorem. Amet ut autem aut ea.\n\nModi consequatur alias nemo molestiae doloribus voluptatibus. Impedit tenetur magnam aut odio. Nobis atque praesentium tempora aspernatur aut officiis incidunt. Voluptatem qui assumenda eum earum blanditiis ut.\n\nEum id quia adipisci vel aut. Quisquam consequatur illo velit neque assumenda. Laborum quia error voluptate consequatur culpa quis. Nihil in ex accusantium fugiat id reiciendis.\n\nOmnis sunt minima sint beatae explicabo saepe voluptatem. Veritatis eum beatae molestiae optio. Est eum accusamus animi quisquam. Mollitia quos illum at minima perspiciatis tenetur qui.','<p>Maxime aperiam fugit accusantium et et voluptas dignissimos. Hic quia doloribus et blanditiis quia. Dolor omnis vel vel non. Sint eveniet vero omnis unde.</p>\n\n<p>Id dolores harum et ipsam. Mollitia earum porro impedit aut autem neque. Eos eligendi ut aut quas quia dolorem. Amet ut autem aut ea.</p>\n\n<p>Modi consequatur alias nemo molestiae doloribus voluptatibus. Impedit tenetur magnam aut odio. Nobis atque praesentium tempora aspernatur aut officiis incidunt. Voluptatem qui assumenda eum earum blanditiis ut.</p>\n\n<p>Eum id quia adipisci vel aut. Quisquam consequatur illo velit neque assumenda. Laborum quia error voluptate consequatur culpa quis. Nihil in ex accusantium fugiat id reiciendis.</p>\n\n<p>Omnis sunt minima sint beatae explicabo saepe voluptatem. Veritatis eum beatae molestiae optio. Est eum accusamus animi quisquam. Mollitia quos illum at minima perspiciatis tenetur qui.</p>\n',12,0,'blog.layouts.show','2016-03-10 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50'),(100,11,'A non maiores necessitatibus animi iste.','neque,corporis,quam','magnam-omnis-labore-ipsum-cum-eveniet-earum-in','http://lorempixel.com/680/300/?83693','I am to see if she meant to take MORE than nothing.\' \'Nobody asked YOUR opinion,\' said Alice. \'Why, you don\'t know what to do such a thing I.','Quos ut omnis et et. Adipisci corporis vitae sed. Quod vel ut fugit dolorum perspiciatis sit sit. Ad doloremque tenetur illum error blanditiis magnam voluptatem.\n\nVoluptatibus ipsa sint quasi sed. Veniam placeat quam officia dolores et temporibus amet.\n\nConsectetur corrupti sapiente rerum et facilis culpa dicta. Veritatis iusto consectetur ducimus placeat saepe. Ipsa occaecati hic recusandae sed. Aut dolores debitis dolores aperiam vero. Adipisci voluptas aut voluptatem deserunt molestiae hic.','<p>Quos ut omnis et et. Adipisci corporis vitae sed. Quod vel ut fugit dolorum perspiciatis sit sit. Ad doloremque tenetur illum error blanditiis magnam voluptatem.</p>\n\n<p>Voluptatibus ipsa sint quasi sed. Veniam placeat quam officia dolores et temporibus amet.</p>\n\n<p>Consectetur corrupti sapiente rerum et facilis culpa dicta. Veritatis iusto consectetur ducimus placeat saepe. Ipsa occaecati hic recusandae sed. Aut dolores debitis dolores aperiam vero. Adipisci voluptas aut voluptatem deserunt molestiae hic.</p>\n',41,0,'blog.layouts.show','2016-02-22 14:49:50',NULL,'2016-03-17 14:49:50','2016-03-17 14:49:50');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1),(1,2),(4,2);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','超级管理员','超级管理员..','2015-11-05 11:13:58','2016-03-18 15:00:17'),(2,'test','测试','测试..','2016-03-18 15:00:42','2016-03-18 15:00:42');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `layout` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'tag.layouts.index',
  `reverse_direction` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_tag_unique` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'php','php','Subtitle for php','','','tag.layouts.index',0,'2016-03-16 08:42:02','2016-03-16 08:42:02'),(2,'mysql','mysql','Subtitle for mysql','','','tag.layouts.index',0,'2016-03-16 08:42:02','2016-03-16 08:42:02');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `discount` decimal(5,2) NOT NULL DEFAULT '0.00',
  `point` int(10) unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
INSERT INTO `user_groups` VALUES (1,'普通会员',0.00,0,'2016-03-16 05:48:27','2016-03-16 05:48:27'),(2,'银牌会员',80.00,10000,'2016-03-16 05:48:27','2016-03-16 05:48:27'),(3,'金牌会员',60.50,20000,'2016-03-16 05:48:27','2016-03-16 05:48:27'),(4,'钻石会员',40.00,40000,'2016-03-16 05:48:27','2016-03-16 05:48:27');
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `group_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_group_id_index` (`group_id`),
  CONSTRAINT `users_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `user_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'maxfine','max_fine@qq.com','$2y$10$Egtd8qnkk.5sLcukL.3Bcu8e4buoo2AW13amAsSrnrFzI8Wp2OFMW',NULL,'gJP7Qxmkp1ZbHyw9QNozOZI1xyuqX182qCdqWzFmePDTsJzbE6ASMkNvYQ12','2016-02-13 11:13:58','2016-03-19 15:28:00'),(3,'test','maxfine2@qq.com','$2y$10$lCZLPIKf9hGDk7gP8JyA4.HvkXbQBKyQMFwvhD30uOjdnWF7C9l.m',NULL,NULL,'2016-03-19 15:07:39','2016-03-19 15:07:39'),(4,'maxfine','1526469222@qq.com','$2y$10$KLu0x2fNGrMv1b5z02HJouNP6fCzUixhkSg.5C2ksRQ..IKaVWl4C',NULL,NULL,'2016-03-19 15:13:52','2016-03-19 15:14:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-20  0:40:30
