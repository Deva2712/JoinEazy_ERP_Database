/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		// Table for professor availability/office hours
		await queryInterface.createTable("office_hours", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			courseName: {
				type: Sequelize.STRING,
			},
			day: {
				type: Sequelize.ENUM(
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Sunday",
				),
				allowNull: false,
			},
			startTime: { type: Sequelize.STRING },
			endTime: { type: Sequelize.STRING },
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});

		// Table for confirmed meetings and calendar events
		await queryInterface.createTable("scheduled_events", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			hostId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			participantName: { type: Sequelize.STRING },
			participantId: { type: Sequelize.STRING },
			participantRole: {
				type: Sequelize.STRING,
				defaultValue: "Student",
			},
			type: {
				type: Sequelize.ENUM("Online", "Offline"),
				defaultValue: "Offline",
			},
			category: {
				type: Sequelize.STRING,
				defaultValue: "Academic",
			},
			subject: { type: Sequelize.STRING },
			startTime: { type: Sequelize.DATE },
			location: { type: Sequelize.STRING },
			meetingLink: { type: Sequelize.STRING },
			status: {
				type: Sequelize.ENUM("scheduled", "rescheduled", "cancelled"),
				defaultValue: "scheduled",
			},
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});

		// Table for meeting request workflow
		await queryInterface.createTable("meeting_requests", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			senderId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			receiverId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			status: {
				type: Sequelize.ENUM("pending", "accepted", "rejected"),
				defaultValue: "pending",
			},
			requestedTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			reason: { type: Sequelize.TEXT },
			rejectionReason: { type: Sequelize.TEXT },
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("meeting_requests");
		await queryInterface.dropTable("scheduled_events");
		await queryInterface.dropTable("office_hours");

		// Clean up custom ENUM types
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_office_hours_day";',
		);
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_scheduled_events_type";',
		);
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_scheduled_events_status";',
		);
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_meeting_requests_status";',
		);
	},
};
