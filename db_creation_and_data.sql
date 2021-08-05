USE test_db;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `full_name` varchar(100) NOT NULL,
  `preferred_pronouns` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `team` varchar(50) NOT NULL,
  `date_started` date NOT NULL,
  `does_want_matching` boolean NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` VALUES ('Susan Bailey', 'She/her/hers', 'bsusan@vmware.com', 'Marketer', 'Sales', '2014-07-22', TRUE);
INSERT INTO `users` VALUES ('Zach Butler', 'They/them/theirs', 'bzach@vmware.com', 'Software Engineer', 'Engineering', '2019-08-11', TRUE);


CREATE TABLE `days_of_week_availability` (
  `email` varchar(50) NOT NULL,
  `max_weekly_meetings` int NOT NULL,
  `monday_times` varchar(50),
  `monday_can_virtual` boolean,
  `monday_can_in_person` boolean,
  `tuesday_times` varchar(50),
  `tuesday_can_virtual` boolean,
  `tuesday_can_in_person` boolean,  
  `wednesday_times` varchar(50),
  `wednesday_can_virtual` boolean,
  `wednesday_can_in_person` boolean, 
  `thursday_times` varchar(50),
  `thursday_can_virtual` boolean,
  `thursday_can_in_person` boolean, 
  `friday_times` varchar(50),
  `friday_can_virtual` boolean,
  `friday_can_in_person` boolean,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `days_of_week_availability` VALUES ('bsusan@vmware.com', 3, '12:00, 1:00', TRUE, TRUE, '', FALSE, FALSE, '', FALSE, FALSE, '', FALSE, FALSE, '', FALSE, FALSE);
INSERT INTO `days_of_week_availability` VALUES ('bzach@vmware.com', 2, '1:00, 2:00', TRUE, TRUE, '', FALSE, FALSE, '', FALSE, FALSE, '', FALSE, FALSE, '', FALSE, FALSE);


CREATE TABLE `meetings` (
  `meeting_id` int NOT NULL AUTO_INCREMENT,
  `user_1_email` varchar(50) NOT NULL, 
  `user_2_email` varchar(50) NOT NULL, 
  `meeting_date` date NOT NULL,
  `user_1_attending` boolean NOT NULL,
  `user_2_attending` boolean NOT NULL,
  PRIMARY KEY (`meeting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `meetings` VALUES (null, 'bsusan@vmware.com', 'bzach@vmware.com', '2021-07-05', TRUE, TRUE);
