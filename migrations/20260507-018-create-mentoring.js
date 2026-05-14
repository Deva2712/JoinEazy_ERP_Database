/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		// --- Create Mentee Profiles Table ---
		await queryInterface.createTable("mentee_profiles", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				unique: true,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			mentorId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			department: { type: Sequelize.STRING },
			section: { type: Sequelize.STRING },
			semester: { type: Sequelize.INTEGER },
			batch: { type: Sequelize.STRING },
			studentType: { type: Sequelize.STRING },
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});

		// --- Create Mentoring Meetings Table ---
		await queryInterface.createTable("mentoring_meetings", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			studentId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			mentorId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			date: { type: Sequelize.DATE, allowNull: false },
			status: {
				type: Sequelize.ENUM(
					"Requested",
					"Completed",
					"Missed",
					"Pending Documentation",
				),
				defaultValue: "Requested",
			},
			hasAttended: { type: Sequelize.BOOLEAN, defaultValue: null },
			requestReason: { type: Sequelize.TEXT },
			discussionSummary: { type: Sequelize.TEXT },
			actionPlan: { type: Sequelize.JSON },
			performanceRatings: { type: Sequelize.JSON },
			overallRemarks: { type: Sequelize.TEXT },
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("mentoring_meetings");
		await queryInterface.dropTable("mentee_profiles");
		// Clean up the custom ENUM type
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_mentoring_meetings_status";',
		);
	},
};
