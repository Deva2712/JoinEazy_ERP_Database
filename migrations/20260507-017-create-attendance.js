/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		// Table for student attendance sessions
		await queryInterface.createTable("attendance_logs", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			recordedBy: {
				type: Sequelize.UUID,
				allowNull: false,
				// Ensures every log is linked to a valid user in the 'users' table
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			cohortId: {
				type: Sequelize.UUID,
				allowNull: false,
				// Links the attendance session to a specific cohort
				references: {
					model: "cohorts",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			section: {
				type: Sequelize.STRING,
				defaultValue: "All",
			},
			date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			presentStudentIds: {
				type: Sequelize.JSONB, // Stores student IDs in a JSON array
				defaultValue: [],
			},
			isFinal: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			lastUpdated: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		// Table for professor clock-in/out and professional activities
		await queryInterface.createTable("professor_activity_logs", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			type: {
				type: Sequelize.ENUM("WorkLog", "Experience"),
				defaultValue: "WorkLog",
			},
			details: {
				type: Sequelize.JSONB, // Stores flexible activity data
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("attendance_logs");
		await queryInterface.dropTable("professor_activity_logs");
		// Clean up custom ENUM type to prevent errors on re-run
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_professor_activity_logs_type";',
		);
	},
};
