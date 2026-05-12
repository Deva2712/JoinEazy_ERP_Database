/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("exam_duties", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				// Links the duty to the invigilator (User)
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			courseName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			courseCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			startTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			endTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			hall: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			reportingTime: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			status: {
				type: Sequelize.ENUM(
					"ASSIGNED",
					"REJECTION_REVIEW",
					"REJECTION_REVOKED",
					"REJECTION_APPROVED",
				),
				defaultValue: "ASSIGNED",
			},
			isCheckedIn: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			rejectionReason: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			rejectionApproval: {
				type: Sequelize.JSONB,
				allowNull: true,
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
		await queryInterface.dropTable("exam_duties");
		// Cleanup custom ENUM type for clean re-runs
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_exam_duties_status";',
		);
	},
};
